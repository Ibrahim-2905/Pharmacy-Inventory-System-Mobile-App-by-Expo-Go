// import React, { useEffect, useRef, useCallback } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Animated,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';
// import Colors from '../theme/colors';

// import useStore from '../store/useStore';
// import {
//   getTodayTotal,
//   getTodayProfit,
//   getLowStock,
//   getAllMedicines,
// } from '../database/queries';
// import Footer from '../components/Footer';

// const StatCard = ({ label, value, sub, valueColor, delay }) => {
//   const fade  = useRef(new Animated.Value(0)).current;
//   const slide = useRef(new Animated.Value(24)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fade,  { toValue: 1, duration: 420, delay, useNativeDriver: true }),
//       Animated.timing(slide, { toValue: 0, duration: 420, delay, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[styles.statCard, { opacity: fade, transform: [{ translateY: slide }] }]}>
//       <Text style={styles.statLabel}>{label}</Text>
//       <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
//       {sub && <Text style={styles.statSub}>{sub}</Text>}
//     </Animated.View>
//   );
// };

// const AlertRow = ({ name, detail, type, delay }) => {
//   const fade  = useRef(new Animated.Value(0)).current;
//   const slide = useRef(new Animated.Value(20)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fade,  { toValue: 1, duration: 380, delay, useNativeDriver: true }),
//       Animated.timing(slide, { toValue: 0, duration: 380, delay, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const badge = {
//     critical: { bg: Colors.dangerBg,  text: Colors.dangerText,  label: 'Critical' },
//     low:      { bg: Colors.warningBg, text: Colors.warningText, label: 'Low'      },
//   }[type];

//   return (
//     <Animated.View style={[styles.alertRow, { opacity: fade, transform: [{ translateX: slide }] }]}>
//       <View style={[styles.alertDot, { backgroundColor: type === 'critical' ? Colors.dangerRed : Colors.warningAmber }]} />
//       <View style={{ flex: 1 }}>
//         <Text style={styles.alertName}>{name}</Text>
//         <Text style={styles.alertDetail}>{detail}</Text>
//       </View>
//       <View style={[styles.badge, { backgroundColor: badge.bg }]}>
//         <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
//       </View>
//     </Animated.View>
//   );
// };

// const QuickBtn = ({ icon, label, iconBg, iconColor, onPress, delay }) => {
//   const fade  = useRef(new Animated.Value(0)).current;
//   const scale = useRef(new Animated.Value(0.85)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
//       Animated.spring(scale, { toValue: 1, delay, useNativeDriver: true, friction: 6 }),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={{ flex: 1, opacity: fade, transform: [{ scale }] }}>
//       <TouchableOpacity style={styles.quickBtn} onPress={onPress} activeOpacity={0.75}>
//         <View style={[styles.quickIcon, { backgroundColor: iconBg }]}>
//           <Ionicons name={icon} size={20} color={iconColor} />
//         </View>
//         <Text style={styles.quickLabel}>{label}</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// export default function DashboardScreen({ navigation }) {
//   const insets    = useSafeAreaInsets();
//   const dashStats = useStore(s => s.dashStats);
//   const setDashStats = useStore(s => s.setDashStats);

//   const headerSlide = useRef(new Animated.Value(-50)).current;
//   const headerFade  = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(headerSlide, { toValue: 0, duration: 480, useNativeDriver: true }),
//       Animated.timing(headerFade,  { toValue: 1, duration: 480, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       loadStats();
//     }, [])
//   );

//   const loadStats = async () => {
//     try {
//       const [todayData, profit, lowStock, allMeds] = await Promise.all([
//         getTodayTotal(),
//         getTodayProfit(),
//         getLowStock(),
//         getAllMedicines(),
//       ]);
//       setDashStats({
//         todaySales:  todayData?.total_sales  || 0,
//         todayProfit: profit                  || 0,
//         totalStock:  allMeds.length          || 0,
//         lowStock:    lowStock.length         || 0,
//         billCount:   todayData?.bill_count   || 0,
//         lowStockList: lowStock,
//       });
//     } catch (err) {
//       console.error('Load stats error:', err);
//     }
//   };

//   const today = new Date().toLocaleDateString('en-PK', {
//     weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
//   });

//   const stats = [
//     { label: 'Today sales',  value: `Rs ${dashStats.todaySales.toLocaleString()}`,  sub: `${dashStats.billCount} bills`,      valueColor: Colors.successGreen, delay: 120 },
//     { label: 'Total stock',  value: `${dashStats.totalStock}`,                       sub: 'medicines',                         valueColor: Colors.skyBlueDark,  delay: 200 },
//     { label: 'Today profit', value: `Rs ${dashStats.todayProfit.toLocaleString()}`,  sub: 'net profit',                        valueColor: Colors.successGreen, delay: 280 },
//     { label: 'Low stock',    value: `${dashStats.lowStock}`,                         sub: 'need restocking',                   valueColor: Colors.dangerRed,    delay: 360 },
//   ];

