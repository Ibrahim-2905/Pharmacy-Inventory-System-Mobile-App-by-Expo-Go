import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { exportAllData, importAllData } from '../database/queries';
import { GOOGLE_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

const BACKUP_FILENAME = 'pharmacy_backup.json';

const saveBackupTime = async () => {
  if (Platform.OS === 'web') {
    localStorage.setItem('last_backup_time', new Date().toISOString());
  } else {
    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + 'last_backup_time.txt',
      new Date().toISOString(),
      { encoding: 'utf8' }
    );
  }
};

const uploadToDrive = async (json, accessToken) => {
  const metadata = {
    name: BACKUP_FILENAME,
    mimeType: 'application/json',
    parents: ['root'],
  };

  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=name='${BACKUP_FILENAME}'&spaces=drive`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const searchData = await searchRes.json();
  const existingFile = searchData.files?.[0];

  const url = existingFile
    ? `https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=multipart`
    : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
  const method = existingFile ? 'PATCH' : 'POST';

  const boundary = 'backup_boundary';
  const body =
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n` +
    JSON.stringify(metadata) +
    `\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n` +
    json +
    `\r\n--${boundary}--`;

  const uploadRes = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body,
  });

  return uploadRes.ok;
};

export const backupToGoogleDrive = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

    const request = new AuthSession.AuthRequest({
      clientId: GOOGLE_CLIENT_ID,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
      redirectUri,
      responseType: AuthSession.ResponseType.Token,
      usePKCE: false, // ✅ yeh add karo — Token flow mein PKCE nahi chahiye
    });

    const result = await request.promptAsync({
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    });

    if (result.type !== 'success') return { success: false, canceled: true };

    const accessToken = result.params?.access_token;
    if (!accessToken) return { success: false, error: 'Token nahi mila' };

    const json = await exportAllData();
    const uploaded = await uploadToDrive(json, accessToken);

    if (uploaded) {
      await saveBackupTime();
      return { success: true };
    }

    return { success: false, error: 'Upload fail hua' };

  } catch (err) {
    console.error('Drive backup error:', err);
    return { success: false, error: err.message };
  }
};

// ── Local File Backup ─────────────────────────
export const backupToFile = async () => {
  try {
    const json = await exportAllData();

    if (Platform.OS === 'web') {
      const blob = new Blob([json], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = BACKUP_FILENAME;
      a.click();
      URL.revokeObjectURL(url);
      await saveBackupTime();
      return { success: true };
    }

    // ✅ Mobile — legacy API use, moveAsync nahi
    const path = FileSystem.documentDirectory + BACKUP_FILENAME;
    await FileSystem.writeAsStringAsync(path, json, { encoding: 'utf8' });
    await Sharing.shareAsync(path, {
      mimeType: 'application/json',
      dialogTitle: 'Save backup file',
    });
    await saveBackupTime();
    return { success: true };

  } catch (err) {
    console.error('Backup error:', err);
    return { success: false, error: err.message };
  }
};

// ── Restore from file ─────────────────────────
export const restoreFromFile = async () => {
  try {
    if (Platform.OS === 'web') {
      return new Promise((resolve) => {
        const input    = document.createElement('input');
        input.type     = 'file';
        input.accept   = '.json,application/json';
        input.onchange = async (e) => {
          try {
            const file = e.target.files[0];
            if (!file) return resolve({ success: false, canceled: true });
            const text = await file.text();
            await importAllData(text);
            resolve({ success: true });
          } catch (err) {
            resolve({ success: false, error: err.message });
          }
        };
        input.oncancel = () => resolve({ success: false, canceled: true });
        input.click();
      });
    }

    // ✅ Mobile
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // ✅ sab types allow — json filter mobile pe kaam nahi karta
      copyToCacheDirectory: true,
    });

    if (result.canceled) return { success: false, canceled: true };

    const uri  = result.assets[0].uri;
    const json = await FileSystem.readAsStringAsync(uri, { encoding: 'utf8' });
    await importAllData(json);
    return { success: true };

  } catch (err) {
    console.error('Restore error:', err);
    return { success: false, error: err.message };
  }
};

// ── Last backup time ──────────────────────────
export const getLastBackupTime = async () => {
  try {
    if (Platform.OS === 'web') {
      const iso = localStorage.getItem('last_backup_time');
      return iso ? new Date(iso).toLocaleString('en-PK') : 'Never';
    }

    const path = FileSystem.documentDirectory + 'last_backup_time.txt';
    const info = await FileSystem.getInfoAsync(path);
    if (info.exists) {
      const iso = await FileSystem.readAsStringAsync(path, { encoding: 'utf8' });
      return new Date(iso).toLocaleString('en-PK');
    }
    return 'Never';
  } catch {
    return 'Never';
  }
};