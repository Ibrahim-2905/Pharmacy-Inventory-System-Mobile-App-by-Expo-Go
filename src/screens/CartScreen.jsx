// // import React, { useEffect, useRef, useState } from 'react';
// // import {
// //   View, Text, ScrollView, StyleSheet,
// //   TouchableOpacity, Animated, TextInput,
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import Colors from '../theme/colors';

// // // ── Cart item ─────────────────────────────────
// // const CartRow = ({ name, qty, sellPrice, onIncrease, onDecrease, onRemove, delay }) => {
// //   const fade  = useRef(new Animated.Value(0)).current;
// //   const slide = useRef(new Animated.Value(20)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
// //       Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
// //     ]).start();
// //   }, []);

// //   return (
// //     <Animated.View style={[styles.cartRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
// //       <View style={styles.cartRowLeft}>
// //         <Text style={styles.cartName}>{name}</Text>
// //         <Text style={styles.cartPrice}>Rs {sellPrice} / tablet</Text>
// //       </View>

// //       <View style={styles.cartRowRight}>
// //         <View style={styles.qtyControl}>
// //           <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease} activeOpacity={0.7}>
// //             <Ionicons name="remove" size={14} color={Colors.darkBlue} />
// //           </TouchableOpacity>
// //           <Text style={styles.qtyVal}>{qty}</Text>
// //           <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease} activeOpacity={0.7}>
// //             <Ionicons name="add" size={14} color={Colors.darkBlue} />
// //           </TouchableOpacity>
// //         </View>
// //         <Text style={styles.cartSubtotal}>Rs {(sellPrice * qty).toFixed(0)}</Text>
// //         <TouchableOpacity style={styles.removeBtn} onPress={onRemove} activeOpacity={0.7}>
// //           <Ionicons name="trash-outline" size={14} color={Colors.dangerRed} />
// //         </TouchableOpacity>
// //       </View>
// //     </Animated.View>
// //   );
// // };

// // // ── Cart screen ───────────────────────────────
// // export default function CartScreen({ navigation, route }) {
// //   const insets = useSafeAreaInsets();

// //   // get cart from SearchScreen or use dummy data
// //   const initialCart = route?.params?.cart || [
// //     { id: 1, name: 'Panadol 500mg',   qty: 2, sellPrice: 15  },
// //     { id: 2, name: 'Augmentin 625mg', qty: 1, sellPrice: 210 },
// //     { id: 3, name: 'Brufen 400mg',    qty: 3, sellPrice: 35  },
// //   ];

// //   const [cart,     setCart]     = useState(initialCart);
// //   const [discount, setDiscount] = useState('');

// //   const headerFade  = useRef(new Animated.Value(0)).current;
// //   const headerSlide = useRef(new Animated.Value(-40)).current;
// //   const summaryFade = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
// //       Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
// //       Animated.timing(summaryFade, { toValue: 1, duration: 500, delay: 300, useNativeDriver: true }),
// //     ]).start();
// //   }, []);

// //   // calculations
// //   const subtotal     = cart.reduce((sum, i) => sum + i.sellPrice * i.qty, 0);
// //   const discountPct  = parseFloat(discount) || 0;
// //   const discountAmt  = (subtotal * discountPct) / 100;
// //   const total        = subtotal - discountAmt;
// //   const totalTablets = cart.reduce((sum, i) => sum + i.qty, 0);

// //   const increase = (id) =>
// //     setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));

// //   const decrease = (id) =>
// //     setCart(prev => {
// //       const item = prev.find(i => i.id === id);
// //       if (item.qty === 1) return prev.filter(i => i.id !== id);
// //       return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
// //     });

// //   const remove = (id) =>
// //     setCart(prev => prev.filter(i => i.id !== id));

// //   const handleBill = () => {
// //     navigation.navigate('Bill', {
// //       cart,
// //       subtotal,
// //       discountPct,
// //       discountAmt,
// //       total,
// //     });
// //   };

// //   return (
// //     <View style={[styles.container, { paddingTop: insets.top }]}>

