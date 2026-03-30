// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Animated,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Colors from '../theme/colors';

// // ── Bill row ──────────────────────────────────
// const BillRow = ({ name, qty, sellPrice, delay }) => {
//   const fade  = useRef(new Animated.Value(0)).current;
//   const slide = useRef(new Animated.Value(10)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fade,  { toValue: 1, duration: 300, delay, useNativeDriver: true }),
//       Animated.timing(slide, { toValue: 0, duration: 300, delay, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[styles.billRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
//       <View style={styles.billRowLeft}>
//         <Text style={styles.billMedName}>{name}</Text>
//         <Text style={styles.billMedQty}>{qty} tablet{qty > 1 ? 's' : ''} × Rs {sellPrice}</Text>
//       </View>
//       <Text style={styles.billMedTotal}>Rs {(qty * sellPrice).toFixed(0)}</Text>
//     </Animated.View>
//   );
// };

// // ── Bill screen ───────────────────────────────
// export default function BillScreen({ navigation, route }) {
//   const insets = useSafeAreaInsets();

//   // get data from CartScreen
//   const {
//     cart        = [
//       { id: 1, name: 'Panadol 500mg',   qty: 2, sellPrice: 15  },
//       { id: 2, name: 'Augmentin 625mg', qty: 1, sellPrice: 210 },
//       { id: 3, name: 'Brufen 400mg',    qty: 3, sellPrice: 35  },
//     ],
//     subtotal    = 345,
//     discountPct = 5,
//     discountAmt = 17,
//     total       = 328,
//   } = route?.params || {};

//   const [confirmed, setConfirmed] = useState(false);

//   // bill number — random for now, will come from DB later
//   const billNo = `#${Math.floor(1000 + Math.random() * 9000)}`;
//   const today  = new Date().toLocaleDateString('en-PK', {
//     day: 'numeric', month: 'long', year: 'numeric',
//   });
//   const time = new Date().toLocaleTimeString('en-PK', {
//     hour: '2-digit', minute: '2-digit',
//   });

//   // animations
//   const headerFade   = useRef(new Animated.Value(0)).current;
//   const headerSlide  = useRef(new Animated.Value(-40)).current;
//   const cardFade     = useRef(new Animated.Value(0)).current;
//   const cardScale    = useRef(new Animated.Value(0.96)).current;
//   const confirmScale = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
//       Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
//       Animated.timing(cardFade,    { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
//       Animated.spring(cardScale,   { toValue: 1, delay: 150, useNativeDriver: true, friction: 7 }),
//     ]).start();
//   }, []);

//   const handleConfirm = () => {
//     // button press animation
//     Animated.sequence([
//       Animated.spring(confirmScale, { toValue: 0.94, useNativeDriver: true, friction: 4 }),
//       Animated.spring(confirmScale, { toValue: 1,    useNativeDriver: true, friction: 4 }),
//     ]).start(() => {
//       setConfirmed(true);
//       // TODO: save sale to SQLite, update stock quantities
//       setTimeout(() => {
//         navigation.navigate('Dashboard');
//       }, 1800);
//     });
//   };

//   // confirmed success screen
//   if (confirmed) {
//     return (
//       <View style={[styles.container, styles.successScreen, { paddingTop: insets.top }]}>
//         <Animated.View style={styles.successWrap}>
//           <View style={styles.successIcon}>
//             <Ionicons name="checkmark" size={40} color={Colors.white} />
//           </View>
//           <Text style={styles.successTitle}>Sale confirmed!</Text>
//           <Text style={styles.successSub}>Rs {total.toFixed(0)} · Bill {billNo}</Text>
//           <Text style={styles.successHint}>Returning to dashboard...</Text>
//         </Animated.View>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>

//       {/* Header */}
//       <Animated.View style={[
//         styles.header,
//         { opacity: headerFade, transform: [{ translateY: headerSlide }] },
//       ]}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.8}
//         >
//           <Ionicons name="arrow-back" size={20} color={Colors.white} />
//         </TouchableOpacity>
//         <View style={{ flex: 1, marginLeft: 12 }}>
//           <Text style={styles.headerTitle}>Bill</Text>
//           <Text style={styles.headerSub}>Review before confirming</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.shareBtn}
//           activeOpacity={0.8}
//         >
//           <Ionicons name="share-outline" size={20} color={Colors.white} />
//         </TouchableOpacity>
//       </Animated.View>

//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >

//         {/* Bill card */}
//         <Animated.View style={[
//           styles.billCard,
//           { opacity: cardFade, transform: [{ scale: cardScale }] },
//         ]}>

