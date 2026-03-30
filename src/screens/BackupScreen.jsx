// import React, { useEffect, useRef, useState } from 'react';
//   import { backupToFile, backupToGoogleDrive, restoreFromFile, getLastBackupTime } from '../utils/backup';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Animated, Alert, Platform,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Colors from '../theme/colors';

// const InfoRow = ({ icon, label, value, delay }) => {
//   const fade  = useRef(new Animated.Value(0)).current;
//   const slide = useRef(new Animated.Value(12)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
//       Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[styles.infoRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
//       <View style={styles.infoIconWrap}>
//         <Ionicons name={icon} size={16} color={Colors.skyBlueDark} />
//       </View>
//       <Text style={styles.infoLabel}>{label}</Text>
//       <Text style={styles.infoValue}>{value}</Text>
//     </Animated.View>
//   );
// };

// export default function BackupScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   const [backupLoading,  setBackupLoading]  = useState(false);
//   const [restoreLoading, setRestoreLoading] = useState(false);
//   const [lastBackup,     setLastBackup]     = useState('Checking...');
//   const [backupDone,     setBackupDone]     = useState(false);

//   const headerFade   = useRef(new Animated.Value(0)).current;
//   const headerSlide  = useRef(new Animated.Value(-40)).current;
//   const contentFade  = useRef(new Animated.Value(0)).current;
//   const contentSlide = useRef(new Animated.Value(30)).current;
//   const pulseAnim    = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(headerFade,   { toValue: 1, duration: 400, useNativeDriver: true }),
//       Animated.timing(headerSlide,  { toValue: 0, duration: 400, useNativeDriver: true }),
//       Animated.timing(contentFade,  { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
//       Animated.timing(contentSlide, { toValue: 0, duration: 500, delay: 150, useNativeDriver: true }),
//     ]).start();

//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, { toValue: 1.3, duration: 900, useNativeDriver: true }),
//         Animated.timing(pulseAnim, { toValue: 1,   duration: 900, useNativeDriver: true }),
//       ])
//     ).start();

//     loadLastBackupTime();
//   }, []);

//   const loadLastBackupTime = async () => {
//     const t = await getLastBackupTime();
//     setLastBackup(t);
//   };




// const handleBackup = async () => {
//   if (Platform.OS === 'web') {
//     // Web pe sirf file download — Google Drive nahi
//     const confirmed = window.confirm('Backup file download karein?\n\nOK dabao to JSON file download hogi — use Google Drive ya WhatsApp pe save kar lo.');
//     if (!confirmed) return;
//     setBackupLoading(true);
//     const result = await backupToFile();
//     setBackupLoading(false);
//     if (result.success) {
//       setBackupDone(true);
//       await loadLastBackupTime();
//       window.alert('✅ Backup file download ho gayi! Ise Google Drive pe upload kar lo safe rakhne ke liye.');
//     } else {
//       window.alert('❌ Backup fail hua, dobara try karo');
//     }
//     return;
//   }

//   // Mobile pe dono options
//   Alert.alert(
//     'Backup kahan save karein?',
//     'Google Drive pe save karo ya file share karo',
//     [
//       {
//         text: '📁 File share karo',
//         onPress: async () => {
//           setBackupLoading(true);
//           const result = await backupToFile();
//           setBackupLoading(false);
//           if (result.success) {
//             setBackupDone(true);
//             await loadLastBackupTime();
//           } else if (!result.canceled) {
//             Alert.alert('Error', 'Backup fail hua');
//           }
//         },
//       },
//       {
//         text: '☁️ Google Drive',
//         onPress: async () => {
//           setBackupLoading(true);
//           const result = await backupToGoogleDrive();
//           setBackupLoading(false);
//           if (result.success) {
//             setBackupDone(true);
//             await loadLastBackupTime();
//             Alert.alert('Success', 'Google Drive pe backup ho gaya!');
//           } else if (!result.canceled) {
//             Alert.alert('Error', 'Drive backup fail hua');
//           }
//         },
//       },
//       { text: 'Cancel', style: 'cancel' },
//     ]
//   );
// };

