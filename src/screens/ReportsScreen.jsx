// // import React, { useEffect, useRef, useState } from 'react';
// // import {
// //   View, Text, ScrollView, StyleSheet,
// //   TouchableOpacity, Animated,
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import Colors from '../theme/colors';
// // import Footer from '../components/Footer';


// // // ── Stat card ─────────────────────────────────
// // const StatCard = ({ label, value, sub, valueColor, icon, delay }) => {
// //   const fade  = useRef(new Animated.Value(0)).current;
// //   const slide = useRef(new Animated.Value(20)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(fade,  { toValue: 1, duration: 400, delay, useNativeDriver: true }),
// //       Animated.timing(slide, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
// //     ]).start();
// //   }, []);

// //   return (
// //     <Animated.View style={[styles.statCard, { opacity: fade, transform: [{ translateY: slide }] }]}>
// //       <View style={[styles.statIconWrap, { backgroundColor: valueColor + '20' }]}>
// //         <Ionicons name={icon} size={18} color={valueColor} />
// //       </View>
// //       <Text style={styles.statLabel}>{label}</Text>
// //       <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
// //       {sub && <Text style={styles.statSub}>{sub}</Text>}
// //     </Animated.View>
// //   );
// // };

// // // ── Report button ─────────────────────────────
// // const ReportBtn = ({ title, sub, icon, onPress, delay }) => {
// //   const fade  = useRef(new Animated.Value(0)).current;
// //   const slide = useRef(new Animated.Value(16)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
// //       Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
// //     ]).start();
// //   }, []);

// //   return (
// //     <Animated.View style={[{ opacity: fade, transform: [{ translateY: slide }] }]}>
// //       <TouchableOpacity style={styles.reportBtn} onPress={onPress} activeOpacity={0.75}>
// //         <View style={styles.reportBtnLeft}>
// //           <View style={styles.reportIconWrap}>
// //             <Ionicons name={icon} size={18} color={Colors.skyBlueDark} />
// //           </View>
// //           <View>
// //             <Text style={styles.reportBtnTitle}>{title}</Text>
// //             <Text style={styles.reportBtnSub}>{sub}</Text>
// //           </View>
// //         </View>
// //         <View style={styles.pdfBadge}>
// //           <Ionicons name="download-outline" size={13} color={Colors.skyBlueDark} />
// //           <Text style={styles.pdfBadgeText}>PDF</Text>
// //         </View>
// //       </TouchableOpacity>
// //     </Animated.View>
// //   );
// // };

// // // ── Medicine profit row ───────────────────────
// // const ProfitRow = ({ name, sold, profit, delay }) => {
// //   const fade  = useRef(new Animated.Value(0)).current;
// //   const slide = useRef(new Animated.Value(12)).current;
// //   const barAnim = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(fade,    { toValue: 1,   duration: 350, delay, useNativeDriver: true }),
// //       Animated.timing(slide,   { toValue: 0,   duration: 350, delay, useNativeDriver: true }),
// //       Animated.timing(barAnim, { toValue: 1,   duration: 600, delay: delay + 100, useNativeDriver: false }),
// //     ]).start();
// //   }, []);

// //   const isLoss   = profit < 0;
// //   const barColor = isLoss ? Colors.dangerRed : Colors.successGreen;
// //   const barWidth = barAnim.interpolate({
// //     inputRange:  [0, 1],
// //     outputRange: ['0%', `${Math.min(Math.abs(profit) / 5, 100)}%`],
// //   });

// //   return (
// //     <Animated.View style={[styles.profitRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
// //       <View style={styles.profitTop}>
// //         <Text style={styles.profitName}>{name}</Text>
// //         <Text style={[styles.profitVal, { color: barColor }]}>
// //           {isLoss ? '-' : '+'} Rs {Math.abs(profit)}
// //         </Text>
// //       </View>
// //       <View style={styles.profitBarBg}>
// //         <Animated.View style={[styles.profitBarFill, { width: barWidth, backgroundColor: barColor }]} />
// //       </View>
// //       <Text style={styles.profitSold}>{sold} tablets sold</Text>
// //     </Animated.View>
// //   );
// // };

// // // ── Reports screen ────────────────────────────
// // export default function ReportsScreen({ navigation }) {
// //   const insets = useSafeAreaInsets();
// //   const [activeTab, setActiveTab] = useState('today');

// //   const headerFade  = useRef(new Animated.Value(0)).current;
// //   const headerSlide = useRef(new Animated.Value(-40)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
// //       Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
// //     ]).start();
// //   }, []);

// //   const today = new Date().toLocaleDateString('en-PK', {
// //     day: 'numeric', month: 'long', year: 'numeric',
// //   });

// //   const month = new Date().toLocaleDateString('en-PK', {
// //     month: 'long', year: 'numeric',
// //   });