//   const lowStockList = dashStats.lowStockList || [];

//   const quickActions = [
//     { icon: 'search-outline',     label: 'New sale',   iconBg: Colors.skyBlueLight,  iconColor: Colors.skyBlueDark,  screen: 'Search',   delay: 700 },
//     { icon: 'add-circle-outline', label: 'Add stock',  iconBg: Colors.darkBlueLight, iconColor: Colors.darkBlue,     screen: 'AddStock', delay: 760 },
//     { icon: 'bar-chart-outline',  label: 'Reports',    iconBg: Colors.warningBg,     iconColor: Colors.warningAmber, screen: 'Reports',  delay: 820 },
//     { icon: 'list-outline',       label: 'View stock', iconBg: Colors.gray100,       iconColor: Colors.gray700,      screen: 'Stock',    delay: 880 },
//   ];

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//         <View>
//           <Text style={styles.headerTitle}>Al-Shifa Pharmacy</Text>
//           <Text style={styles.headerSub}>{today}</Text>
//         </View>
//         <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('Backup')} activeOpacity={0.8}>
//           <Ionicons name="settings-outline" size={20} color={Colors.white} />
//         </TouchableOpacity>
//       </Animated.View>

//       <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
//         <View style={styles.statsGrid}>
//           {stats.map((s, i) => <StatCard key={i} {...s} />)}
//         </View>

//         {lowStockList.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>Low stock alerts</Text>
//             <View style={styles.alertsList}>
//               {lowStockList.slice(0, 5).map((m, i) => (
//                 <AlertRow
//                   key={m.id}
//                   name={m.name}
//                   detail={`Only ${m.qty} tablet${m.qty !== 1 ? 's' : ''} left`}
//                   type={m.qty <= 5 ? 'critical' : 'low'}
//                   delay={480 + i * 80}
//                 />
//               ))}
//             </View>
//           </>
//         )}

//         <Text style={styles.sectionTitle}>Quick actions</Text>
//         <View style={styles.quickRow}>
//           {quickActions.map((q, i) => (
//             <QuickBtn
//               key={i}
//               icon={q.icon}
//               label={q.label}
//               iconBg={q.iconBg}
//               iconColor={q.iconColor}
//               delay={q.delay}
//               onPress={() => navigation.navigate(q.screen)}
//             />
//           ))}
//         </View>
//       </ScrollView>

//       <Footer activeScreen="Dashboard" navigation={navigation} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:    { flex: 1, backgroundColor: Colors.gray50 },
//   header:       { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   headerTitle:  { color: Colors.white, fontSize: 17, fontWeight: '600' },
//   headerSub:    { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 },
//   settingsBtn:  { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
//   scroll:       { flex: 1 },
//   scrollContent:{ padding: 14, paddingBottom: 20 },
//   statsGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
//   statCard:     { width: '47.5%', backgroundColor: Colors.white, borderRadius: 12, padding: 13, borderWidth: 0.5, borderColor: Colors.gray200 },
//   statLabel:    { fontSize: 11, color: Colors.gray500, marginBottom: 4 },
//   statValue:    { fontSize: 20, fontWeight: '600' },
//   statSub:      { fontSize: 10, color: Colors.gray500, marginTop: 3 },
//   sectionTitle: { fontSize: 11, fontWeight: '600', color: Colors.gray500, marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' },
//   alertsList:   { gap: 8, marginBottom: 22 },
//   alertRow:     { backgroundColor: Colors.white, borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: Colors.gray200, gap: 10 },
//   alertDot:     { width: 7, height: 7, borderRadius: 4 },
//   alertName:    { fontSize: 13, fontWeight: '500', color: Colors.black },
//   alertDetail:  { fontSize: 11, color: Colors.gray500, marginTop: 2 },
//   badge:        { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
//   badgeText:    { fontSize: 10, fontWeight: '600' },
//   quickRow:     { flexDirection: 'row', gap: 8 },
//   quickBtn:     { alignItems: 'center', backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 14, borderWidth: 0.5, borderColor: Colors.gray200 },
//   quickIcon:    { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
//   quickLabel:   { fontSize: 10, color: Colors.gray700, fontWeight: '500', textAlign: 'center' },
// });







import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Animated, TextInput,
  Alert, Platform, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../theme/colors';

import useStore from '../store/useStore';
import {
  getTodayTotal,
  getTodayProfit,
  getLowStock,
  getAllMedicines,
} from '../database/queries';
import Footer from '../components/Footer';