// //       {/* Header */}
// //       <Animated.View style={[
// //         styles.header,
// //         { opacity: headerFade, transform: [{ translateY: headerSlide }] },
// //       ]}>
// //         <TouchableOpacity
// //           style={styles.backBtn}
// //           onPress={() => navigation.goBack()}
// //           activeOpacity={0.8}
// //         >
// //           <Ionicons name="arrow-back" size={20} color={Colors.white} />
// //         </TouchableOpacity>
// //         <View style={{ flex: 1, marginLeft: 12 }}>
// //           <Text style={styles.headerTitle}>Cart</Text>
// //           <Text style={styles.headerSub}>{totalTablets} tablets · {cart.length} medicines</Text>
// //         </View>
// //         {cart.length > 0 && (
// //           <TouchableOpacity
// //             onPress={() => setCart([])}
// //             style={styles.clearBtn}
// //             activeOpacity={0.8}
// //           >
// //             <Text style={styles.clearBtnText}>Clear</Text>
// //           </TouchableOpacity>
// //         )}
// //       </Animated.View>

// //       {cart.length === 0 ? (
// //         // Empty cart
// //         <View style={styles.emptyWrap}>
// //           <Ionicons name="cart-outline" size={64} color={Colors.gray300} />
// //           <Text style={styles.emptyTitle}>Cart is empty</Text>
// //           <Text style={styles.emptySubtitle}>Go back and add medicines</Text>
// //           <TouchableOpacity
// //             style={styles.goBackBtn}
// //             onPress={() => navigation.goBack()}
// //             activeOpacity={0.8}
// //           >
// //             <Text style={styles.goBackBtnText}>Search medicines</Text>
// //           </TouchableOpacity>
// //         </View>
// //       ) : (
// //         <>
// //           <ScrollView
// //             style={styles.scroll}
// //             contentContainerStyle={styles.scrollContent}
// //             showsVerticalScrollIndicator={false}
// //           >

// //             {/* Cart items */}
// //             <Text style={styles.sectionLabel}>Items</Text>
// //             <View style={styles.cartList}>
// //               {cart.map((item, i) => (
// //                 <CartRow
// //                   key={item.id}
// //                   {...item}
// //                   delay={i * 60}
// //                   onIncrease={() => increase(item.id)}
// //                   onDecrease={() => decrease(item.id)}
// //                   onRemove={() => remove(item.id)}
// //                 />
// //               ))}
// //             </View>

// //             {/* Discount field */}
// //             <Text style={styles.sectionLabel}>Discount</Text>
// //             <Animated.View style={[styles.discountCard, { opacity: summaryFade }]}>
// //               <View style={styles.discountRow}>
// //                 <View style={styles.discountInputWrap}>
// //                   <Ionicons name="pricetag-outline" size={16} color={Colors.gray500} style={{ marginRight: 8 }} />
// //                   <TextInput
// //                     style={styles.discountInput}
// //                     placeholder="Enter discount %"
// //                     placeholderTextColor={Colors.gray500}
// //                     value={discount}
// //                     onChangeText={setDiscount}
// //                     keyboardType="numeric"
// //                     maxLength={2}
// //                   />
// //                   <Text style={styles.discountPctSign}>%</Text>
// //                 </View>
// //                 {discountPct > 0 && (
// //                   <View style={styles.discountBadge}>
// //                     <Text style={styles.discountBadgeText}>- Rs {discountAmt.toFixed(0)}</Text>
// //                   </View>
// //                 )}
// //               </View>
// //             </Animated.View>

// //             {/* Bill summary */}
// //             <Text style={styles.sectionLabel}>Summary</Text>
// //             <Animated.View style={[styles.summaryCard, { opacity: summaryFade }]}>
// //               <View style={styles.summaryRow}>
// //                 <Text style={styles.summaryLabel}>Subtotal</Text>
// //                 <Text style={styles.summaryValue}>Rs {subtotal.toFixed(0)}</Text>
// //               </View>
// //               {discountPct > 0 && (
// //                 <View style={styles.summaryRow}>
// //                   <Text style={styles.summaryLabel}>Discount ({discountPct}%)</Text>
// //                   <Text style={[styles.summaryValue, { color: Colors.dangerRed }]}>
// //                     - Rs {discountAmt.toFixed(0)}
// //                   </Text>
// //                 </View>
// //               )}
// //               <View style={styles.summaryDivider} />
// //               <View style={styles.summaryRow}>
// //                 <Text style={styles.totalLabel}>Total</Text>
// //                 <Text style={styles.totalValue}>Rs {total.toFixed(0)}</Text>
// //               </View>
// //             </Animated.View>

// //           </ScrollView>