//   const handleRestore = async () => {
//     Alert.alert(
//       'Restore data',
//       'This will replace ALL your current data with the backup. Are you sure?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Restore',
//           style: 'destructive',
//           onPress: async () => {
//             setRestoreLoading(true);
//             const result = await restoreFromFile();
//             setRestoreLoading(false);
//             if (result.success) {
//               Alert.alert('Success', 'Data restored successfully!', [
//                 { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
//               ]);
//             } else if (!result.canceled) {
//               Alert.alert('Error', 'Restore failed. Please try again.');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const backupItems = [
//     { icon: 'medkit-outline',      label: 'All medicines & stock levels' },
//     { icon: 'cash-outline',        label: 'Purchase & sell prices'       },
//     { icon: 'receipt-outline',     label: 'Complete sales history'       },
//     { icon: 'trending-up-outline', label: 'Profit & loss records'        },
//   ];

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
//           <Ionicons name="arrow-back" size={20} color={Colors.white} />
//         </TouchableOpacity>
//         <View style={{ flex: 1, marginLeft: 12 }}>
//           <Text style={styles.headerTitle}>Backup & restore</Text>
//           <Text style={styles.headerSub}>Keep your data safe</Text>
//         </View>
//       </Animated.View>

//       <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
//         <Animated.View style={{ opacity: contentFade, transform: [{ translateY: contentSlide }], gap: 14 }}>

//           {/* Status card */}
//           <View style={styles.statusCard}>
//             <View style={styles.statusTop}>
//               <View style={styles.statusLeft}>
//                 <Animated.View style={[styles.statusDot, { transform: [{ scale: pulseAnim }] }, backupDone && { backgroundColor: Colors.successGreen }]} />
//                 <Text style={styles.statusText}>{backupDone ? 'Backup complete' : 'Backup ready'}</Text>
//               </View>
//             </View>
//             <View style={styles.statusDivider} />
//             <InfoRow icon="time-outline"    label="Last backup"  value={lastBackup}  delay={300} />
//           </View>

//           {/* Backup now */}
//           <TouchableOpacity
//             style={[styles.backupNowBtn, backupLoading && { opacity: 0.7 }]}
//             onPress={handleBackup}
//             disabled={backupLoading}
//             activeOpacity={0.85}
//           >
//             <Ionicons name={backupDone ? 'checkmark-circle' : 'cloud-upload-outline'} size={20} color={Colors.white} />
//             <Text style={styles.backupNowText}>
//               {backupLoading ? 'Preparing backup...' : backupDone ? 'Backup successful!' : 'Backup now'}
//             </Text>
//           </TouchableOpacity>

//           {/* Restore card */}
//           <View style={styles.sectionCard}>
//             <View style={styles.sectionCardHeader}>
//               <View style={styles.sectionIconWrap}>
//                 <Ionicons name="cloud-download-outline" size={18} color={Colors.skyBlueDark} />
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.sectionCardTitle}>Restore data</Text>
//                 <Text style={styles.sectionCardSub}>Phone lost? Select your backup file to restore all data.</Text>
//               </View>
//             </View>
//             <View style={styles.restoreSteps}>
//               {['Tap restore button below', 'Select your backup .json file', 'All data restored automatically'].map((step, i) => (
//                 <View key={i} style={styles.restoreStep}>
//                   <View style={styles.stepNumber}>
//                     <Text style={styles.stepNumberText}>{i + 1}</Text>
//                   </View>
//                   <Text style={styles.stepText}>{step}</Text>
//                 </View>
//               ))}
//             </View>
//             <TouchableOpacity
//               style={[styles.restoreBtn, restoreLoading && { opacity: 0.7 }]}
//               onPress={handleRestore}
//               disabled={restoreLoading}
//               activeOpacity={0.85}
//             >
//               <Ionicons name="cloud-download-outline" size={18} color={Colors.skyBlueDark} />
//               <Text style={styles.restoreBtnText}>{restoreLoading ? 'Restoring...' : 'Restore from file'}</Text>
//             </TouchableOpacity>
//           </View>

//           {/* What gets backed up */}
//           <View style={styles.sectionCard}>
//             <View style={styles.sectionCardHeader}>
//               <View style={styles.sectionIconWrap}>
//                 <Ionicons name="shield-checkmark-outline" size={18} color={Colors.skyBlueDark} />
//               </View>
//               <View>
//                 <Text style={styles.sectionCardTitle}>What gets backed up</Text>
//                 <Text style={styles.sectionCardSub}>Everything saved safely</Text>
//               </View>
//             </View>
//             <View style={{ gap: 10 }}>
//               {backupItems.map((item, i) => (
//                 <View key={i} style={styles.backupItem}>
//                   <View style={styles.backupItemIcon}>
//                     <Ionicons name={item.icon} size={15} color={Colors.successGreen} />
//                   </View>
//                   <Text style={styles.backupItemText}>{item.label}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>