// //   const todayStats = [
// //     { label: 'Sales',   value: 'Rs 4,280', sub: '18 tablets',    valueColor: Colors.skyBlueDark,  icon: 'cash-outline',        delay: 100 },
// //     { label: 'Profit',  value: 'Rs 860',   sub: '+12%',          valueColor: Colors.successGreen, icon: 'trending-up-outline', delay: 180 },
// //     { label: 'Bills',   value: '6',        sub: 'transactions',  valueColor: Colors.darkBlue,     icon: 'receipt-outline',     delay: 260 },
// //     { label: 'Loss',    value: 'Rs 0',     sub: 'no loss today', valueColor: Colors.dangerRed,    icon: 'trending-down-outline',delay: 340 },
// //   ];

// //   const monthStats = [
// //     { label: 'Sales',   value: 'Rs 92,400', sub: '420 tablets',  valueColor: Colors.skyBlueDark,  icon: 'cash-outline',         delay: 100 },
// //     { label: 'Profit',  value: 'Rs 18,200', sub: '+8% avg',      valueColor: Colors.successGreen, icon: 'trending-up-outline',  delay: 180 },
// //     { label: 'Bills',   value: '134',       sub: 'transactions', valueColor: Colors.darkBlue,     icon: 'receipt-outline',      delay: 260 },
// //     { label: 'Loss',    value: 'Rs 320',    sub: '2 medicines',  valueColor: Colors.dangerRed,    icon: 'trending-down-outline', delay: 340 },
// //   ];

// //   const profitData = [
// //     { id: 1, name: 'Augmentin 625mg', sold: 24, profit: 600 },
// //     { id: 2, name: 'Brufen 400mg',    sold: 18, profit: 126 },
// //     { id: 3, name: 'Panadol 500mg',   sold: 30, profit: 90  },
// //     { id: 4, name: 'Disprin 300mg',   sold: 12, profit: 48  },
// //     { id: 5, name: 'Flagyl 400mg',    sold: 8,  profit: -16 },
// //   ];

// //   const activeStats = activeTab === 'today' ? todayStats : monthStats;
// //   const activePeriod = activeTab === 'today' ? today : month;

// //   return (
// //     <View style={[styles.container, { paddingTop: insets.top }]}>

// //       {/* Header */}
// //       <Animated.View style={[
// //         styles.header,
// //         { opacity: headerFade, transform: [{ translateY: headerSlide }] },
// //       ]}>
// //         <View>
// //           <Text style={styles.headerTitle}>Reports</Text>
// //           <Text style={styles.headerSub}>{activePeriod}</Text>
// //         </View>
// //         <TouchableOpacity
// //           style={styles.backupBtn}
// //           onPress={() => navigation.navigate('Backup')}
// //           activeOpacity={0.8}
// //         >
// //           <Ionicons name="cloud-outline" size={20} color={Colors.white} />
// //         </TouchableOpacity>
// //       </Animated.View>

// //       {/* Tab switcher */}
// //       <View style={styles.tabRow}>
// //         <TouchableOpacity
// //           style={[styles.tab, activeTab === 'today' && styles.tabActive]}
// //           onPress={() => setActiveTab('today')}
// //           activeOpacity={0.8}
// //         >
// //           <Text style={[styles.tabText, activeTab === 'today' && styles.tabTextActive]}>
// //             Today
// //           </Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={[styles.tab, activeTab === 'month' && styles.tabActive]}
// //           onPress={() => setActiveTab('month')}
// //           activeOpacity={0.8}
// //         >
// //           <Text style={[styles.tabText, activeTab === 'month' && styles.tabTextActive]}>
// //             This month
// //           </Text>
// //         </TouchableOpacity>
// //       </View>

// //       <ScrollView
// //         style={styles.scroll}
// //         contentContainerStyle={styles.scrollContent}
// //         showsVerticalScrollIndicator={false}
// //       >

// //         {/* Stats grid */}
// //         <View style={styles.statsGrid}>
// //           {activeStats.map((s, i) => <StatCard key={i} {...s} />)}
// //         </View>

// //         {/* Download reports */}
// //         <Text style={styles.sectionTitle}>Download report</Text>
// //         <View style={styles.reportBtns}>
// //           <ReportBtn
// //             title="Today's report"
// //             sub={today}
// //             icon="today-outline"
// //             delay={400}
// //             onPress={() => console.log('download today PDF')}
// //           />
// //           <ReportBtn
// //             title="Monthly report"
// //             sub={month}
// //             icon="calendar-outline"
// //             delay={460}
// //             onPress={() => console.log('download month PDF')}
// //           />
// //         </View>

// //         {/* Profit / Loss per medicine */}
// //         <Text style={styles.sectionTitle}>Profit / loss per medicine</Text>
// //         <View style={styles.profitCard}>
// //           {profitData.map((p, i) => (
// //             <ProfitRow
// //               key={p.id}
// //               {...p}
// //               delay={500 + i * 70}
// //             />
// //           ))}
// //         </View>