// //           {/* Bottom action */}
// //           <Animated.View style={[styles.bottomBar, { opacity: summaryFade }]}>
// //             <View style={styles.bottomTotal}>
// //               <Text style={styles.bottomTotalLabel}>Total</Text>
// //               <Text style={styles.bottomTotalValue}>Rs {total.toFixed(0)}</Text>
// //             </View>
// //             <TouchableOpacity
// //               style={styles.billBtn}
// //               onPress={handleBill}
// //               activeOpacity={0.85}
// //             >
// //               <Ionicons name="receipt-outline" size={18} color={Colors.white} />
// //               <Text style={styles.billBtnText}>Generate bill</Text>
// //               <Ionicons name="arrow-forward" size={16} color={Colors.white} />
// //             </TouchableOpacity>
// //           </Animated.View>
// //         </>
// //       )}

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
// //   },
// //   backBtn:          {
// //     width: 36, height: 36, borderRadius: 18,
// //     backgroundColor: 'rgba(255,255,255,0.12)',
// //     alignItems: 'center', justifyContent: 'center',
// //   },
// //   headerTitle:      { color: Colors.white, fontSize: 17, fontWeight: '600' },
// //   headerSub:        { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
// //   clearBtn:         {
// //     paddingHorizontal: 12, paddingVertical: 6,
// //     backgroundColor: 'rgba(255,255,255,0.12)',
// //     borderRadius: 20,
// //   },
// //   clearBtnText:     { color: Colors.white, fontSize: 12, fontWeight: '500' },

// //   scroll:           { flex: 1 },
// //   scrollContent:    { padding: 14, gap: 10, paddingBottom: 120 },

// //   sectionLabel:     {
// //     fontSize: 11, fontWeight: '600',
// //     color: Colors.gray500,
// //     letterSpacing: 0.5,
// //     textTransform: 'uppercase',
// //     marginTop: 4,
// //   },

// //   cartList:         {
// //     backgroundColor: Colors.white,
// //     borderRadius: 12,
// //     borderWidth: 0.5,
// //     borderColor: Colors.gray200,
// //     overflow: 'hidden',
// //   },
// //   cartRow:          {
// //     flexDirection: 'row', alignItems: 'center',
// //     paddingHorizontal: 14, paddingVertical: 12,
// //     borderBottomWidth: 0.5, borderBottomColor: Colors.gray100,
// //     gap: 10,
// //   },
// //   cartRowLeft:      { flex: 1 },
// //   cartName:         { fontSize: 13, fontWeight: '600', color: Colors.black },
// //   cartPrice:        { fontSize: 11, color: Colors.gray500, marginTop: 2 },
// //   cartRowRight:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
// //   qtyControl:       { flexDirection: 'row', alignItems: 'center', gap: 8 },
// //   qtyBtn:           {
// //     width: 28, height: 28, borderRadius: 8,
// //     backgroundColor: Colors.gray100,
// //     alignItems: 'center', justifyContent: 'center',
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //   },
// //   qtyVal:           {
// //     fontSize: 14, fontWeight: '600',
// //     color: Colors.black,
// //     minWidth: 22, textAlign: 'center',
// //   },
// //   cartSubtotal:     { fontSize: 13, fontWeight: '700', color: Colors.darkBlue, minWidth: 55 },
// //   removeBtn:        {
// //     width: 28, height: 28, borderRadius: 8,
// //     backgroundColor: Colors.dangerBg,
// //     alignItems: 'center', justifyContent: 'center',
// //   },

// //   discountCard:     {
// //     backgroundColor: Colors.white,
// //     borderRadius: 12, padding: 14,
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //   },
// //   discountRow:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
// //   discountInputWrap:{
// //     flex: 1, flexDirection: 'row', alignItems: 'center',
// //     backgroundColor: Colors.gray50,
// //     borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10,
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //   },
// //   discountInput:    { flex: 1, fontSize: 15, color: Colors.black, padding: 0 },
// //   discountPctSign:  { fontSize: 15, color: Colors.gray500, fontWeight: '500' },
// //   discountBadge:    {
// //     backgroundColor: Colors.dangerBg,
// //     paddingHorizontal: 10, paddingVertical: 6,
// //     borderRadius: 8,
// //   },
// //   discountBadgeText:{ fontSize: 12, fontWeight: '700', color: Colors.dangerText },