//           {/* Shop header */}
//           <View style={styles.shopHeader}>
//             <View style={styles.shopLogo}>
//               <Ionicons name="medical" size={22} color={Colors.skyBlueDark} />
//             </View>
//             <Text style={styles.shopName}>Al-Shifa Pharmacy</Text>
//             <Text style={styles.shopSub}>Medical Store</Text>
//           </View>

//           {/* Bill meta */}
//           <View style={styles.metaRow}>
//             <View style={styles.metaItem}>
//               <Text style={styles.metaLabel}>Bill no</Text>
//               <Text style={styles.metaValue}>{billNo}</Text>
//             </View>
//             <View style={styles.metaItem}>
//               <Text style={styles.metaLabel}>Date</Text>
//               <Text style={styles.metaValue}>{today}</Text>
//             </View>
//             <View style={styles.metaItem}>
//               <Text style={styles.metaLabel}>Time</Text>
//               <Text style={styles.metaValue}>{time}</Text>
//             </View>
//           </View>

//           {/* Dashed divider */}
//           <View style={styles.dashedLine} />

//           {/* Column headers */}
//           <View style={styles.colHeader}>
//             <Text style={[styles.colLabel, { flex: 1 }]}>Medicine</Text>
//             <Text style={styles.colLabel}>Amount</Text>
//           </View>

//           {/* Items */}
//           <View style={styles.itemsList}>
//             {cart.map((item, i) => (
//               <BillRow
//                 key={item.id}
//                 {...item}
//                 delay={i * 80}
//               />
//             ))}
//           </View>

//           {/* Dashed divider */}
//           <View style={styles.dashedLine} />

//           {/* Totals */}
//           <View style={styles.totalsSection}>
//             <View style={styles.totalRow}>
//               <Text style={styles.totalRowLabel}>Subtotal</Text>
//               <Text style={styles.totalRowValue}>Rs {subtotal.toFixed(0)}</Text>
//             </View>

//             {discountPct > 0 && (
//               <View style={styles.totalRow}>
//                 <Text style={styles.totalRowLabel}>Discount ({discountPct}%)</Text>
//                 <Text style={[styles.totalRowValue, { color: Colors.dangerRed }]}>
//                   - Rs {discountAmt.toFixed(0)}
//                 </Text>
//               </View>
//             )}

//             <View style={styles.grandTotalRow}>
//               <Text style={styles.grandTotalLabel}>Grand total</Text>
//               <Text style={styles.grandTotalValue}>Rs {total.toFixed(0)}</Text>
//             </View>
//           </View>

//           {/* Dashed divider */}
//           <View style={styles.dashedLine} />

//           {/* Footer */}
//           <Text style={styles.billFooter}>Thank you for your purchase</Text>
//           <Text style={styles.billFooterSub}>
//             {cart.reduce((s, i) => s + i.qty, 0)} tablets · {cart.length} medicines
//           </Text>

//         </Animated.View>

//       </ScrollView>

//       {/* Action buttons */}
//       <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
//         <TouchableOpacity
//           style={styles.backToCartBtn}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.8}
//         >
//           <Ionicons name="arrow-back" size={16} color={Colors.darkBlue} />
//           <Text style={styles.backToCartText}>Back to cart</Text>
//         </TouchableOpacity>

//         <Animated.View style={[{ flex: 2 }, { transform: [{ scale: confirmScale }] }]}>
//           <TouchableOpacity
//             style={styles.confirmBtn}
//             onPress={handleConfirm}
//             activeOpacity={0.85}
//           >
//             <Ionicons name="checkmark-circle" size={18} color={Colors.white} />
//             <Text style={styles.confirmBtnText}>Confirm sale</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>

//     </View>
//   );
// }

// // ── Styles ────────────────────────────────────
// const styles = StyleSheet.create({
//   container:        { flex: 1, backgroundColor: Colors.gray50 },

//   header:           {
//     backgroundColor: Colors.darkBlue,
//     paddingHorizontal: 16,
//     paddingTop: 12, paddingBottom: 14,
//     flexDirection: 'row', alignItems: 'center',
//   },
//   backBtn:          {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.12)',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   headerTitle:      { color: Colors.white, fontSize: 17, fontWeight: '600' },
//   headerSub:        { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
//   shareBtn:         {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.12)',
//     alignItems: 'center', justifyContent: 'center',
//   },

//   scroll:           { flex: 1 },
//   scrollContent:    { padding: 16, paddingBottom: 30 },