//           <View style={styles.infoCard}>
//             <Ionicons name="information-circle-outline" size={18} color={Colors.skyBlueDark} />
//             <Text style={styles.infoCardText}>
//               Tap "Backup now" to export your data as a file. Save it to Google Drive, WhatsApp, or any cloud storage. Use the same file to restore on a new phone.
//             </Text>
//           </View>

//         </Animated.View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:         { flex: 1, backgroundColor: Colors.gray50 },
//   header:            { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center' },
//   backBtn:           { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
//   headerTitle:       { color: Colors.white, fontSize: 17, fontWeight: '600' },
//   headerSub:         { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
//   scroll:            { flex: 1 },
//   scrollContent:     { padding: 14, paddingBottom: 40 },
//   statusCard:        { backgroundColor: Colors.white, borderRadius: 14, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, gap: 10 },
//   statusTop:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   statusLeft:        { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   statusDot:         { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.skyBlueDark },
//   statusText:        { fontSize: 13, fontWeight: '600', color: Colors.black },
//   statusDivider:     { height: 0.5, backgroundColor: Colors.gray200 },
//   infoRow:           { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   infoIconWrap:      { width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.skyBlueLight, alignItems: 'center', justifyContent: 'center' },
//   infoLabel:         { flex: 1, fontSize: 12, color: Colors.gray700 },
//   infoValue:         { fontSize: 12, fontWeight: '600', color: Colors.black },
//   backupNowBtn:      { backgroundColor: Colors.darkBlue, borderRadius: 12, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
//   backupNowText:     { color: Colors.white, fontSize: 15, fontWeight: '600' },
//   sectionCard:       { backgroundColor: Colors.white, borderRadius: 14, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, gap: 14 },
//   sectionCardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
//   sectionIconWrap:   { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.skyBlueLight, alignItems: 'center', justifyContent: 'center' },
//   sectionCardTitle:  { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 3 },
//   sectionCardSub:    { fontSize: 11, color: Colors.gray500, lineHeight: 16 },
//   restoreSteps:      { gap: 10 },
//   restoreStep:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   stepNumber:        { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.darkBlueLight, alignItems: 'center', justifyContent: 'center' },
//   stepNumberText:    { fontSize: 11, fontWeight: '700', color: Colors.darkBlue },
//   stepText:          { fontSize: 12, color: Colors.gray700, flex: 1 },
//   restoreBtn:        { borderWidth: 1.5, borderColor: Colors.skyBlueDark, borderRadius: 12, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
//   restoreBtnText:    { fontSize: 13, fontWeight: '600', color: Colors.skyBlueDark },
//   backupItem:        { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   backupItemIcon:    { width: 26, height: 26, borderRadius: 8, backgroundColor: Colors.successBg, alignItems: 'center', justifyContent: 'center' },
//   backupItemText:    { fontSize: 12, color: Colors.gray700 },
//   infoCard:          { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 12, backgroundColor: Colors.skyBlueLight, borderRadius: 12, borderWidth: 0.5, borderColor: Colors.skyBlueMid },
//   infoCardText:      { flex: 1, fontSize: 11, color: Colors.darkBlue, lineHeight: 17 },
// });



















import React, { useEffect, useRef, useState } from 'react';
import { backupToFile, backupToGoogleDrive, restoreFromFile, getLastBackupTime } from '../utils/backup';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Animated, Alert, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../theme/colors';
import { deleteAllData } from '../database/queries';


const InfoRow = ({ icon, label, value, delay }) => {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.infoRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
      <View style={styles.infoIconWrap}>
        <Ionicons name={icon} size={16} color={Colors.skyBlueDark} />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </Animated.View>
  );
};