// //   summaryCard:      {
// //     backgroundColor: Colors.white,
// //     borderRadius: 12, padding: 14,
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //     gap: 10,
// //   },
// //   summaryRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
// //   summaryLabel:     { fontSize: 13, color: Colors.gray700 },
// //   summaryValue:     { fontSize: 13, fontWeight: '600', color: Colors.black },
// //   summaryDivider:   { height: 0.5, backgroundColor: Colors.gray200 },
// //   totalLabel:       { fontSize: 15, fontWeight: '700', color: Colors.black },
// //   totalValue:       { fontSize: 18, fontWeight: '700', color: Colors.darkBlue },

// //   bottomBar:        {
// //     backgroundColor: Colors.white,
// //     borderTopWidth: 0.5, borderTopColor: Colors.gray200,
// //     paddingHorizontal: 16, paddingVertical: 12,
// //     paddingBottom: 20,
// //     flexDirection: 'row', alignItems: 'center', gap: 14,
// //   },
// //   bottomTotal:      { flex: 1 },
// //   bottomTotalLabel: { fontSize: 11, color: Colors.gray500 },
// //   bottomTotalValue: { fontSize: 20, fontWeight: '700', color: Colors.darkBlue },
// //   billBtn:          {
// //     flex: 2, flexDirection: 'row',
// //     alignItems: 'center', justifyContent: 'center',
// //     backgroundColor: Colors.darkBlue,
// //     paddingVertical: 14, borderRadius: 12, gap: 8,
// //   },
// //   billBtnText:      { color: Colors.white, fontSize: 14, fontWeight: '600' },

// //   emptyWrap:        { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
// //   emptyTitle:       { fontSize: 18, fontWeight: '600', color: Colors.black },
// //   emptySubtitle:    { fontSize: 13, color: Colors.gray500 },
// //   goBackBtn:        {
// //     marginTop: 8,
// //     backgroundColor: Colors.darkBlue,
// //     paddingHorizontal: 24, paddingVertical: 12,
// //     borderRadius: 12,
// //   },
// //   goBackBtnText:    { color: Colors.white, fontSize: 14, fontWeight: '600' },
// // });















// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Animated, TextInput,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Colors from '../theme/colors';
// import useStore from '../store/useStore';

// const CartRow = ({ item, onIncrease, onDecrease, onRemove, delay }) => {
//   const fade  = useRef(new Animated.Value(0)).current;
//   const slide = useRef(new Animated.Value(20)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
//       Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[styles.cartRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
//       <View style={styles.cartRowLeft}>
//         <Text style={styles.cartName}>{item.name}</Text>
//         <Text style={styles.cartPrice}>Rs {item.sell_price} / tablet</Text>
//       </View>
//       <View style={styles.cartRowRight}>
//         <View style={styles.qtyControl}>
//           <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease} activeOpacity={0.7}>
//             <Ionicons name="remove" size={14} color={Colors.darkBlue} />
//           </TouchableOpacity>
//           <Text style={styles.qtyVal}>{item.qty}</Text>
//           <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease} activeOpacity={0.7}>
//             <Ionicons name="add" size={14} color={Colors.darkBlue} />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.cartSubtotal}>Rs {(item.sell_price * item.qty).toFixed(0)}</Text>
//         <TouchableOpacity style={styles.removeBtn} onPress={onRemove} activeOpacity={0.7}>
//           <Ionicons name="trash-outline" size={14} color={Colors.dangerRed} />
//         </TouchableOpacity>
//       </View>
//     </Animated.View>
//   );
// };

// export default function CartScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   const cart           = useStore(s => s.cart);
//   const increaseQty    = useStore(s => s.increaseQty);
//   const decreaseQty    = useStore(s => s.decreaseQty);
//   const removeFromCart = useStore(s => s.removeFromCart);

//   const [discount, setDiscount] = useState('');

//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-40)).current;
//   const summaryFade = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
//       Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
//       Animated.timing(summaryFade, { toValue: 1, duration: 500, delay: 300, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const subtotal    = cart.reduce((s, i) => s + i.sell_price * i.qty, 0);
//   const discountPct = parseFloat(discount) || 0;
//   const discountAmt = (subtotal * discountPct) / 100;
//   const total       = subtotal - discountAmt;
//   const totalTablets= cart.reduce((s, i) => s + i.qty, 0);