// //       </ScrollView>

// //       <Footer activeScreen="Reports" navigation={navigation} />
// //     </View>
// //   );
// // }

// // // ── Styles ────────────────────────────────────
// // const styles = StyleSheet.create({
// //   container:        { flex: 1, backgroundColor: Colors.gray50 },

// //   header:           {
// //     backgroundColor: Colors.darkBlue,
// //     paddingHorizontal: 16,
// //     paddingTop: 12, paddingBottom: 14,
// //     flexDirection: 'row', alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   headerTitle:      { color: Colors.white, fontSize: 17, fontWeight: '600' },
// //   headerSub:        { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
// //   backupBtn:        {
// //     width: 36, height: 36, borderRadius: 18,
// //     backgroundColor: 'rgba(255,255,255,0.12)',
// //     alignItems: 'center', justifyContent: 'center',
// //   },

// //   tabRow:           {
// //     flexDirection: 'row',
// //     backgroundColor: Colors.white,
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: Colors.gray200,
// //     paddingHorizontal: 16,
// //     gap: 4,
// //   },
// //   tab:              {
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     borderBottomWidth: 2,
// //     borderBottomColor: 'transparent',
// //   },
// //   tabActive:        { borderBottomColor: Colors.skyBlueDark },
// //   tabText:          { fontSize: 13, color: Colors.gray500, fontWeight: '500' },
// //   tabTextActive:    { color: Colors.skyBlueDark, fontWeight: '700' },

// //   scroll:           { flex: 1 },
// //   scrollContent:    { padding: 14, gap: 12, paddingBottom: 20 },

// //   statsGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
// //   statCard:         {
// //     width: '47.5%',
// //     backgroundColor: Colors.white,
// //     borderRadius: 12, padding: 13,
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //     gap: 6,
// //   },
// //   statIconWrap:     {
// //     width: 34, height: 34, borderRadius: 10,
// //     alignItems: 'center', justifyContent: 'center',
// //   },
// //   statLabel:        { fontSize: 11, color: Colors.gray500 },
// //   statValue:        { fontSize: 20, fontWeight: '700' },
// //   statSub:          { fontSize: 10, color: Colors.gray500 },

// //   sectionTitle:     {
// //     fontSize: 11, fontWeight: '600',
// //     color: Colors.gray500,
// //     letterSpacing: 0.5,
// //     textTransform: 'uppercase',
// //   },

// //   reportBtns:       { gap: 8 },
// //   reportBtn:        {
// //     backgroundColor: Colors.white,
// //     borderRadius: 12, padding: 14,
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //     flexDirection: 'row', alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   reportBtnLeft:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
// //   reportIconWrap:   {
// //     width: 38, height: 38, borderRadius: 10,
// //     backgroundColor: Colors.skyBlueLight,
// //     alignItems: 'center', justifyContent: 'center',
// //   },
// //   reportBtnTitle:   { fontSize: 13, fontWeight: '600', color: Colors.black },
// //   reportBtnSub:     { fontSize: 11, color: Colors.gray500, marginTop: 2 },
// //   pdfBadge:         {
// //     flexDirection: 'row', alignItems: 'center', gap: 4,
// //     backgroundColor: Colors.skyBlueLight,
// //     paddingHorizontal: 10, paddingVertical: 6,
// //     borderRadius: 8,
// //   },
// //   pdfBadgeText:     { fontSize: 11, fontWeight: '600', color: Colors.skyBlueDark },

// //   profitCard:       {
// //     backgroundColor: Colors.white,
// //     borderRadius: 12, padding: 14,
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //     gap: 14,
// //   },
// //   profitRow:        { gap: 5 },
// //   profitTop:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
// //   profitName:       { fontSize: 13, fontWeight: '500', color: Colors.black },
// //   profitVal:        { fontSize: 13, fontWeight: '700' },
// //   profitBarBg:      {
// //     height: 5, backgroundColor: Colors.gray100,
// //     borderRadius: 4, overflow: 'hidden',
// //   },
// //   profitBarFill:    { height: 5, borderRadius: 4 },
// //   profitSold:       { fontSize: 10, color: Colors.gray500 },
// // });





























// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//     View, Text, ScrollView, StyleSheet,
//     TouchableOpacity, Animated, Alert,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import Colors from '../theme/colors';

// import {
//     getTodayTotal,
//     getTodayProfit,
//     getMonthTotal,
//     getMonthProfit,
//     getProfitPerMedicine,
//     getTodaySales,
//     getAllSales,
// } from '../database/queries';
// import Footer from '../components/Footer';

// const StatCard = ({ label, value, sub, valueColor, icon, delay }) => {
//     const fade = useRef(new Animated.Value(0)).current;
//     const slide = useRef(new Animated.Value(20)).current;