//   billCard:         {
//     backgroundColor: Colors.white,
//     borderRadius: 16,
//     borderWidth: 0.5,
//     borderColor: Colors.gray200,
//     overflow: 'hidden',
//   },

//   shopHeader:       {
//     alignItems: 'center',
//     paddingVertical: 20,
//     backgroundColor: Colors.darkBlueLight,
//   },
//   shopLogo:         {
//     width: 48, height: 48, borderRadius: 24,
//     backgroundColor: Colors.white,
//     alignItems: 'center', justifyContent: 'center',
//     marginBottom: 8,
//   },
//   shopName:         { fontSize: 16, fontWeight: '700', color: Colors.darkBlue },
//   shopSub:          { fontSize: 11, color: Colors.gray700, marginTop: 2 },

//   metaRow:          {
//     flexDirection: 'row',
//     paddingHorizontal: 16, paddingVertical: 12,
//     gap: 8,
//   },
//   metaItem:         { flex: 1, alignItems: 'center' },
//   metaLabel:        { fontSize: 10, color: Colors.gray500, marginBottom: 3 },
//   metaValue:        { fontSize: 11, fontWeight: '600', color: Colors.black, textAlign: 'center' },

//   dashedLine:       {
//     marginHorizontal: 16,
//     borderStyle: 'dashed',
//     borderWidth: 1,
//     borderColor: Colors.gray200,
//     borderRadius: 1,
//   },

//   colHeader:        {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: Colors.gray50,
//   },
//   colLabel:         { fontSize: 10, fontWeight: '600', color: Colors.gray500, textTransform: 'uppercase', letterSpacing: 0.4 },

//   itemsList:        { paddingHorizontal: 16, paddingVertical: 4 },
//   billRow:          {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 0.5,
//     borderBottomColor: Colors.gray100,
//   },
//   billRowLeft:      { flex: 1 },
//   billMedName:      { fontSize: 13, fontWeight: '500', color: Colors.black },
//   billMedQty:       { fontSize: 11, color: Colors.gray500, marginTop: 2 },
//   billMedTotal:     { fontSize: 13, fontWeight: '600', color: Colors.darkBlue },

//   totalsSection:    { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
//   totalRow:         { flexDirection: 'row', justifyContent: 'space-between' },
//   totalRowLabel:    { fontSize: 13, color: Colors.gray700 },
//   totalRowValue:    { fontSize: 13, fontWeight: '600', color: Colors.black },
//   grandTotalRow:    {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 4,
//     paddingTop: 10,
//     borderTopWidth: 0.5, borderTopColor: Colors.gray200,
//   },
//   grandTotalLabel:  { fontSize: 15, fontWeight: '700', color: Colors.black },
//   grandTotalValue:  { fontSize: 22, fontWeight: '700', color: Colors.darkBlue },

//   billFooter:       { textAlign: 'center', fontSize: 12, color: Colors.gray500, paddingTop: 12 },
//   billFooterSub:    { textAlign: 'center', fontSize: 10, color: Colors.gray300, paddingBottom: 16, marginTop: 2 },

//   bottomBar:        {
//     backgroundColor: Colors.white,
//     borderTopWidth: 0.5, borderTopColor: Colors.gray200,
//     paddingHorizontal: 16, paddingTop: 12,
//     flexDirection: 'row', gap: 10,
//   },
//   backToCartBtn:    {
//     flex: 1, flexDirection: 'row',
//     alignItems: 'center', justifyContent: 'center',
//     gap: 6,
//     borderWidth: 0.5, borderColor: Colors.gray300,
//     borderRadius: 12, paddingVertical: 14,
//     backgroundColor: Colors.white,
//   },
//   backToCartText:   { fontSize: 13, color: Colors.darkBlue, fontWeight: '500' },
//   confirmBtn:       {
//     flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'center', gap: 8,
//     backgroundColor: Colors.darkBlue,
//     borderRadius: 12, paddingVertical: 14,
//   },
//   confirmBtnText:   { color: Colors.white, fontSize: 14, fontWeight: '600' },

//   // success screen
//   successScreen:    { alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white },
//   successWrap:      { alignItems: 'center', gap: 12 },
//   successIcon:      {
//     width: 80, height: 80, borderRadius: 40,
//     backgroundColor: Colors.successGreen,
//     alignItems: 'center', justifyContent: 'center',
//     marginBottom: 8,
//   },
//   successTitle:     { fontSize: 24, fontWeight: '700', color: Colors.black },
//   successSub:       { fontSize: 15, color: Colors.gray700, fontWeight: '500' },
//   successHint:      { fontSize: 12, color: Colors.gray500, marginTop: 4 },
// });
