//   const handleBill = () => {
//     navigation.navigate('Bill', { cart, subtotal, discountPct, discountAmt, total });
//   };

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>
//       <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
//           <Ionicons name="arrow-back" size={20} color={Colors.white} />
//         </TouchableOpacity>
//         <View style={{ flex: 1, marginLeft: 12 }}>
//           <Text style={styles.headerTitle}>Cart</Text>
//           <Text style={styles.headerSub}>{totalTablets} tablets · {cart.length} medicines</Text>
//         </View>
//         {cart.length > 0 && (
//           <TouchableOpacity style={styles.clearBtn} onPress={() => useStore.getState().clearCart()} activeOpacity={0.8}>
//             <Text style={styles.clearBtnText}>Clear</Text>
//           </TouchableOpacity>
//         )}
//       </Animated.View>

//       {cart.length === 0 ? (
//         <View style={styles.emptyWrap}>
//           <Ionicons name="cart-outline" size={64} color={Colors.gray300} />
//           <Text style={styles.emptyTitle}>Cart is empty</Text>
//           <Text style={styles.emptySubtitle}>Go back and add medicines</Text>
//           <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
//             <Text style={styles.goBackBtnText}>Search medicines</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <>
//           <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
//             <Text style={styles.sectionLabel}>Items</Text>
//             <View style={styles.cartList}>
//               {cart.map((item, i) => (
//                 <CartRow
//                   key={item.id}
//                   item={item}
//                   delay={i * 60}
//                   onIncrease={() => increaseQty(item.id)}
//                   onDecrease={() => decreaseQty(item.id)}
//                   onRemove={() => removeFromCart(item.id)}
//                 />
//               ))}
//             </View>

//             <Text style={styles.sectionLabel}>Discount</Text>
//             <Animated.View style={[styles.discountCard, { opacity: summaryFade }]}>
//               <View style={styles.discountRow}>
//                 <View style={styles.discountInputWrap}>
//                   <Ionicons name="pricetag-outline" size={16} color={Colors.gray500} style={{ marginRight: 8 }} />
//                   <TextInput
//                     style={styles.discountInput}
//                     placeholder="Enter discount %"
//                     placeholderTextColor={Colors.gray500}
//                     value={discount}
//                     onChangeText={setDiscount}
//                     keyboardType="numeric"
//                     maxLength={2}
//                   />
//                   <Text style={styles.discountPctSign}>%</Text>
//                 </View>
//                 {discountPct > 0 && (
//                   <View style={styles.discountBadge}>
//                     <Text style={styles.discountBadgeText}>- Rs {discountAmt.toFixed(0)}</Text>
//                   </View>
//                 )}
//               </View>
//             </Animated.View>

//             <Text style={styles.sectionLabel}>Summary</Text>
//             <Animated.View style={[styles.summaryCard, { opacity: summaryFade }]}>
//               <View style={styles.summaryRow}>
//                 <Text style={styles.summaryLabel}>Subtotal</Text>
//                 <Text style={styles.summaryValue}>Rs {subtotal.toFixed(0)}</Text>
//               </View>
//               {discountPct > 0 && (
//                 <View style={styles.summaryRow}>
//                   <Text style={styles.summaryLabel}>Discount ({discountPct}%)</Text>
//                   <Text style={[styles.summaryValue, { color: Colors.dangerRed }]}>- Rs {discountAmt.toFixed(0)}</Text>
//                 </View>
//               )}
//               <View style={styles.summaryDivider} />
//               <View style={styles.summaryRow}>
//                 <Text style={styles.totalLabel}>Total</Text>
//                 <Text style={styles.totalValue}>Rs {total.toFixed(0)}</Text>
//               </View>
//             </Animated.View>
//           </ScrollView>