//     useEffect(() => {
//         Animated.parallel([
//             Animated.timing(fade, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
//             Animated.timing(slide, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
//         ]).start();
//     }, []);

//     return (
//         <Animated.View style={[styles.statCard, { opacity: fade, transform: [{ translateY: slide }] }]}>
//             <View style={[styles.statIconWrap, { backgroundColor: valueColor + '20' }]}>
//                 <Ionicons name={icon} size={18} color={valueColor} />
//             </View>
//             <Text style={styles.statLabel}>{label}</Text>
//             <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
//             {sub && <Text style={styles.statSub}>{sub}</Text>}
//         </Animated.View>
//     );
// };

// const ProfitRow = ({ name, total_sold, profit, delay }) => {
//     const fade = useRef(new Animated.Value(0)).current;
//     const slide = useRef(new Animated.Value(12)).current;
//     const barAnim = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.parallel([
//             Animated.timing(fade, { toValue: 1, duration: 350, delay, useNativeDriver: true }),
//             Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
//             Animated.timing(barAnim, { toValue: 1, duration: 600, delay: delay + 100, useNativeDriver: false }),
//         ]).start();
//     }, []);

//     const isLoss = profit < 0;
//     const barColor = isLoss ? Colors.dangerRed : Colors.successGreen;
//     const barWidth = barAnim.interpolate({
//         inputRange: [0, 1],
//         outputRange: ['0%', `${Math.min(Math.abs(profit) / 10, 100)}%`],
//     });

//     return (
//         <Animated.View style={[styles.profitRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
//             <View style={styles.profitTop}>
//                 <Text style={styles.profitName} numberOfLines={1}>{name}</Text>
//                 <Text style={[styles.profitVal, { color: barColor }]}>
//                     {isLoss ? '-' : '+'} Rs {Math.abs(profit).toFixed(0)}
//                 </Text>
//             </View>
//             <View style={styles.profitBarBg}>
//                 <Animated.View style={[styles.profitBarFill, { width: barWidth, backgroundColor: barColor }]} />
//             </View>
//             <Text style={styles.profitSold}>{total_sold} tablets sold</Text>
//         </Animated.View>
//     );
// };

// export default function ReportsScreen({ navigation }) {
//     const insets = useSafeAreaInsets();
//     const [activeTab, setActiveTab] = useState('today');
//     const [loading, setLoading] = useState(true);
//     const [todayData, setTodayData] = useState({ sales: 0, profit: 0, bills: 0 });
//     const [monthData, setMonthData] = useState({ sales: 0, profit: 0, bills: 0 });
//     const [profitData, setProfitData] = useState([]);

//     const headerFade = useRef(new Animated.Value(0)).current;
//     const headerSlide = useRef(new Animated.Value(-40)).current;

//     useEffect(() => {
//         Animated.parallel([
//             Animated.timing(headerFade, { toValue: 1, duration: 400, useNativeDriver: true }),
//             Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
//         ]).start();
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             loadData();
//         }, [])
//     );

//     const loadData = async () => {
//         try {
//             setLoading(true);
//             const [tTotal, tProfit, mTotal, mProfit, profitPerMed] = await Promise.all([
//                 getTodayTotal(),
//                 getTodayProfit(),
//                 getMonthTotal(),
//                 getMonthProfit(),
//                 getProfitPerMedicine(),
//             ]);
//             setTodayData({
//                 sales: tTotal?.total_sales || 0,
//                 profit: tProfit || 0,
//                 bills: tTotal?.bill_count || 0,
//             });
//             setMonthData({
//                 sales: mTotal?.total_sales || 0,
//                 profit: mProfit || 0,
//                 bills: mTotal?.bill_count || 0,
//             });
//             setProfitData(profitPerMed || []);
//         } catch (err) {
//             console.error('Load reports error:', err);
//         } finally {
//             setLoading(false);
//         }
//     };




//     const generatePDF = async (type) => {
//         try {
//             const sales = type === 'today' ? await getTodaySales() : await getAllSales();
//             const data = type === 'today' ? todayData : monthData;
//             const title = type === 'today'
//                 ? `Today's Report — ${new Date().toLocaleDateString('en-PK')}`
//                 : `Monthly Report — ${new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}`;

//             const html = `
//       <html><body style="font-family:Arial;padding:20px;">
//         <h2 style="color:#0C2D57">Al-Shifa Pharmacy</h2>
//         <h3>${title}</h3>
//         <hr/>
//         <p><b>Total Sales:</b> Rs ${data.sales.toLocaleString()}</p>
//         <p><b>Total Profit:</b> Rs ${data.profit.toLocaleString()}</p>
//         <p><b>Total Bills:</b> ${data.bills}</p>
//         <hr/>
//         <h4>Bills</h4>
//         <table width="100%" border="1" cellpadding="5" style="border-collapse:collapse">
//           <tr style="background:#0C2D57;color:white">
//             <th>Bill No</th><th>Total</th><th>Discount</th><th>Date</th>
//           </tr>
//           ${sales.map(s => `
//             <tr>
//               <td>${s.bill_no}</td>
//               <td>Rs ${s.total}</td>
//               <td>${s.discount_pct}%</td>
//               <td>${new Date(s.created_at).toLocaleDateString('en-PK')}</td>
//             </tr>
//           `).join('')}
//         </table>
//         <p style="color:gray;font-size:12px;margin-top:20px">
//           Generated on ${new Date().toLocaleString('en-PK')}
//         </p>
//       </body></html>
//     `;