import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Animated, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../theme/colors';
import { confirmSale } from '../database/queries';
import useStore from '../store/useStore';

const BillRow = ({ item, delay }) => {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 300, delay, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 300, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.billRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
      <View style={styles.billRowLeft}>
        <Text style={styles.billMedName}>{item.name}</Text>
        <Text style={styles.billMedQty}>{item.qty} tablet{item.qty > 1 ? 's' : ''} × Rs {item.sell_price}</Text>
      </View>
      <Text style={styles.billMedTotal}>Rs {(item.qty * item.sell_price).toFixed(0)}</Text>
    </Animated.View>
  );
};

export default function BillScreen({ navigation, route }) {
  const insets    = useSafeAreaInsets();
  const clearCart = useStore(s => s.clearCart);

  const {
    cart        = [],
    subtotal    = 0,
    discountPct = 0,
    discountAmt = 0,
    total       = 0,
  } = route?.params || {};

  const [confirmed, setConfirmed] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [billNo,    setBillNo]    = useState('');

  const today = new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' });
  const time  = new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });

  const headerFade   = useRef(new Animated.Value(0)).current;
  const headerSlide  = useRef(new Animated.Value(-40)).current;
  const cardFade     = useRef(new Animated.Value(0)).current;
  const cardScale    = useRef(new Animated.Value(0.96)).current;
  const confirmScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(cardFade,    { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
      Animated.spring(cardScale,   { toValue: 1, delay: 150, useNativeDriver: true, friction: 7 }),
    ]).start();
  }, []);

  const handleConfirm = async () => {
    try {
      setSaving(true);
      Animated.sequence([
        Animated.spring(confirmScale, { toValue: 0.94, useNativeDriver: true, friction: 4 }),
        Animated.spring(confirmScale, { toValue: 1,    useNativeDriver: true, friction: 4 }),
      ]).start();

      const generatedBillNo = await confirmSale({
        cart,
        subtotal,
        discountPct,
        discountAmt,
        total,
      });

      setBillNo(generatedBillNo);
      clearCart();
      setConfirmed(true);

      setTimeout(() => navigation.navigate('Dashboard'), 2000);

    } catch (err) {
      console.error('Confirm sale error:', err);
      Alert.alert('Error', 'Failed to confirm sale. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (confirmed) {
    return (
      <View style={[styles.container, styles.successScreen, { paddingTop: insets.top }]}>
        <View style={styles.successWrap}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={40} color={Colors.white} />
          </View>
          <Text style={styles.successTitle}>Sale confirmed!</Text>
          <Text style={styles.successSub}>Rs {total.toFixed(0)} · {billNo}</Text>
          <Text style={styles.successHint}>Returning to dashboard...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Bill</Text>
          <Text style={styles.headerSub}>Review before confirming</Text>
        </View>
      </Animated.View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.billCard, { opacity: cardFade, transform: [{ scale: cardScale }] }]}>

          <View style={styles.shopHeader}>
            <View style={styles.shopLogo}>
              <Ionicons name="medical" size={22} color={Colors.skyBlueDark} />
            </View>
            <Text style={styles.shopName}>Al-Shifa Pharmacy</Text>
            <Text style={styles.shopSub}>Medical Store</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{today}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Time</Text>
              <Text style={styles.metaValue}>{time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Items</Text>
              <Text style={styles.metaValue}>{cart.length}</Text>
            </View>
          </View>

          <View style={styles.dashedLine} />

          <View style={styles.colHeader}>
            <Text style={[styles.colLabel, { flex: 1 }]}>Medicine</Text>
            <Text style={styles.colLabel}>Amount</Text>
          </View>

          <View style={styles.itemsList}>
            {cart.map((item, i) => (
              <BillRow key={item.id} item={item} delay={i * 80} />
            ))}
          </View>

          <View style={styles.dashedLine} />

          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalRowLabel}>Subtotal</Text>
              <Text style={styles.totalRowValue}>Rs {subtotal.toFixed(0)}</Text>
            </View>
            {discountPct > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalRowLabel}>Discount ({discountPct}%)</Text>
                <Text style={[styles.totalRowValue, { color: Colors.dangerRed }]}>- Rs {discountAmt.toFixed(0)}</Text>
              </View>
            )}
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Grand total</Text>
              <Text style={styles.grandTotalValue}>Rs {total.toFixed(0)}</Text>
            </View>
          </View>

          <View style={styles.dashedLine} />
          <Text style={styles.billFooter}>Thank you for your purchase</Text>
          <Text style={styles.billFooterSub}>{cart.reduce((s, i) => s + i.qty, 0)} tablets · {cart.length} medicines</Text>

        </Animated.View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.backToCartBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={16} color={Colors.darkBlue} />
          <Text style={styles.backToCartText}>Back</Text>
        </TouchableOpacity>
        <Animated.View style={[{ flex: 2 }, { transform: [{ scale: confirmScale }] }]}>
          <TouchableOpacity
            style={[styles.confirmBtn, saving && { opacity: 0.7 }]}
            onPress={handleConfirm}
            disabled={saving}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle" size={18} color={Colors.white} />
            <Text style={styles.confirmBtnText}>{saving ? 'Saving...' : 'Confirm sale'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: Colors.gray50 },
  header:          { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center' },
  backBtn:         { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  headerTitle:     { color: Colors.white, fontSize: 17, fontWeight: '600' },
  headerSub:       { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
  scroll:          { flex: 1 },
  scrollContent:   { padding: 16, paddingBottom: 30 },
  billCard:        { backgroundColor: Colors.white, borderRadius: 16, borderWidth: 0.5, borderColor: Colors.gray200, overflow: 'hidden' },
  shopHeader:      { alignItems: 'center', paddingVertical: 20, backgroundColor: Colors.darkBlueLight },
  shopLogo:        { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  shopName:        { fontSize: 16, fontWeight: '700', color: Colors.darkBlue },
  shopSub:         { fontSize: 11, color: Colors.gray700, marginTop: 2 },
  metaRow:         { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  metaItem:        { flex: 1, alignItems: 'center' },
  metaLabel:       { fontSize: 10, color: Colors.gray500, marginBottom: 3 },
  metaValue:       { fontSize: 11, fontWeight: '600', color: Colors.black, textAlign: 'center' },
  dashedLine:      { marginHorizontal: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: Colors.gray200, borderRadius: 1 },
  colHeader:       { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: Colors.gray50 },
  colLabel:        { fontSize: 10, fontWeight: '600', color: Colors.gray500, textTransform: 'uppercase', letterSpacing: 0.4 },
  itemsList:       { paddingHorizontal: 16, paddingVertical: 4 },
  billRow:         { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: Colors.gray100 },
  billRowLeft:     { flex: 1 },
  billMedName:     { fontSize: 13, fontWeight: '500', color: Colors.black },
  billMedQty:      { fontSize: 11, color: Colors.gray500, marginTop: 2 },
  billMedTotal:    { fontSize: 13, fontWeight: '600', color: Colors.darkBlue },
  totalsSection:   { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  totalRow:        { flexDirection: 'row', justifyContent: 'space-between' },
  totalRowLabel:   { fontSize: 13, color: Colors.gray700 },
  totalRowValue:   { fontSize: 13, fontWeight: '600', color: Colors.black },
  grandTotalRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: Colors.gray200 },
  grandTotalLabel: { fontSize: 15, fontWeight: '700', color: Colors.black },
  grandTotalValue: { fontSize: 22, fontWeight: '700', color: Colors.darkBlue },
  billFooter:      { textAlign: 'center', fontSize: 12, color: Colors.gray500, paddingTop: 12 },
  billFooterSub:   { textAlign: 'center', fontSize: 10, color: Colors.gray300, paddingBottom: 16, marginTop: 2 },
  bottomBar:       { backgroundColor: Colors.white, borderTopWidth: 0.5, borderTopColor: Colors.gray200, paddingHorizontal: 16, paddingTop: 12, flexDirection: 'row', gap: 10 },
  backToCartBtn:   { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 0.5, borderColor: Colors.gray300, borderRadius: 12, paddingVertical: 14, backgroundColor: Colors.white },
  backToCartText:  { fontSize: 13, color: Colors.darkBlue, fontWeight: '500' },
  confirmBtn:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.darkBlue, borderRadius: 12, paddingVertical: 14 },
  confirmBtnText:  { color: Colors.white, fontSize: 14, fontWeight: '600' },
  successScreen:   { alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white },
  successWrap:     { alignItems: 'center', gap: 12 },
  successIcon:     { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.successGreen, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  successTitle:    { fontSize: 24, fontWeight: '700', color: Colors.black },
  successSub:      { fontSize: 15, color: Colors.gray700, fontWeight: '500' },
  successHint:     { fontSize: 12, color: Colors.gray500, marginTop: 4 },
});