//           <Animated.View style={[styles.bottomBar, { opacity: summaryFade }]}>
//             <View style={styles.bottomTotal}>
//               <Text style={styles.bottomTotalLabel}>Total</Text>
//               <Text style={styles.bottomTotalValue}>Rs {total.toFixed(0)}</Text>
//             </View>
//             <TouchableOpacity style={styles.billBtn} onPress={handleBill} activeOpacity={0.85}>
//               <Ionicons name="receipt-outline" size={18} color={Colors.white} />
//               <Text style={styles.billBtnText}>Generate bill</Text>
//               <Ionicons name="arrow-forward" size={16} color={Colors.white} />
//             </TouchableOpacity>
//           </Animated.View>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:         { flex: 1, backgroundColor: Colors.gray50 },
//   header:            { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center' },
//   backBtn:           { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
//   headerTitle:       { color: Colors.white, fontSize: 17, fontWeight: '600' },
//   headerSub:         { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
//   clearBtn:          { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 20 },
//   clearBtnText:      { color: Colors.white, fontSize: 12, fontWeight: '500' },
//   scroll:            { flex: 1 },
//   scrollContent:     { padding: 14, gap: 10, paddingBottom: 120 },
//   sectionLabel:      { fontSize: 11, fontWeight: '600', color: Colors.gray500, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4 },
//   cartList:          { backgroundColor: Colors.white, borderRadius: 12, borderWidth: 0.5, borderColor: Colors.gray200, overflow: 'hidden' },
//   cartRow:           { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: Colors.gray100, gap: 10 },
//   cartRowLeft:       { flex: 1 },
//   cartName:          { fontSize: 13, fontWeight: '600', color: Colors.black },
//   cartPrice:         { fontSize: 11, color: Colors.gray500, marginTop: 2 },
//   cartRowRight:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   qtyControl:        { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   qtyBtn:            { width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.gray100, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: Colors.gray200 },
//   qtyVal:            { fontSize: 14, fontWeight: '600', color: Colors.black, minWidth: 22, textAlign: 'center' },
//   cartSubtotal:      { fontSize: 13, fontWeight: '700', color: Colors.darkBlue, minWidth: 55 },
//   removeBtn:         { width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.dangerBg, alignItems: 'center', justifyContent: 'center' },
//   discountCard:      { backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200 },
//   discountRow:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   discountInputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray50, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 0.5, borderColor: Colors.gray200 },
//   discountInput:     { flex: 1, fontSize: 15, color: Colors.black, padding: 0 },
//   discountPctSign:   { fontSize: 15, color: Colors.gray500, fontWeight: '500' },
//   discountBadge:     { backgroundColor: Colors.dangerBg, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
//   discountBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.dangerText },
//   summaryCard:       { backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, gap: 10 },
//   summaryRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   summaryLabel:      { fontSize: 13, color: Colors.gray700 },
//   summaryValue:      { fontSize: 13, fontWeight: '600', color: Colors.black },
//   summaryDivider:    { height: 0.5, backgroundColor: Colors.gray200 },
//   totalLabel:        { fontSize: 15, fontWeight: '700', color: Colors.black },
//   totalValue:        { fontSize: 18, fontWeight: '700', color: Colors.darkBlue },
//   bottomBar:         { backgroundColor: Colors.white, borderTopWidth: 0.5, borderTopColor: Colors.gray200, paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 14 },
//   bottomTotal:       { flex: 1 },
//   bottomTotalLabel:  { fontSize: 11, color: Colors.gray500 },
//   bottomTotalValue:  { fontSize: 20, fontWeight: '700', color: Colors.darkBlue },
//   billBtn:           { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.darkBlue, paddingVertical: 14, borderRadius: 12, gap: 8 },
//   billBtnText:       { color: Colors.white, fontSize: 14, fontWeight: '600' },
//   emptyWrap:         { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
//   emptyTitle:        { fontSize: 18, fontWeight: '600', color: Colors.black },
//   emptySubtitle:     { fontSize: 13, color: Colors.gray500 },
//   goBackBtn:         { marginTop: 8, backgroundColor: Colors.darkBlue, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
//   goBackBtnText:     { color: Colors.white, fontSize: 14, fontWeight: '600' },
// });






















import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Animated, TextInput, Platform, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../theme/colors';
import useStore from '../store/useStore';