//             // ✅ printToFileAsync — screen print NAHI karta, sirf file banata hai
//             const { uri } = await Print.printToFileAsync({ html, base64: false });

//             // ✅ File ko move karo taake proper naam mile
//             const fileName = `${type}_report_${Date.now()}.pdf`;
//             const destUri = FileSystem.documentDirectory + fileName;
//             await FileSystem.moveAsync({ from: uri, to: destUri });

//             // ✅ Share sheet khulega — Save to Files / WhatsApp / Drive etc
//             await Sharing.shareAsync(destUri, {
//                 mimeType: 'application/pdf',
//                 UTI: 'com.adobe.pdf',
//                 dialogTitle: 'PDF Download karo',
//             });

//         } catch (err) {
//             console.error('PDF error:', err);
//             Alert.alert('Error', 'PDF generate karne mein masla hua');
//         }
//     };

//     const today = new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' });
//     const month = new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });

//     const active = activeTab === 'today' ? todayData : monthData;

//     const stats = [
//         { label: 'Sales', value: `Rs ${active.sales.toLocaleString()}`, sub: `${active.bills} bills`, valueColor: Colors.skyBlueDark, icon: 'cash-outline', delay: 100 },
//         { label: 'Profit', value: `Rs ${active.profit.toLocaleString()}`, sub: 'net profit', valueColor: Colors.successGreen, icon: 'trending-up-outline', delay: 180 },
//         { label: 'Bills', value: `${active.bills}`, sub: 'transactions', valueColor: Colors.darkBlue, icon: 'receipt-outline', delay: 260 },
//         { label: 'Loss', value: `Rs ${Math.max(0, -active.profit).toLocaleString()}`, sub: 'net loss', valueColor: Colors.dangerRed, icon: 'trending-down-outline', delay: 340 },
//     ];

//     return (
//         <View style={[styles.container, { paddingTop: insets.top }]}>
//             <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//                 <View>
//                     <Text style={styles.headerTitle}>Reports</Text>
//                     <Text style={styles.headerSub}>{activeTab === 'today' ? today : month}</Text>
//                 </View>
//             </Animated.View>

//             <View style={styles.tabRow}>
//                 {['today', 'month'].map(tab => (
//                     <TouchableOpacity
//                         key={tab}
//                         style={[styles.tab, activeTab === tab && styles.tabActive]}
//                         onPress={() => setActiveTab(tab)}
//                         activeOpacity={0.8}
//                     >
//                         <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
//                             {tab === 'today' ? 'Today' : 'This month'}
//                         </Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>

//             <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

//                 <View style={styles.statsGrid}>
//                     {stats.map((s, i) => <StatCard key={i} {...s} />)}
//                 </View>

//                 <Text style={styles.sectionTitle}>Download report</Text>
//                 <View style={styles.reportBtns}>
//                     <TouchableOpacity style={styles.reportBtn} onPress={() => generatePDF('today')} activeOpacity={0.75}>
//                         <View style={styles.reportBtnLeft}>
//                             <View style={styles.reportIconWrap}>
//                                 <Ionicons name="today-outline" size={18} color={Colors.skyBlueDark} />
//                             </View>
//                             <View>
//                                 <Text style={styles.reportBtnTitle}>Today's report</Text>
//                                 <Text style={styles.reportBtnSub}>{today}</Text>
//                             </View>
//                         </View>
//                         <View style={styles.pdfBadge}>
//                             <Ionicons name="download-outline" size={13} color={Colors.skyBlueDark} />
//                             <Text style={styles.pdfBadgeText}>PDF</Text>
//                         </View>
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.reportBtn} onPress={() => generatePDF('month')} activeOpacity={0.75}>
//                         <View style={styles.reportBtnLeft}>
//                             <View style={styles.reportIconWrap}>
//                                 <Ionicons name="calendar-outline" size={18} color={Colors.skyBlueDark} />
//                             </View>
//                             <View>
//                                 <Text style={styles.reportBtnTitle}>Monthly report</Text>
//                                 <Text style={styles.reportBtnSub}>{month}</Text>
//                             </View>
//                         </View>
//                         <View style={styles.pdfBadge}>
//                             <Ionicons name="download-outline" size={13} color={Colors.skyBlueDark} />
//                             <Text style={styles.pdfBadgeText}>PDF</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>