export default function BackupScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [backupLoading,  setBackupLoading]  = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [deleteLoading,  setDeleteLoading]  = useState(false);
  const [lastBackup,     setLastBackup]     = useState('Checking...');
  const [backupDone,     setBackupDone]     = useState(false);

  const headerFade   = useRef(new Animated.Value(0)).current;
  const headerSlide  = useRef(new Animated.Value(-40)).current;
  const contentFade  = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;
  const pulseAnim    = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade,   { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlide,  { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(contentFade,  { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
      Animated.timing(contentSlide, { toValue: 0, duration: 500, delay: 150, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,   duration: 900, useNativeDriver: true }),
      ])
    ).start();

    loadLastBackupTime();
  }, []);

  const loadLastBackupTime = async () => {
    const t = await getLastBackupTime();
    setLastBackup(t);
  };

  // ── Backup ────────────────────────────────────
  const handleBackup = async () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Backup file download karein?\n\nJSON file download hogi — ise Google Drive ya kisi safe jagah save kar lo.');
      if (!confirmed) return;
      setBackupLoading(true);
      const result = await backupToFile();
      setBackupLoading(false);
      if (result.success) {
        setBackupDone(true);
        await loadLastBackupTime();
        window.alert('✅ Backup file download ho gayi! Ise Google Drive pe upload kar lo safe rakhne ke liye.');
      } else {
        window.alert('❌ Backup fail hua, dobara try karo');
      }
      return;
    }

    // Mobile
    Alert.alert(
      'Backup kahan save karein?',
      'Google Drive pe save karo ya file share karo',
      [
        {
          text: '📁 File share karo',
          onPress: async () => {
            setBackupLoading(true);
            const result = await backupToFile();
            setBackupLoading(false);
            if (result.success) {
              setBackupDone(true);
              await loadLastBackupTime();
            } else if (!result.canceled) {
              Alert.alert('Error', 'Backup fail hua');
            }
          },
        },
        {
          text: '☁️ Google Drive',
          onPress: async () => {
            setBackupLoading(true);
            const result = await backupToGoogleDrive();
            setBackupLoading(false);
            if (result.success) {
              setBackupDone(true);
              await loadLastBackupTime();
              Alert.alert('Success', 'Google Drive pe backup ho gaya!');
            } else if (!result.canceled) {
              Alert.alert('Error', 'Drive backup fail hua');
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // ── Restore ───────────────────────────────────
  const handleRestore = async () => {
    // Web
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('⚠️ Yeh aapka current data replace kar dega.\n\nBackup JSON file select karein?');
      if (!confirmed) return;
      setRestoreLoading(true);
      const result = await restoreFromFile();
      setRestoreLoading(false);
      if (result.success) {
        window.alert('✅ Data restore ho gaya!');
        navigation.navigate('Dashboard');
      } else if (!result.canceled) {
        window.alert('❌ Restore fail hua, sahi .json file select karo');
      }
      return;
    }

    // Mobile — Google Drive se file pick karne ka option
    Alert.alert(
      'Restore data',
      'Backup file kahan se hai?',
      [
        {
          text: '📁 File select karo',
          onPress: async () => {
            Alert.alert(
              'Sure hain?',
              'Yeh aapka current SARA data replace kar dega.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Restore karo',
                  style: 'destructive',
                  onPress: async () => {
                    setRestoreLoading(true);
                    const result = await restoreFromFile();
                    setRestoreLoading(false);
                    if (result.success) {
                      Alert.alert('✅ Success', 'Data restore ho gaya!', [
                        { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
                      ]);
                    } else if (!result.canceled) {
                      Alert.alert('Error', 'Restore fail hua. Sahi .json file select karo.');
                    }
                  },
                },
              ]
            );
          },
        },
        {
          text: '☁️ Google Drive se',
          onPress: () => {
            // Google Drive app khulega — user wahan se file copy karke restore kar sakta hai
            Alert.alert(
              'Google Drive se restore',
              'Steps:\n\n1. Google Drive app kholo\n2. Apni pharmacy_backup.json file dhundho\n3. File ko "Download" karo phone mein\n4. Wapas yahan aao aur "File select karo" dabao',
              [{ text: 'Samajh gaya', style: 'default' }]
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // ── Delete All Data ───────────────────────────
  const handleDeleteAll = async () => {
    if (Platform.OS === 'web') {
      const first = window.confirm('⚠️ KHABARDAR!\n\nSara data DELETE ho jayega — medicines, sales, sab kuch.\n\nAgey barhein?');
      if (!first) return;
      const second = window.confirm('🔴 LAST WARNING!\n\nYeh action UNDO nahi ho sakta.\n\nPakka delete karna hai?');
      if (!second) return;
      setDeleteLoading(true);
      try {
        await deleteAllData();
        window.alert('✅ Sara data delete ho gaya.');
        navigation.navigate('Dashboard');
      } catch (err) {
        window.alert('❌ Delete fail hua: ' + err.message);
      } finally {
        setDeleteLoading(false);
      }
      return;
    }

    // Mobile
    Alert.alert(
      '⚠️ Delete all data',
      'Sara data DELETE ho jayega — medicines, sales, bills, sab kuch. Yeh UNDO nahi ho sakta!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: '🔴 Delete karo',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Bilkul pakka?',
              'Last chance — sara data hamesha ke liye chala jayega.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Haan, delete karo',
                  style: 'destructive',
                  onPress: async () => {
                    setDeleteLoading(true);
                    try {
                      await deleteAllData();
                      Alert.alert('✅ Done', 'Sara data delete ho gaya.', [
                        { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
                      ]);
                    } catch (err) {
                      Alert.alert('Error', 'Delete fail hua: ' + err.message);
                    } finally {
                      setDeleteLoading(false);
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const backupItems = [
    { icon: 'medkit-outline',      label: 'All medicines & stock levels' },
    { icon: 'cash-outline',        label: 'Purchase & sell prices'       },
    { icon: 'receipt-outline',     label: 'Complete sales history'       },
    { icon: 'trending-up-outline', label: 'Profit & loss records'        },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Backup & restore</Text>
          <Text style={styles.headerSub}>Keep your data safe</Text>
        </View>
      </Animated.View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: contentFade, transform: [{ translateY: contentSlide }], gap: 14 }}>

          {/* Status card */}
          <View style={styles.statusCard}>
            <View style={styles.statusTop}>
              <View style={styles.statusLeft}>
                <Animated.View style={[styles.statusDot, { transform: [{ scale: pulseAnim }] }, backupDone && { backgroundColor: Colors.successGreen }]} />
                <Text style={styles.statusText}>{backupDone ? 'Backup complete' : 'Backup ready'}</Text>
              </View>
            </View>
            <View style={styles.statusDivider} />
            <InfoRow icon="time-outline" label="Last backup" value={lastBackup} delay={300} />
          </View>

          {/* Backup now */}
          <TouchableOpacity
            style={[styles.backupNowBtn, backupLoading && { opacity: 0.7 }]}
            onPress={handleBackup}
            disabled={backupLoading}
            activeOpacity={0.85}
          >
            <Ionicons name={backupDone ? 'checkmark-circle' : 'cloud-upload-outline'} size={20} color={Colors.white} />
            <Text style={styles.backupNowText}>
              {backupLoading ? 'Preparing backup...' : backupDone ? 'Backup successful!' : 'Backup now'}
            </Text>
          </TouchableOpacity>

          {/* Restore card */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionCardHeader}>
              <View style={styles.sectionIconWrap}>
                <Ionicons name="cloud-download-outline" size={18} color={Colors.skyBlueDark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionCardTitle}>Restore data</Text>
                <Text style={styles.sectionCardSub}>
                  {Platform.OS === 'web'
                    ? 'PC pe: backup .json file select karo restore ke liye.'
                    : 'Mobile pe: file select karo ya Google Drive se download karke restore karo.'}
                </Text>
              </View>
            </View>
            <View style={styles.restoreSteps}>
              {(Platform.OS === 'web'
                ? ['Restore button dabao', 'Apni pharmacy_backup.json file select karo', 'Data automatically restore ho jayega']
                : ['Restore button dabao', 'Google Drive se file download karo ya directly select karo', 'Data automatically restore ho jayega']
              ).map((step, i) => (
                <View key={i} style={styles.restoreStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.restoreBtn, restoreLoading && { opacity: 0.7 }]}
              onPress={handleRestore}
              disabled={restoreLoading}
              activeOpacity={0.85}
            >
              <Ionicons name="cloud-download-outline" size={18} color={Colors.skyBlueDark} />
              <Text style={styles.restoreBtnText}>{restoreLoading ? 'Restoring...' : 'Restore from file'}</Text>
            </TouchableOpacity>
          </View>

          {/* What gets backed up */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionCardHeader}>
              <View style={styles.sectionIconWrap}>
                <Ionicons name="shield-checkmark-outline" size={18} color={Colors.skyBlueDark} />
              </View>
              <View>
                <Text style={styles.sectionCardTitle}>What gets backed up</Text>
                <Text style={styles.sectionCardSub}>Everything saved safely</Text>
              </View>
            </View>
            <View style={{ gap: 10 }}>
              {backupItems.map((item, i) => (
                <View key={i} style={styles.backupItem}>
                  <View style={styles.backupItemIcon}>
                    <Ionicons name={item.icon} size={15} color={Colors.successGreen} />
                  </View>
                  <Text style={styles.backupItemText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Info card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={18} color={Colors.skyBlueDark} />
            <Text style={styles.infoCardText}>
              Tap "Backup now" to export your data as a file. Save it to Google Drive, WhatsApp, or any cloud storage. Use the same file to restore on a new phone.
            </Text>
          </View>

          {/* ⚠️ Delete all data */}
          <View style={styles.dangerCard}>
            <View style={styles.dangerHeader}>
              <View style={styles.dangerIconWrap}>
                <Ionicons name="warning-outline" size={18} color={Colors.dangerRed} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.dangerTitle}>Danger zone</Text>
                <Text style={styles.dangerSub}>Yeh action undo nahi ho sakta</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.deleteBtn, deleteLoading && { opacity: 0.7 }]}
              onPress={handleDeleteAll}
              disabled={deleteLoading}
              activeOpacity={0.85}
            >
              <Ionicons name="trash-outline" size={18} color={Colors.white} />
              <Text style={styles.deleteBtnText}>
                {deleteLoading ? 'Deleting...' : 'Delete all data'}
              </Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:         { flex: 1, backgroundColor: Colors.gray50 },
  header:            { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center' },
  backBtn:           { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  headerTitle:       { color: Colors.white, fontSize: 17, fontWeight: '600' },
  headerSub:         { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
  scroll:            { flex: 1 },
  scrollContent:     { padding: 14, paddingBottom: 40 },
  statusCard:        { backgroundColor: Colors.white, borderRadius: 14, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, gap: 10 },
  statusTop:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusLeft:        { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot:         { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.skyBlueDark },
  statusText:        { fontSize: 13, fontWeight: '600', color: Colors.black },
  statusDivider:     { height: 0.5, backgroundColor: Colors.gray200 },
  infoRow:           { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoIconWrap:      { width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.skyBlueLight, alignItems: 'center', justifyContent: 'center' },
  infoLabel:         { flex: 1, fontSize: 12, color: Colors.gray700 },
  infoValue:         { fontSize: 12, fontWeight: '600', color: Colors.black },
  backupNowBtn:      { backgroundColor: Colors.darkBlue, borderRadius: 12, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  backupNowText:     { color: Colors.white, fontSize: 15, fontWeight: '600' },
  sectionCard:       { backgroundColor: Colors.white, borderRadius: 14, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, gap: 14 },
  sectionCardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  sectionIconWrap:   { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.skyBlueLight, alignItems: 'center', justifyContent: 'center' },
  sectionCardTitle:  { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 3 },
  sectionCardSub:    { fontSize: 11, color: Colors.gray500, lineHeight: 16 },
  restoreSteps:      { gap: 10 },
  restoreStep:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepNumber:        { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.darkBlueLight, alignItems: 'center', justifyContent: 'center' },
  stepNumberText:    { fontSize: 11, fontWeight: '700', color: Colors.darkBlue },
  stepText:          { fontSize: 12, color: Colors.gray700, flex: 1 },
  restoreBtn:        { borderWidth: 1.5, borderColor: Colors.skyBlueDark, borderRadius: 12, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  restoreBtnText:    { fontSize: 13, fontWeight: '600', color: Colors.skyBlueDark },
  backupItem:        { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backupItemIcon:    { width: 26, height: 26, borderRadius: 8, backgroundColor: Colors.successBg, alignItems: 'center', justifyContent: 'center' },
  backupItemText:    { fontSize: 12, color: Colors.gray700 },
  infoCard:          { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 12, backgroundColor: Colors.skyBlueLight, borderRadius: 12, borderWidth: 0.5, borderColor: Colors.skyBlueMid },
  infoCardText:      { flex: 1, fontSize: 11, color: Colors.darkBlue, lineHeight: 17 },
  // Danger zone
  dangerCard:        { backgroundColor: Colors.white, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.dangerRed + '40', gap: 14 },
  dangerHeader:      { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  dangerIconWrap:    { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.dangerBg, alignItems: 'center', justifyContent: 'center' },
  dangerTitle:       { fontSize: 14, fontWeight: '600', color: Colors.dangerRed, marginBottom: 3 },
  dangerSub:         { fontSize: 11, color: Colors.gray500 },
  deleteBtn:         { backgroundColor: Colors.dangerRed, borderRadius: 12, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  deleteBtnText:     { color: Colors.white, fontSize: 13, fontWeight: '600' },
}); 