const DEFAULT_NAME = 'Pharmacy Inventory System';
const STORAGE_KEY  = 'pharmacy_name';

const StatCard = ({ label, value, sub, valueColor, delay }) => {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 420, delay, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 420, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.statCard, { opacity: fade, transform: [{ translateY: slide }] }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
      {sub && <Text style={styles.statSub}>{sub}</Text>}
    </Animated.View>
  );
};

const AlertRow = ({ name, detail, type, delay }) => {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 380, delay, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 380, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  const badge = {
    critical: { bg: Colors.dangerBg,  text: Colors.dangerText,  label: 'Critical' },
    low:      { bg: Colors.warningBg, text: Colors.warningText, label: 'Low'      },
  }[type];

  return (
    <Animated.View style={[styles.alertRow, { opacity: fade, transform: [{ translateX: slide }] }]}>
      <View style={[styles.alertDot, { backgroundColor: type === 'critical' ? Colors.dangerRed : Colors.warningAmber }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.alertName}>{name}</Text>
        <Text style={styles.alertDetail}>{detail}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: badge.bg }]}>
        <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
      </View>
    </Animated.View>
  );
};

const QuickBtn = ({ icon, label, iconBg, iconColor, onPress, delay }) => {
  const fade  = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, delay, useNativeDriver: true, friction: 6 }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity: fade, transform: [{ scale }] }}>
      <TouchableOpacity style={styles.quickBtn} onPress={onPress} activeOpacity={0.75}>
        <View style={[styles.quickIcon, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <Text style={styles.quickLabel}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function DashboardScreen({ navigation }) {
  const insets       = useSafeAreaInsets();
  const dashStats    = useStore(s => s.dashStats);
  const setDashStats = useStore(s => s.setDashStats);

  const [shopName,   setShopName]   = useState(DEFAULT_NAME);
  const [editing,    setEditing]    = useState(false);
  const [inputVal,   setInputVal]   = useState('');

  const headerSlide = useRef(new Animated.Value(-50)).current;
  const headerFade  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerSlide, { toValue: 0, duration: 480, useNativeDriver: true }),
      Animated.timing(headerFade,  { toValue: 1, duration: 480, useNativeDriver: true }),
    ]).start();
    loadShopName();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  // ── Load saved name ───────────────────────────
  const loadShopName = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setShopName(saved);
    } catch {}
  };

  // ── Save name ─────────────────────────────────
  const saveShopName = async () => {
    const trimmed = inputVal.trim();
    if (!trimmed) {
      if (Platform.OS === 'web') {
        window.alert('Naam khali nahi ho sakta');
      } else {
        Alert.alert('Error', 'Naam khali nahi ho sakta');
      }
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, trimmed);
      setShopName(trimmed);
      setEditing(false);
    } catch {
      if (Platform.OS === 'web') {
        window.alert('Save nahi hua, dobara try karo');
      } else {
        Alert.alert('Error', 'Save nahi hua');
      }
    }
  };

  const startEditing = () => {
    setInputVal(shopName);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setInputVal('');
  };

  const loadStats = async () => {
    try {
      const [todayData, profit, lowStock, allMeds] = await Promise.all([
        getTodayTotal(),
        getTodayProfit(),
        getLowStock(),
        getAllMedicines(),
      ]);
      setDashStats({
        todaySales:   todayData?.total_sales || 0,
        todayProfit:  profit                 || 0,
        totalStock:   allMeds.length         || 0,
        lowStock:     lowStock.length        || 0,
        billCount:    todayData?.bill_count  || 0,
        lowStockList: lowStock,
      });
    } catch (err) {
      console.error('Load stats error:', err);
    }
  };

  const today = new Date().toLocaleDateString('en-PK', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const stats = [
    { label: 'Today sales',  value: `Rs ${dashStats.todaySales.toLocaleString()}`,   sub: `${dashStats.billCount} bills`, valueColor: Colors.successGreen, delay: 120 },
    { label: 'Total stock',  value: `${dashStats.totalStock}`,                        sub: 'medicines',                   valueColor: Colors.skyBlueDark,  delay: 200 },
    { label: 'Today profit', value: `Rs ${dashStats.todayProfit.toLocaleString()}`,   sub: 'net profit',                  valueColor: Colors.successGreen, delay: 280 },
    { label: 'Low stock',    value: `${dashStats.lowStock}`,                          sub: 'need restocking',             valueColor: Colors.dangerRed,    delay: 360 },
  ];

  const lowStockList = dashStats.lowStockList || [];

  const quickActions = [
    { icon: 'search-outline',     label: 'New sale',   iconBg: Colors.skyBlueLight,  iconColor: Colors.skyBlueDark,  screen: 'Search',   delay: 700 },
    { icon: 'add-circle-outline', label: 'Add stock',  iconBg: Colors.darkBlueLight, iconColor: Colors.darkBlue,     screen: 'AddStock', delay: 760 },
    { icon: 'bar-chart-outline',  label: 'Reports',    iconBg: Colors.warningBg,     iconColor: Colors.warningAmber, screen: 'Reports',  delay: 820 },
    { icon: 'list-outline',       label: 'View stock', iconBg: Colors.gray100,       iconColor: Colors.gray700,      screen: 'Stock',    delay: 880 },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
        <View style={{ flex: 1 }}>
          {editing ? (
            // ── Edit mode ──────────────────────
            <View style={styles.editRow}>
              <TextInput
                style={styles.nameInput}
                value={inputVal}
                onChangeText={setInputVal}
                autoFocus
                maxLength={40}
                placeholder="Shop ka naam likho"
                placeholderTextColor="rgba(255,255,255,0.4)"
                returnKeyType="done"
                onSubmitEditing={saveShopName}
              />
              <TouchableOpacity onPress={saveShopName} style={styles.editActionBtn}>
                <Ionicons name="checkmark" size={20} color={Colors.successGreen} />
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelEditing} style={styles.editActionBtn}>
                <Ionicons name="close" size={20} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>
          ) : (
            // ── Display mode ───────────────────
            <Pressable onPress={startEditing} style={styles.nameRow}>
              <Text style={styles.headerTitle} numberOfLines={1}>{shopName}</Text>
              <Ionicons name="pencil-outline" size={13} color="rgba(255,255,255,0.5)" style={{ marginLeft: 6, marginTop: 2 }} />
            </Pressable>
          )}
          <Text style={styles.headerSub}>{today}</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate('Backup')}
          activeOpacity={0.8}
        >
          <Ionicons name="settings-outline" size={20} color={Colors.white} />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </View>

        {lowStockList.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Low stock alerts</Text>
            <View style={styles.alertsList}>
              {lowStockList.slice(0, 5).map((m, i) => (
                <AlertRow
                  key={m.id}
                  name={m.name}
                  detail={`Only ${m.qty} tablet${m.qty !== 1 ? 's' : ''} left`}
                  type={m.qty <= 5 ? 'critical' : 'low'}
                  delay={480 + i * 80}
                />
              ))}
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.quickRow}>
          {quickActions.map((q, i) => (
            <QuickBtn
              key={i}
              icon={q.icon}
              label={q.label}
              iconBg={q.iconBg}
              iconColor={q.iconColor}
              delay={q.delay}
              onPress={() => navigation.navigate(q.screen)}
            />
          ))}
        </View>
      </ScrollView>

      <Footer activeScreen="Dashboard" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: Colors.gray50 },
  header:        { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nameRow:       { flexDirection: 'row', alignItems: 'center' },
  headerTitle:   { color: Colors.white, fontSize: 17, fontWeight: '600', flexShrink: 1 },
  headerSub:     { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 },
  settingsBtn:   { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  editRow:       { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nameInput:     { flex: 1, color: Colors.white, fontSize: 15, fontWeight: '600', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.4)', paddingVertical: 2, paddingHorizontal: 0 },
  editActionBtn: { padding: 4 },
  scroll:        { flex: 1 },
  scrollContent: { padding: 14, paddingBottom: 20 },
  statsGrid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  statCard:      { width: '47.5%', backgroundColor: Colors.white, borderRadius: 12, padding: 13, borderWidth: 0.5, borderColor: Colors.gray200 },
  statLabel:     { fontSize: 11, color: Colors.gray500, marginBottom: 4 },
  statValue:     { fontSize: 20, fontWeight: '600' },
  statSub:       { fontSize: 10, color: Colors.gray500, marginTop: 3 },
  sectionTitle:  { fontSize: 11, fontWeight: '600', color: Colors.gray500, marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' },
  alertsList:    { gap: 8, marginBottom: 22 },
  alertRow:      { backgroundColor: Colors.white, borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: Colors.gray200, gap: 10 },
  alertDot:      { width: 7, height: 7, borderRadius: 4 },
  alertName:     { fontSize: 13, fontWeight: '500', color: Colors.black },
  alertDetail:   { fontSize: 11, color: Colors.gray500, marginTop: 2 },
  badge:         { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
  badgeText:     { fontSize: 10, fontWeight: '600' },
  quickRow:      { flexDirection: 'row', gap: 8 },
  quickBtn:      { alignItems: 'center', backgroundColor: Colors.white, borderRadius: 12, paddingVertical: 14, borderWidth: 0.5, borderColor: Colors.gray200 },
  quickIcon:     { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  quickLabel:    { fontSize: 10, color: Colors.gray700, fontWeight: '500', textAlign: 'center' },
});