//                 {profitData.length > 0 && (
//                     <>
//                         <Text style={styles.sectionTitle}>Profit / loss per medicine</Text>
//                         <View style={styles.profitCard}>
//                             {profitData.map((p, i) => (
//                                 <ProfitRow key={i} {...p} delay={500 + i * 70} />
//                             ))}
//                         </View>
//                     </>
//                 )}

//             </ScrollView>

//             <Footer activeScreen="Reports" navigation={navigation} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: Colors.gray50 },
//     header: { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//     headerTitle: { color: Colors.white, fontSize: 17, fontWeight: '600' },
//     headerSub: { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
//     tabRow: { flexDirection: 'row', backgroundColor: Colors.white, borderBottomWidth: 0.5, borderBottomColor: Colors.gray200, paddingHorizontal: 16, gap: 4 },
//     tab: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 2, borderBottomColor: 'transparent' },
//     tabActive: { borderBottomColor: Colors.skyBlueDark },
//     tabText: { fontSize: 13, color: Colors.gray500, fontWeight: '500' },
//     tabTextActive: { color: Colors.skyBlueDark, fontWeight: '700' },
//     scroll: { flex: 1 },
//     scrollContent: { padding: 14, gap: 12, paddingBottom: 20 },
//     statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
//     statCard: { width: '47.5%', backgroundColor: Colors.white, borderRadius: 12, padding: 13, borderWidth: 0.5, borderColor: Colors.gray200, gap: 6 },
//     statIconWrap: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
//     statLabel: { fontSize: 11, color: Colors.gray500 },
//     statValue: { fontSize: 20, fontWeight: '700' },
//     statSub: { fontSize: 10, color: Colors.gray500 },
//     sectionTitle: { fontSize: 11, fontWeight: '600', color: Colors.gray500, letterSpacing: 0.5, textTransform: 'uppercase' },
//     reportBtns: { gap: 8 },
//     reportBtn: { backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//     reportBtnLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
//     reportIconWrap: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.skyBlueLight, alignItems: 'center', justifyContent: 'center' },
//     reportBtnTitle: { fontSize: 13, fontWeight: '600', color: Colors.black },
//     reportBtnSub: { fontSize: 11, color: Colors.gray500, marginTop: 2 },
//     pdfBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.skyBlueLight, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
//     pdfBadgeText: { fontSize: 11, fontWeight: '600', color: Colors.skyBlueDark },
//     profitCard: { backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, gap: 14 },
//     profitRow: { gap: 5 },
//     profitTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//     profitName: { fontSize: 13, fontWeight: '500', color: Colors.black, flex: 1 },
//     profitVal: { fontSize: 13, fontWeight: '700' },
//     profitBarBg: { height: 5, backgroundColor: Colors.gray100, borderRadius: 4, overflow: 'hidden' },
//     profitBarFill: { height: 5, borderRadius: 4 },
//     profitSold: { fontSize: 10, color: Colors.gray500 },
// });













import * as FileSystem from 'expo-file-system/legacy';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity, Animated, Alert, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
import Colors from '../theme/colors';

import {
    getTodayTotal,
    getTodayProfit,
    getMonthTotal,
    getMonthProfit,
    getProfitPerMedicine,
    getTodaySales,
    getAllSales,
} from '../database/queries';
import Footer from '../components/Footer';

const StatCard = ({ label, value, sub, valueColor, icon, delay }) => {
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
            Animated.timing(slide, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.statCard, { opacity: fade, transform: [{ translateY: slide }] }]}>
            <View style={[styles.statIconWrap, { backgroundColor: valueColor + '20' }]}>
                <Ionicons name={icon} size={18} color={valueColor} />
            </View>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
            {sub && <Text style={styles.statSub}>{sub}</Text>}
        </Animated.View>
    );
};