// ── Cart row ──────────────────────────────────
const CartRow = ({ item, onIncrease, onDecrease, onRemove, delay }) => {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  const atStockLimit = item.qty >= item.stock_qty;

  return (
    <Animated.View style={[styles.cartRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
      <View style={styles.cartRowLeft}>
        <Text style={styles.cartName}>{item.name}</Text>
        <Text style={styles.cartPrice}>Rs {item.sell_price} / tablet</Text>
        {/* show stock warning when at limit */}
        {atStockLimit && (
          <Text style={styles.stockWarning}>
            ⚠ Max {item.stock_qty} in stock
          </Text>
        )}
      </View>
      <View style={styles.cartRowRight}>
        <View style={styles.qtyControl}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease} activeOpacity={0.7}>
            <Ionicons name="remove" size={14} color={Colors.darkBlue} />
          </TouchableOpacity>
          <Text style={styles.qtyVal}>{item.qty}</Text>
          <TouchableOpacity
            style={[styles.qtyBtn, atStockLimit && styles.qtyBtnDisabled]}
            onPress={onIncrease}
            disabled={atStockLimit}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={14} color={atStockLimit ? Colors.gray400 : Colors.darkBlue} />
          </TouchableOpacity>
        </View>
        <Text style={styles.cartSubtotal}>Rs {(item.sell_price * item.qty).toFixed(0)}</Text>
        <TouchableOpacity style={styles.removeBtn} onPress={onRemove} activeOpacity={0.7}>
          <Ionicons name="trash-outline" size={14} color={Colors.dangerRed} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ── Cart screen ───────────────────────────────
export default function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const cart           = useStore(s => s.cart);
  const increaseQty    = useStore(s => s.increaseQty);
  const decreaseQty    = useStore(s => s.decreaseQty);
  const removeFromCart = useStore(s => s.removeFromCart);

  const [discount, setDiscount] = useState('');

  const headerFade  = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-40)).current;
  const summaryFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(summaryFade, { toValue: 1, duration: 500, delay: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  const subtotal     = cart.reduce((s, i) => s + i.sell_price * i.qty, 0);
  const discountPct  = parseFloat(discount) || 0;
  const discountAmt  = (subtotal * discountPct) / 100;
  const total        = subtotal - discountAmt;
  const totalTablets = cart.reduce((s, i) => s + i.qty, 0);

  const handleBill = () => {
    // final stock check before going to bill
    const overStock = cart.filter(i => i.qty > i.stock_qty);
    if (overStock.length > 0) {
      const names = overStock.map(i => `• ${i.name}: only ${i.stock_qty} available`).join('\n');
      if (Platform.OS === 'web') {
        window.alert(`Stock issue\n\nNot enough stock:\n${names}`);
      } else {
        Alert.alert('Stock issue', `Not enough stock:\n${names}`);
      }
      return;
    }
    navigation.navigate('Bill', { cart, subtotal, discountPct, discountAmt, total });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Cart</Text>
          <Text style={styles.headerSub}>{totalTablets} tablets · {cart.length} medicines</Text>
        </View>
        {cart.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={() => useStore.getState().clearCart()} activeOpacity={0.8}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {cart.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Ionicons name="cart-outline" size={64} color={Colors.gray300} />
          <Text style={styles.emptyTitle}>Cart is empty</Text>
          <Text style={styles.emptySubtitle}>Go back and add medicines</Text>
          <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Text style={styles.goBackBtnText}>Search medicines</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            <Text style={styles.sectionLabel}>Items</Text>
            <View style={styles.cartList}>
              {cart.map((item, i) => (
                <CartRow
                  key={item.id}
                  item={item}
                  delay={i * 60}
                  onIncrease={() => increaseQty(item.id)}
                  onDecrease={() => decreaseQty(item.id)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </View>

            <Text style={styles.sectionLabel}>Discount</Text>
            <Animated.View style={[styles.discountCard, { opacity: summaryFade }]}>
              <View style={styles.discountRow}>
                <View style={styles.discountInputWrap}>
                  <Ionicons name="pricetag-outline" size={16} color={Colors.gray500} style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.discountInput}
                    placeholder="Enter discount %"
                    placeholderTextColor={Colors.gray500}
                    value={discount}
                    onChangeText={setDiscount}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <Text style={styles.discountPctSign}>%</Text>
                </View>
                {discountPct > 0 && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>- Rs {discountAmt.toFixed(0)}</Text>
                  </View>
                )}
              </View>
            </Animated.View>

            <Text style={styles.sectionLabel}>Summary</Text>
            <Animated.View style={[styles.summaryCard, { opacity: summaryFade }]}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>Rs {subtotal.toFixed(0)}</Text>
              </View>
              {discountPct > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount ({discountPct}%)</Text>
                  <Text style={[styles.summaryValue, { color: Colors.dangerRed }]}>- Rs {discountAmt.toFixed(0)}</Text>
                </View>
              )}
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>Rs {total.toFixed(0)}</Text>
              </View>
            </Animated.View>

          </ScrollView>

          <Animated.View style={[styles.bottomBar, { opacity: summaryFade }]}>
            <View style={styles.bottomTotal}>
              <Text style={styles.bottomTotalLabel}>Total</Text>
              <Text style={styles.bottomTotalValue}>Rs {total.toFixed(0)}</Text>
            </View>
            <TouchableOpacity style={styles.billBtn} onPress={handleBill} activeOpacity={0.85}>
              <Ionicons name="receipt-outline" size={18} color={Colors.white} />
              <Text style={styles.billBtnText}>Generate bill</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.white} />
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:         { flex: 1, backgroundColor: Colors.gray50 },
  header:            { backgroundColor: Colors.darkBlue, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, flexDirection: 'row', alignItems: 'center' },
  backBtn:           { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  headerTitle:       { color: Colors.white, fontSize: 17, fontWeight: '600' },
  headerSub:         { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
  clearBtn:          { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 20 },
  clearBtnText:      { color: Colors.white, fontSize: 12, fontWeight: '500' },
  scroll:            { flex: 1 },
  scrollContent:     { padding: 14, gap: 10, paddingBottom: 120 },
  sectionLabel:      { fontSize: 11, fontWeight: '600', color: Colors.gray500, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4 },
  cartList:          { backgroundColor: Colors.white, borderRadius: 12, borderWidth: 0.5, borderColor: Colors.gray200, overflow: 'hidden' },
  cartRow:           { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: Colors.gray100, gap: 10 },
  cartRowLeft:       { flex: 1 },
  cartName:          { fontSize: 13, fontWeight: '600', color: Colors.black },
  cartPrice:         { fontSize: 11, color: Colors.gray500, marginTop: 2 },
  stockWarning:      { fontSize: 10, color: Colors.dangerRed, marginTop: 3, fontWeight: '500' },
  cartRowRight:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyControl:        { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn:            { width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.gray100, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: Colors.gray200 },
  qtyBtnDisabled:    { backgroundColor: Colors.gray50, borderColor: Colors.gray100, opacity: 0.5 },
  qtyVal:            { fontSize: 14, fontWeight: '600', color: Colors.black, minWidth: 22, textAlign: 'center' },
  cartSubtotal:      { fontSize: 13, fontWeight: '700', color: Colors.darkBlue, minWidth: 55 },
  removeBtn:         { width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.dangerBg, alignItems: 'center', justifyContent: 'center' },
  discountCard:      { backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200 },
  discountRow:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
  discountInputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray50, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 0.5, borderColor: Colors.gray200 },
  discountInput:     { flex: 1, fontSize: 15, color: Colors.black, padding: 0 },
  discountPctSign:   { fontSize: 15, color: Colors.gray500, fontWeight: '500' },
  discountBadge:     { backgroundColor: Colors.dangerBg, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  discountBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.dangerText },
  summaryCard:       { backgroundColor: Colors.white, borderRadius: 12, padding: 14, borderWidth: 0.5, borderColor: Colors.gray200, gap: 10 },
  summaryRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel:      { fontSize: 13, color: Colors.gray700 },
  summaryValue:      { fontSize: 13, fontWeight: '600', color: Colors.black },
  summaryDivider:    { height: 0.5, backgroundColor: Colors.gray200 },
  totalLabel:        { fontSize: 15, fontWeight: '700', color: Colors.black },
  totalValue:        { fontSize: 18, fontWeight: '700', color: Colors.darkBlue },
  bottomBar:         { backgroundColor: Colors.white, borderTopWidth: 0.5, borderTopColor: Colors.gray200, paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 14 },
  bottomTotal:       { flex: 1 },
  bottomTotalLabel:  { fontSize: 11, color: Colors.gray500 },
  bottomTotalValue:  { fontSize: 20, fontWeight: '700', color: Colors.darkBlue },
  billBtn:           { flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.darkBlue, paddingVertical: 14, borderRadius: 12, gap: 8 },
  billBtnText:       { color: Colors.white, fontSize: 14, fontWeight: '600' },
  emptyWrap:         { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyTitle:        { fontSize: 18, fontWeight: '600', color: Colors.black },
  emptySubtitle:     { fontSize: 13, color: Colors.gray500 },
  goBackBtn:         { marginTop: 8, backgroundColor: Colors.darkBlue, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  goBackBtnText:     { color: Colors.white, fontSize: 14, fontWeight: '600' },
});