const ProfitRow = ({ name, total_sold, profit, delay }) => {
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(12)).current;
    const barAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, { toValue: 1, duration: 350, delay, useNativeDriver: true }),
            Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
            Animated.timing(barAnim, { toValue: 1, duration: 600, delay: delay + 100, useNativeDriver: false }),
        ]).start();
    }, []);

    const isLoss = profit < 0;
    const barColor = isLoss ? Colors.dangerRed : Colors.successGreen;
    const barWidth = barAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', `${Math.min(Math.abs(profit) / 10, 100)}%`],
    });

    return (
        <Animated.View style={[styles.profitRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
            <View style={styles.profitTop}>
                <Text style={styles.profitName} numberOfLines={1}>{name}</Text>
                <Text style={[styles.profitVal, { color: barColor }]}>
                    {isLoss ? '-' : '+'} Rs {Math.abs(profit).toFixed(0)}
                </Text>
            </View>
            <View style={styles.profitBarBg}>
                <Animated.View style={[styles.profitBarFill, { width: barWidth, backgroundColor: barColor }]} />
            </View>
            <Text style={styles.profitSold}>{total_sold} tablets sold</Text>
        </Animated.View>
    );
};

export default function ReportsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('today');
    const [loading, setLoading] = useState(true);
    const [todayData, setTodayData] = useState({ sales: 0, profit: 0, bills: 0 });
    const [monthData, setMonthData] = useState({ sales: 0, profit: 0, bills: 0 });
    const [profitData, setProfitData] = useState([]);

    const headerFade = useRef(new Animated.Value(0)).current;
    const headerSlide = useRef(new Animated.Value(-40)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerFade, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]).start();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            setLoading(true);
            const [tTotal, tProfit, mTotal, mProfit, profitPerMed] = await Promise.all([
                getTodayTotal(),
                getTodayProfit(),
                getMonthTotal(),
                getMonthProfit(),
                getProfitPerMedicine(),
            ]);
            setTodayData({
                sales: tTotal?.total_sales || 0,
                profit: tProfit || 0,
                bills: tTotal?.bill_count || 0,
            });
            setMonthData({
                sales: mTotal?.total_sales || 0,
                profit: mProfit || 0,
                bills: mTotal?.bill_count || 0,
            });
            setProfitData(profitPerMed || []);
        } catch (err) {
            console.error('Load reports error:', err);
        } finally {
            setLoading(false);
        }
    };

    const buildHTML = (title, data, sales) => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8"/>
            <style>
                body { font-family: Arial; padding: 30px; color: #222; }
                h2 { color: #0C2D57; margin-bottom: 4px; }
                h3 { color: #444; margin-top: 4px; }
                hr { border: none; border-top: 1px solid #ddd; margin: 16px 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th { background: #0C2D57; color: white; padding: 8px; text-align: left; font-size: 13px; }
                td { padding: 8px; border-bottom: 1px solid #eee; font-size: 13px; }
                tr:nth-child(even) { background: #f9f9f9; }
                .summary p { margin: 6px 0; font-size: 15px; }
                .footer { color: gray; font-size: 12px; margin-top: 24px; }
            </style>
        </head>
        <body>
            <h2>Al-Shifa Pharmacy</h2>
            <h3>${title}</h3>
            <hr/>
            <div class="summary">
                <p><b>Total Sales:</b> Rs ${data.sales.toLocaleString()}</p>
                <p><b>Total Profit:</b> Rs ${data.profit.toLocaleString()}</p>
                <p><b>Total Bills:</b> ${data.bills}</p>
            </div>
            <hr/>
            <h4>Bills Detail</h4>
            <table>
                <tr>
                    <th>Bill No</th><th>Total</th><th>Discount</th><th>Date</th>
                </tr>
                ${sales.map(s => `
                    <tr>
                        <td>${s.bill_no}</td>
                        <td>Rs ${s.total}</td>
                        <td>${s.discount_pct}%</td>
                        <td>${new Date(s.created_at).toLocaleDateString('en-PK')}</td>
                    </tr>
                `).join('')}
            </table>
            <p class="footer">Generated on ${new Date().toLocaleString('en-PK')}</p>
        </body>
        </html>
    `;

 


// generatePDF mein moveAsync ki jagah yeh karo:
const generatePDF = async (type) => {
  try {
    const sales = type === 'today' ? await getTodaySales() : await getAllSales();
    const data  = type === 'today' ? todayData : monthData;
    const title = type === 'today'
      ? `Today's Report — ${new Date().toLocaleDateString('en-PK')}`
      : `Monthly Report — ${new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}`;

    const html = buildHTML(title, data, sales);

    if (Platform.OS === 'web') {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => printWindow.close();
      };
      return;
    }

    // ✅ Mobile — moveAsync nahi, seedha share karo
    const { uri } = await Print.printToFileAsync({ html, base64: false });
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      UTI: 'com.adobe.pdf',
      dialogTitle: 'PDF Download karo',
    });

  } catch (err) {
    console.error('PDF error:', err);
    Alert.alert('Error', 'PDF generate karne mein masla hua');
  }
};

    const today = new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' });
    const month = new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });

    const active = activeTab === 'today' ? todayData : monthData;

    const stats = [
        { label: 'Sales',  value: `Rs ${active.sales.toLocaleString()}`,              sub: `${active.bills} bills`, valueColor: Colors.skyBlueDark,  icon: 'cash-outline',          delay: 100 },
        { label: 'Profit', value: `Rs ${active.profit.toLocaleString()}`,             sub: 'net profit',            valueColor: Colors.successGreen, icon: 'trending-up-outline',   delay: 180 },
        { label: 'Bills',  value: `${active.bills}`,                                  sub: 'transactions',          valueColor: Colors.darkBlue,     icon: 'receipt-outline',       delay: 260 },
        { label: 'Loss',   value: `Rs ${Math.max(0, -active.profit).toLocaleString()}`, sub: 'net loss',            valueColor: Colors.dangerRed,    icon: 'trending-down-outline', delay: 340 },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
                <View>
                    <Text style={styles.headerTitle}>Reports</Text>
                    <Text style={styles.headerSub}>{activeTab === 'today' ? today : month}</Text>
                </View>
            </Animated.View>

            <View style={styles.tabRow}>
                {['today', 'month'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab === 'today' ? 'Today' : 'This month'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.statsGrid}>
                    {stats.map((s, i) => <StatCard key={i} {...s} />)}
                </View>

                <Text style={styles.sectionTitle}>Download report</Text>
                <View style={styles.reportBtns}>
                    <TouchableOpacity style={styles.reportBtn} onPress={() => generatePDF('today')} activeOpacity={0.75}>
                        <View style={styles.reportBtnLeft}>
                            <View style={styles.reportIconWrap}>
                                <Ionicons name="today-outline" size={18} color={Colors.skyBlueDark} />
                            </View>
                            <View>
                                <Text style={styles.reportBtnTitle}>Today's report</Text>
                                <Text style={styles.reportBtnSub}>{today}</Text>
                            </View>
                        </View>
                        <View style={styles.pdfBadge}>
                            <Ionicons name="download-outline" size={13} color={Colors.skyBlueDark} />
                            <Text style={styles.pdfBadgeText}>PDF</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reportBtn} onPress={() => generatePDF('month')} activeOpacity={0.75}>
                        <View style={styles.reportBtnLeft}>
                            <View style={styles.reportIconWrap}>
                                <Ionicons name="calendar-outline" size={18} color={Colors.skyBlueDark} />
                            </View>
                            <View>
                                <Text style={styles.reportBtnTitle}>Monthly report</Text>
                                <Text style={styles.reportBtnSub}>{month}</Text>
                            </View>
                        </View>
                        <View style={styles.pdfBadge}>
                            <Ionicons name="download-outline" size={13} color={Colors.skyBlueDark} />
                            <Text style={styles.pdfBadgeText}>PDF</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {profitData.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Profit / loss per medicine</Text>
                        <View style={styles.profitCard}>
                            {profitData.map((p, i) => (
                                <ProfitRow key={i} {...p} delay={500 + i * 70} />
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>

            <Footer activeScreen="Reports" navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:      { flex: 1, backgroundColor: Colors.gray50 },
    header:         { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    headerTitle:    { color: Colors.white, fontSize: 17, fontWeight: '600' },
    headerSub:      { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
    tabRow:         { flexDirection: 'row', backgroundColor: Colors.white, borderBottomWidth: 0.5, borderBottomColor: Colors.gray200, paddingHorizontal: 16, gap: 4 },
    tab:            { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 2, borderBottomColor: 'transparent' },
    tabActive:      { borderBottomColor: Colors.skyBlueDark },
    tabText:        { fontSize: 13, color: Colors.gray500, fontWeight: '500' },
    tabTextActive:  { color: Colors.skyBlueDark, fontWeight: '700' },
    scroll:         { flex: 1 },
    scrollContent:  { padding: 14, gap: 12, paddingBottom: 20 },
    statsGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    statCard:       { width: '47.5%', backgroundColor: Colors.white, borderRadius: 12, padding: 13, borderWidth: 0.5, borderColor: Colors.gray200, gap: 6 },
    statIconWrap:   { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    statLabel:      { fontSize: 11, color: Colors.gray500 },
    statValue:      { fontSize: 20, fontWeight: '700' },
    statSub:        { fontSize: 10, color: Colors.gray500 },
    sectionTitle:   { fontSize: 11, fontWeight: '600', color: Colors.gray500, letterSpacing: 0.5, textTransform: 'uppercase' },
    reportBtns:     { gap: 8 },
    reportBtn:      { backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    reportBtnLeft:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
    reportIconWrap: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.skyBlueLight, alignItems: 'center', justifyContent: 'center' },
    reportBtnTitle: { fontSize: 13, fontWeight: '600', color: Colors.black },
    reportBtnSub:   { fontSize: 11, color: Colors.gray500, marginTop: 2 },
    pdfBadge:       { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.skyBlueLight, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
    pdfBadgeText:   { fontSize: 11, fontWeight: '600', color: Colors.skyBlueDark },
    profitCard:     { backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, gap: 14 },
    profitRow:      { gap: 5 },
    profitTop:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    profitName:     { fontSize: 13, fontWeight: '500', color: Colors.black, flex: 1 },
    profitVal:      { fontSize: 13, fontWeight: '700' },
    profitBarBg:    { height: 5, backgroundColor: Colors.gray100, borderRadius: 4, overflow: 'hidden' },
    profitBarFill:  { height: 5, borderRadius: 4 },
    profitSold:     { fontSize: 10, color: Colors.gray500 },
});