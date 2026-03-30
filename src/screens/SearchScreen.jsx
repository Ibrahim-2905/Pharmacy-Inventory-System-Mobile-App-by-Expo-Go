// // import React, { useEffect, useRef, useState } from 'react';
// // import {
// //   View, Text, ScrollView, StyleSheet,
// //   TouchableOpacity, Animated, TextInput,
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useSafeAreaInsets } from 'react-native-safe-area-context';
// // import Colors from '../theme/colors';
// // import Footer from '../components/Footer';


// // // ── Medicine search card ───────────────────────
// // const MedicineCard = ({ name, qty, sellPrice, onAdd, delay }) => {
// //   const fade  = useRef(new Animated.Value(0)).current;
// //   const slide = useRef(new Animated.Value(16)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(fade,  { toValue: 1, duration: 320, delay, useNativeDriver: true }),
// //       Animated.timing(slide, { toValue: 0, duration: 320, delay, useNativeDriver: true }),
// //     ]).start();
// //   }, []);

// //   const isOut = qty === 0;

// //   return (
// //     <Animated.View style={[styles.medCard, { opacity: fade, transform: [{ translateY: slide }] }]}>
// //       <View style={styles.medInfo}>
// //         <Text style={styles.medName}>{name}</Text>
// //         <View style={styles.medMeta}>
// //           <View style={[styles.qtyPill, {
// //             backgroundColor: isOut ? Colors.dangerBg : qty <= 10 ? Colors.warningBg : Colors.successBg
// //           }]}>
// //             <Text style={[styles.qtyPillText, {
// //               color: isOut ? Colors.dangerText : qty <= 10 ? Colors.warningText : Colors.successText
// //             }]}>
// //               {isOut ? 'Out of stock' : `${qty} tablets left`}
// //             </Text>
// //           </View>
// //           <Text style={styles.priceText}>Rs {sellPrice} / tablet</Text>
// //         </View>
// //       </View>
// //       <TouchableOpacity
// //         style={[styles.addBtn, isOut && styles.addBtnDisabled]}
// //         onPress={isOut ? null : onAdd}
// //         activeOpacity={0.75}
// //       >
// //         <Ionicons name="add" size={18} color={Colors.white} />
// //       </TouchableOpacity>
// //     </Animated.View>
// //   );
// // };

// // // ── Cart item row ─────────────────────────────
// // const CartItem = ({ name, qty, sellPrice, onIncrease, onDecrease, onRemove }) => {
// //   const scale = useRef(new Animated.Value(0.95)).current;
// //   const fade  = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }),
// //       Animated.timing(fade,  { toValue: 1, duration: 250, useNativeDriver: true }),
// //     ]).start();
// //   }, []);

// //   return (
// //     <Animated.View style={[styles.cartItem, { opacity: fade, transform: [{ scale }] }]}>
// //       <View style={{ flex: 1 }}>
// //         <Text style={styles.cartName}>{name}</Text>
// //         <Text style={styles.cartSubtotal}>Rs {(sellPrice * qty).toFixed(0)}</Text>
// //       </View>
// //       <View style={styles.qtyRow}>
// //         <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease} activeOpacity={0.7}>
// //           <Ionicons name="remove" size={14} color={Colors.darkBlue} />
// //         </TouchableOpacity>
// //         <Text style={styles.qtyVal}>{qty}</Text>
// //         <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease} activeOpacity={0.7}>
// //           <Ionicons name="add" size={14} color={Colors.darkBlue} />
// //         </TouchableOpacity>
// //       </View>
// //       <TouchableOpacity onPress={onRemove} style={styles.removeBtn} activeOpacity={0.7}>
// //         <Ionicons name="close" size={14} color={Colors.dangerRed} />
// //       </TouchableOpacity>
// //     </Animated.View>
// //   );
// // };

// // // ── Search screen ─────────────────────────────
// // export default function SearchScreen({ navigation }) {
// //   const insets = useSafeAreaInsets();
// //   const [search,  setSearch]  = useState('');
// //   const [cart,    setCart]    = useState([]);
// //   const [showCart, setShowCart] = useState(false);

// //   const headerFade  = useRef(new Animated.Value(0)).current;
// //   const headerSlide = useRef(new Animated.Value(-40)).current;
// //   const cartAnim    = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
// //       Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
// //     ]).start();
// //   }, []);

// //   // animate cart panel
// //   useEffect(() => {
// //     Animated.spring(cartAnim, {
// //       toValue: showCart ? 1 : 0,
// //       useNativeDriver: false,
// //       friction: 8,
// //     }).start();
// //   }, [showCart]);

// //   const medicines = [
// //     { id: 1, name: 'Panadol 500mg',   qty: 3,  sellPrice: 15  },
// //     { id: 2, name: 'Augmentin 625mg', qty: 24, sellPrice: 210 },
// //     { id: 3, name: 'Brufen 400mg',    qty: 8,  sellPrice: 35  },
// //     { id: 4, name: 'Disprin 300mg',   qty: 52, sellPrice: 12  },
// //     { id: 5, name: 'Calpol 250mg',    qty: 18, sellPrice: 28  },
// //     { id: 6, name: 'Amoxil 500mg',    qty: 0,  sellPrice: 55  },
// //     { id: 7, name: 'Flagyl 400mg',    qty: 30, sellPrice: 24  },
// //   ];

// //   const filtered = medicines.filter(m =>
// //     m.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   // cart total
// //   const cartTotal = cart.reduce((sum, item) => sum + item.sellPrice * item.qty, 0);
// //   const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

// //   const addToCart = (medicine) => {
// //     setCart(prev => {
// //       const existing = prev.find(i => i.id === medicine.id);
// //       if (existing) {
// //         return prev.map(i => i.id === medicine.id ? { ...i, qty: i.qty + 1 } : i);
// //       }
// //       return [...prev, { ...medicine, qty: 1 }];
// //     });
// //   };

// //   const increase = (id) => {
// //     setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
// //   };

// //   const decrease = (id) => {
// //     setCart(prev => {
// //       const item = prev.find(i => i.id === id);
// //       if (item.qty === 1) return prev.filter(i => i.id !== id);
// //       return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
// //     });
// //   };

// //   const remove = (id) => {
// //     setCart(prev => prev.filter(i => i.id !== id));
// //   };

// //   const cartHeight = cartAnim.interpolate({
// //     inputRange:  [0, 1],
// //     outputRange: [0, 280],
// //   });

// //   return (
// //     <View style={[styles.container, { paddingTop: insets.top }]}>

// //       {/* Header */}
// //       <Animated.View style={[
// //         styles.header,
// //         { opacity: headerFade, transform: [{ translateY: headerSlide }] },
// //       ]}>
// //         <View>
// //           <Text style={styles.headerTitle}>Search & sell</Text>
// //           <Text style={styles.headerSub}>Find medicine and add to cart</Text>
// //         </View>
// //         {cart.length > 0 && (
// //           <TouchableOpacity
// //             style={styles.cartToggle}
// //             onPress={() => setShowCart(p => !p)}
// //             activeOpacity={0.8}
// //           >
// //             <Ionicons name="cart-outline" size={20} color={Colors.white} />
// //             <View style={styles.cartBadge}>
// //               <Text style={styles.cartBadgeText}>{cartCount}</Text>
// //             </View>
// //           </TouchableOpacity>
// //         )}
// //       </Animated.View>

// //       {/* Search bar */}
// //       <View style={styles.searchWrap}>
// //         <View style={styles.searchBox}>
// //           <Ionicons name="search-outline" size={16} color={Colors.gray500} />
// //           <TextInput
// //             style={styles.searchInput}
// //             placeholder="Type medicine name..."
// //             placeholderTextColor={Colors.gray500}
// //             value={search}
// //             onChangeText={setSearch}
// //             autoFocus={false}
// //           />
// //           {search.length > 0 && (
// //             <TouchableOpacity onPress={() => setSearch('')}>
// //               <Ionicons name="close-circle" size={16} color={Colors.gray500} />
// //             </TouchableOpacity>
// //           )}
// //         </View>
// //       </View>

// //       {/* Cart panel — slides down */}
// //       {cart.length > 0 && (
// //         <Animated.View style={[styles.cartPanel, { maxHeight: cartHeight }]}>
// //           <TouchableOpacity
// //             style={styles.cartHeader}
// //             onPress={() => setShowCart(p => !p)}
// //             activeOpacity={0.8}
// //           >
// //             <Text style={styles.cartHeaderText}>Cart ({cartCount} tablets)</Text>
// //             <Ionicons
// //               name={showCart ? 'chevron-up' : 'chevron-down'}
// //               size={16}
// //               color={Colors.darkBlue}
// //             />
// //           </TouchableOpacity>
// //           <ScrollView
// //             style={styles.cartScroll}
// //             showsVerticalScrollIndicator={false}
// //             nestedScrollEnabled
// //           >
// //             {cart.map(item => (
// //               <CartItem
// //                 key={item.id}
// //                 {...item}
// //                 onIncrease={() => increase(item.id)}
// //                 onDecrease={() => decrease(item.id)}
// //                 onRemove={() => remove(item.id)}
// //               />
// //             ))}
// //           </ScrollView>
// //         </Animated.View>
// //       )}

// //       {/* Medicine list */}
// //       <ScrollView
// //         style={styles.scroll}
// //         contentContainerStyle={styles.scrollContent}
// //         showsVerticalScrollIndicator={false}
// //         keyboardShouldPersistTaps="handled"
// //       >
// //         {search === '' && (
// //           <Text style={styles.hint}>Showing all medicines</Text>
// //         )}
// //         {filtered.length === 0 ? (
// //           <View style={styles.emptyWrap}>
// //             <Ionicons name="search-outline" size={48} color={Colors.gray300} />
// //             <Text style={styles.emptyText}>No medicine found</Text>
// //           </View>
// //         ) : (
// //           filtered.map((m, i) => (
// //             <MedicineCard
// //               key={m.id}
// //               {...m}
// //               delay={i * 50}
// //               onAdd={() => addToCart(m)}
// //             />
// //           ))
// //         )}
// //       </ScrollView>

// //       {/* Go to Cart button */}
// //       {cart.length > 0 && (
// //         <TouchableOpacity
// //           style={styles.goCartBtn}
// //           onPress={() => navigation.navigate('Cart', { cart })}
// //           activeOpacity={0.85}
// //         >
// //           <View style={styles.goCartLeft}>
// //             <Ionicons name="cart" size={18} color={Colors.white} />
// //             <Text style={styles.goCartText}>Go to cart</Text>
// //           </View>
// //           <View style={styles.goCartRight}>
// //             <Text style={styles.goCartTotal}>Rs {cartTotal.toFixed(0)}</Text>
// //             <Ionicons name="arrow-forward" size={16} color={Colors.white} />
// //           </View>
// //         </TouchableOpacity>
// //       )}

// //       <Footer activeScreen="Search" navigation={navigation} />
// //     </View>
// //   );
// // }

// // // ── Styles ────────────────────────────────────
// // const styles = StyleSheet.create({
// //   container:      { flex: 1, backgroundColor: Colors.gray50 },

// //   header:         {
// //     backgroundColor: Colors.darkBlue,
// //     paddingHorizontal: 16,
// //     paddingTop: 12, paddingBottom: 14,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   headerTitle:    { color: Colors.white, fontSize: 17, fontWeight: '600' },
// //   headerSub:      { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
// //   cartToggle:     {
// //     width: 40, height: 40, borderRadius: 20,
// //     backgroundColor: Colors.skyBlueDark,
// //     alignItems: 'center', justifyContent: 'center',
// //   },
// //   cartBadge:      {
// //     position: 'absolute', top: -2, right: -2,
// //     width: 16, height: 16, borderRadius: 8,
// //     backgroundColor: Colors.dangerRed,
// //     alignItems: 'center', justifyContent: 'center',
// //   },
// //   cartBadgeText:  { fontSize: 9, color: Colors.white, fontWeight: '700' },

// //   searchWrap:     { backgroundColor: Colors.darkBlue, paddingHorizontal: 14, paddingBottom: 12 },
// //   searchBox:      {
// //     backgroundColor: Colors.white,
// //     borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9,
// //     flexDirection: 'row', alignItems: 'center', gap: 8,
// //   },
// //   searchInput:    { flex: 1, fontSize: 13, color: Colors.black, padding: 0 },

// //   cartPanel:      {
// //     backgroundColor: Colors.white,
// //     borderBottomWidth: 0.5,
// //     borderBottomColor: Colors.gray200,
// //     overflow: 'hidden',
// //   },
// //   cartHeader:     {
// //     flexDirection: 'row', justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 14, paddingVertical: 10,
// //     borderBottomWidth: 0.5, borderBottomColor: Colors.gray100,
// //   },
// //   cartHeaderText: { fontSize: 13, fontWeight: '600', color: Colors.darkBlue },
// //   cartScroll:     { maxHeight: 220, paddingHorizontal: 14 },

// //   cartItem:       {
// //     flexDirection: 'row', alignItems: 'center',
// //     paddingVertical: 9,
// //     borderBottomWidth: 0.5, borderBottomColor: Colors.gray100,
// //     gap: 10,
// //   },
// //   cartName:       { fontSize: 13, fontWeight: '500', color: Colors.black },
// //   cartSubtotal:   { fontSize: 11, color: Colors.skyBlueDark, marginTop: 2, fontWeight: '600' },
// //   qtyRow:         { flexDirection: 'row', alignItems: 'center', gap: 8 },
// //   qtyBtn:         {
// //     width: 26, height: 26, borderRadius: 8,
// //     backgroundColor: Colors.gray100,
// //     alignItems: 'center', justifyContent: 'center',
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //   },
// //   qtyVal:         { fontSize: 14, fontWeight: '600', color: Colors.black, minWidth: 20, textAlign: 'center' },
// //   removeBtn:      {
// //     width: 26, height: 26, borderRadius: 8,
// //     backgroundColor: Colors.dangerBg,
// //     alignItems: 'center', justifyContent: 'center',
// //   },

// //   scroll:         { flex: 1 },
// //   scrollContent:  { padding: 14, gap: 10, paddingBottom: 100 },
// //   hint:           { fontSize: 11, color: Colors.gray500, marginBottom: 2 },

// //   medCard:        {
// //     backgroundColor: Colors.white,
// //     borderRadius: 12, padding: 13,
// //     borderWidth: 0.5, borderColor: Colors.gray200,
// //     flexDirection: 'row', alignItems: 'center', gap: 12,
// //   },
// //   medInfo:        { flex: 1 },
// //   medName:        { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 6 },
// //   medMeta:        { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
// //   qtyPill:        { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
// //   qtyPillText:    { fontSize: 10, fontWeight: '600' },
// //   priceText:      { fontSize: 11, color: Colors.gray700, fontWeight: '500' },
// //   addBtn:         {
// //     width: 36, height: 36, borderRadius: 18,
// //     backgroundColor: Colors.skyBlueDark,
// //     alignItems: 'center', justifyContent: 'center',
// //   },
// //   addBtnDisabled: { backgroundColor: Colors.gray300 },

// //   goCartBtn:      {
// //     flexDirection: 'row', alignItems: 'center',
// //     justifyContent: 'space-between',
// //     backgroundColor: Colors.darkBlue,
// //     marginHorizontal: 14, marginBottom: 10,
// //     paddingHorizontal: 18, paddingVertical: 14,
// //     borderRadius: 14,
// //   },
// //   goCartLeft:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
// //   goCartText:     { color: Colors.white, fontSize: 14, fontWeight: '600' },
// //   goCartRight:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
// //   goCartTotal:    { color: Colors.skyBlue, fontSize: 14, fontWeight: '700' },

// //   emptyWrap:      { alignItems: 'center', paddingTop: 60, gap: 12 },
// //   emptyText:      { fontSize: 14, color: Colors.gray500 },
// // });


















// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Animated, TextInput,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';
// import Colors from '../theme/colors';
// import { getAllMedicines, searchMedicines } from '../database/queries';
// import useStore from '../store/useStore';
// import Footer from '../components/Footer';

// // ── Medicine card ─────────────────────────────
// const MedicineCard = ({ item, onAdd, delay }) => {
//   const fade  = useRef(new Animated.Value(0)).current;
//   const slide = useRef(new Animated.Value(16)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fade,  { toValue: 1, duration: 320, delay, useNativeDriver: true }),
//       Animated.timing(slide, { toValue: 0, duration: 320, delay, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const isOut = item.qty === 0;
//   const isLow = item.qty > 0 && item.qty <= 10;

//   return (
//     <Animated.View style={[styles.medCard, { opacity: fade, transform: [{ translateY: slide }] }]}>
//       <View style={styles.medInfo}>
//         <Text style={styles.medName}>{item.name}</Text>
//         <View style={styles.medMeta}>
//           <View style={[styles.qtyPill, {
//             backgroundColor: isOut
//               ? Colors.dangerBg
//               : isLow
//               ? Colors.warningBg
//               : Colors.successBg,
//           }]}>
//             <Text style={[styles.qtyPillText, {
//               color: isOut
//                 ? Colors.dangerText
//                 : isLow
//                 ? Colors.warningText
//                 : Colors.successText,
//             }]}>
//               {isOut ? 'Out of stock' : `${item.qty} tablets`}
//             </Text>
//           </View>
//           <Text style={styles.priceText}>Rs {item.sell_price} / tablet</Text>
//         </View>
//       </View>
//       <TouchableOpacity
//         style={[styles.addBtn, isOut && styles.addBtnDisabled]}
//         onPress={isOut ? null : () => onAdd(item)}
//         activeOpacity={0.75}
//       >
//         <Ionicons name="add" size={20} color={Colors.white} />
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// // ── Cart item ─────────────────────────────────
// const CartRow = ({ item, onIncrease, onDecrease, onRemove }) => {
//   const scale = useRef(new Animated.Value(0.95)).current;
//   const fade  = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }),
//       Animated.timing(fade,  { toValue: 1, duration: 250, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   return (
//     <Animated.View style={[styles.cartRow, { opacity: fade, transform: [{ scale }] }]}>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.cartName} numberOfLines={1}>{item.name}</Text>
//         <Text style={styles.cartSubtotal}>
//           Rs {(item.sell_price * item.qty).toFixed(0)}
//         </Text>
//       </View>
//       <View style={styles.qtyControl}>
//         <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease} activeOpacity={0.7}>
//           <Ionicons name="remove" size={14} color={Colors.darkBlue} />
//         </TouchableOpacity>
//         <Text style={styles.qtyVal}>{item.qty}</Text>
//         <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease} activeOpacity={0.7}>
//           <Ionicons name="add" size={14} color={Colors.darkBlue} />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.removeBtn} onPress={onRemove} activeOpacity={0.7}>
//         <Ionicons name="close" size={14} color={Colors.dangerRed} />
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// // ── Search screen ─────────────────────────────
// export default function SearchScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   const [medicines, setMedicines] = useState([]);
//   const [search,    setSearch]    = useState('');
//   const [loading,   setLoading]   = useState(true);
//   const [showCart,  setShowCart]  = useState(false);

//   // global cart from zustand
//   const cart          = useStore(s => s.cart);
//   const addToCart     = useStore(s => s.addToCart);
//   const increaseQty   = useStore(s => s.increaseQty);
//   const decreaseQty   = useStore(s => s.decreaseQty);
//   const removeFromCart= useStore(s => s.removeFromCart);

//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-40)).current;
//   const cartAnim    = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
//       Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   // reload on focus
//   useFocusEffect(
//     useCallback(() => {
//       loadMedicines();
//     }, [])
//   );

//   // search debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (search.trim()) {
//         doSearch(search);
//       } else {
//         loadMedicines();
//       }
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [search]);

//   // cart panel animation
//   useEffect(() => {
//     Animated.spring(cartAnim, {
//       toValue: showCart ? 1 : 0,
//       useNativeDriver: false,
//       friction: 8,
//     }).start();
//   }, [showCart]);

//   const loadMedicines = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllMedicines();
//       setMedicines(data);
//     } catch (err) {
//       console.error('Load medicines error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const doSearch = async (q) => {
//     try {
//       const data = await searchMedicines(q);
//       setMedicines(data);
//     } catch (err) {
//       console.error('Search error:', err);
//     }
//   };

//   // cart computed values
//   const cartTotal  = cart.reduce((s, i) => s + i.sell_price * i.qty, 0);
//   const cartCount  = cart.reduce((s, i) => s + i.qty, 0);

//   const cartHeight = cartAnim.interpolate({
//     inputRange:  [0, 1],
//     outputRange: [0, 260],
//   });

//   return (
//     <View style={[styles.container, { paddingTop: insets.top }]}>

//       {/* Header */}
//       <Animated.View style={[
//         styles.header,
//         { opacity: headerFade, transform: [{ translateY: headerSlide }] },
//       ]}>
//         <View>
//           <Text style={styles.headerTitle}>Search & sell</Text>
//           <Text style={styles.headerSub}>Find and add to cart</Text>
//         </View>
//         {cart.length > 0 && (
//           <TouchableOpacity
//             style={styles.cartToggle}
//             onPress={() => setShowCart(p => !p)}
//             activeOpacity={0.8}
//           >
//             <Ionicons name="cart-outline" size={20} color={Colors.white} />
//             <View style={styles.cartBadge}>
//               <Text style={styles.cartBadgeText}>{cartCount}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </Animated.View>

//       {/* Search bar */}
//       <View style={styles.searchWrap}>
//         <View style={styles.searchBox}>
//           <Ionicons name="search-outline" size={16} color={Colors.gray500} />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Type medicine name..."
//             placeholderTextColor={Colors.gray500}
//             value={search}
//             onChangeText={setSearch}
//           />
//           {search.length > 0 && (
//             <TouchableOpacity onPress={() => setSearch('')}>
//               <Ionicons name="close-circle" size={16} color={Colors.gray500} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Sliding cart panel */}
//       {cart.length > 0 && (
//         <Animated.View style={[styles.cartPanel, { maxHeight: cartHeight }]}>
//           <TouchableOpacity
//             style={styles.cartHeader}
//             onPress={() => setShowCart(p => !p)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.cartHeaderText}>
//               Cart — {cartCount} tablet{cartCount !== 1 ? 's' : ''}
//             </Text>
//             <Ionicons
//               name={showCart ? 'chevron-up' : 'chevron-down'}
//               size={16}
//               color={Colors.darkBlue}
//             />
//           </TouchableOpacity>
//           <ScrollView
//             style={styles.cartScroll}
//             showsVerticalScrollIndicator={false}
//             nestedScrollEnabled
//           >
//             {cart.map(item => (
//               <CartRow
//                 key={item.id}
//                 item={item}
//                 onIncrease={() => increaseQty(item.id)}
//                 onDecrease={() => decreaseQty(item.id)}
//                 onRemove={() => removeFromCart(item.id)}
//               />
//             ))}
//           </ScrollView>
//         </Animated.View>
//       )}

//       {/* Medicine list */}
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {loading ? (
//           <View style={styles.emptyWrap}>
//             <Text style={styles.emptyText}>Loading...</Text>
//           </View>
//         ) : medicines.length === 0 ? (
//           <View style={styles.emptyWrap}>
//             <Ionicons name="search-outline" size={48} color={Colors.gray300} />
//             <Text style={styles.emptyText}>
//               {search ? 'No medicine found' : 'No medicines in stock'}
//             </Text>
//           </View>
//         ) : (
//           medicines.map((m, i) => (
//             <MedicineCard
//               key={m.id}
//               item={m}
//               delay={i * 50}
//               onAdd={addToCart}
//             />
//           ))
//         )}
//       </ScrollView>

//       {/* Go to cart button */}
//       {cart.length > 0 && (
//         <TouchableOpacity
//           style={styles.goCartBtn}
//           onPress={() => navigation.navigate('Cart')}
//           activeOpacity={0.85}
//         >
//           <View style={styles.goCartLeft}>
//             <Ionicons name="cart" size={18} color={Colors.white} />
//             <Text style={styles.goCartText}>Go to cart</Text>
//           </View>
//           <View style={styles.goCartRight}>
//             <Text style={styles.goCartTotal}>Rs {cartTotal.toFixed(0)}</Text>
//             <Ionicons name="arrow-forward" size={16} color={Colors.white} />
//           </View>
//         </TouchableOpacity>
//       )}

//       <Footer activeScreen="Search" navigation={navigation} />
//     </View>
//   );
// }

// // ── Styles ────────────────────────────────────
// const styles = StyleSheet.create({
//   container:      { flex: 1, backgroundColor: Colors.gray50 },

//   header:         {
//     backgroundColor: Colors.darkBlue,
//     paddingHorizontal: 16,
//     paddingTop: 12, paddingBottom: 14,
//     flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerTitle:    { color: Colors.white, fontSize: 17, fontWeight: '600' },
//   headerSub:      { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
//   cartToggle:     {
//     width: 40, height: 40, borderRadius: 20,
//     backgroundColor: Colors.skyBlueDark,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   cartBadge:      {
//     position: 'absolute', top: -2, right: -2,
//     width: 16, height: 16, borderRadius: 8,
//     backgroundColor: Colors.dangerRed,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   cartBadgeText:  { fontSize: 9, color: Colors.white, fontWeight: '700' },

//   searchWrap:     { backgroundColor: Colors.darkBlue, paddingHorizontal: 14, paddingBottom: 12 },
//   searchBox:      {
//     backgroundColor: Colors.white,
//     borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9,
//     flexDirection: 'row', alignItems: 'center', gap: 8,
//   },
//   searchInput:    { flex: 1, fontSize: 13, color: Colors.black, padding: 0 },

//   cartPanel:      {
//     backgroundColor: Colors.white,
//     borderBottomWidth: 0.5,
//     borderBottomColor: Colors.gray200,
//     overflow: 'hidden',
//   },
//   cartHeader:     {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 14, paddingVertical: 10,
//     borderBottomWidth: 0.5, borderBottomColor: Colors.gray100,
//   },
//   cartHeaderText: { fontSize: 13, fontWeight: '600', color: Colors.darkBlue },
//   cartScroll:     { maxHeight: 200, paddingHorizontal: 14 },
//   cartRow:        {
//     flexDirection: 'row', alignItems: 'center',
//     paddingVertical: 9, gap: 10,
//     borderBottomWidth: 0.5, borderBottomColor: Colors.gray100,
//   },
//   cartName:       { fontSize: 13, fontWeight: '500', color: Colors.black },
//   cartSubtotal:   { fontSize: 11, color: Colors.skyBlueDark, marginTop: 2, fontWeight: '600' },
//   qtyControl:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   qtyBtn:         {
//     width: 26, height: 26, borderRadius: 8,
//     backgroundColor: Colors.gray100,
//     alignItems: 'center', justifyContent: 'center',
//     borderWidth: 0.5, borderColor: Colors.gray200,
//   },
//   qtyVal:         {
//     fontSize: 14, fontWeight: '600',
//     color: Colors.black, minWidth: 20, textAlign: 'center',
//   },
//   removeBtn:      {
//     width: 26, height: 26, borderRadius: 8,
//     backgroundColor: Colors.dangerBg,
//     alignItems: 'center', justifyContent: 'center',
//   },

//   scroll:         { flex: 1 },
//   scrollContent:  { padding: 14, gap: 10, paddingBottom: 100 },

//   medCard:        {
//     backgroundColor: Colors.white,
//     borderRadius: 12, padding: 13,
//     borderWidth: 0.5, borderColor: Colors.gray200,
//     flexDirection: 'row', alignItems: 'center', gap: 12,
//   },
//   medInfo:        { flex: 1 },
//   medName:        { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 6 },
//   medMeta:        { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
//   qtyPill:        { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
//   qtyPillText:    { fontSize: 10, fontWeight: '600' },
//   priceText:      { fontSize: 11, color: Colors.gray700, fontWeight: '500' },
//   addBtn:         {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: Colors.skyBlueDark,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   addBtnDisabled: { backgroundColor: Colors.gray300 },

//   goCartBtn:      {
//     flexDirection: 'row', alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: Colors.darkBlue,
//     marginHorizontal: 14, marginBottom: 10,
//     paddingHorizontal: 18, paddingVertical: 14,
//     borderRadius: 14,
//   },
//   goCartLeft:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
//   goCartText:     { color: Colors.white, fontSize: 14, fontWeight: '600' },
//   goCartRight:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
//   goCartTotal:    { color: Colors.skyBlue, fontSize: 14, fontWeight: '700' },

//   emptyWrap:      { alignItems: 'center', paddingTop: 60, gap: 12 },
//   emptyText:      { fontSize: 14, color: Colors.gray500 },
// });

















import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Animated, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../theme/colors';
import { getAllMedicines, searchMedicines } from '../database/queries';
import useStore from '../store/useStore';
import Footer from '../components/Footer';

// ── Medicine card ─────────────────────────────
const MedicineCard = ({ item, cartQty, onAdd, delay }) => {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 320, delay, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 320, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  const isOut     = item.qty === 0;
  const isLow     = item.qty > 0 && item.qty <= 10;
  // disable + if already added max stock qty to cart
  const atLimit   = cartQty >= item.qty;
  const disabled  = isOut || atLimit;

  return (
    <Animated.View style={[styles.medCard, { opacity: fade, transform: [{ translateY: slide }] }]}>
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{item.name}</Text>
        <View style={styles.medMeta}>
          <View style={[styles.qtyPill, {
            backgroundColor: isOut
              ? Colors.dangerBg
              : isLow
              ? Colors.warningBg
              : Colors.successBg,
          }]}>
            <Text style={[styles.qtyPillText, {
              color: isOut
                ? Colors.dangerText
                : isLow
                ? Colors.warningText
                : Colors.successText,
            }]}>
              {isOut ? 'Out of stock' : `${item.qty} tablets`}
            </Text>
          </View>
          <Text style={styles.priceText}>Rs {item.sell_price} / tablet</Text>
          {/* show how many are in cart */}
          {cartQty > 0 && (
            <View style={styles.inCartPill}>
              <Text style={styles.inCartText}>{cartQty} in cart</Text>
            </View>
          )}
        </View>
        {/* warn when at limit */}
        {atLimit && !isOut && (
          <Text style={styles.limitText}>⚠ Max stock reached</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.addBtn, disabled && styles.addBtnDisabled]}
        onPress={disabled ? null : () => onAdd(item)}
        disabled={disabled}
        activeOpacity={0.75}
      >
        <Ionicons name="add" size={20} color={Colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Cart row (inside sliding panel) ──────────
const CartRow = ({ item, onIncrease, onDecrease, onRemove }) => {
  const scale = useRef(new Animated.Value(0.95)).current;
  const fade  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }),
      Animated.timing(fade,  { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  }, []);

  const atLimit = item.qty >= item.stock_qty;

  return (
    <Animated.View style={[styles.cartRow, { opacity: fade, transform: [{ scale }] }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cartName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cartSubtotal}>Rs {(item.sell_price * item.qty).toFixed(0)}</Text>
      </View>
      <View style={styles.qtyControl}>
        <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease} activeOpacity={0.7}>
          <Ionicons name="remove" size={14} color={Colors.darkBlue} />
        </TouchableOpacity>
        <Text style={styles.qtyVal}>{item.qty}</Text>
        <TouchableOpacity
          style={[styles.qtyBtn, atLimit && styles.qtyBtnDisabled]}
          onPress={atLimit ? null : onIncrease}
          disabled={atLimit}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={14} color={atLimit ? Colors.gray400 : Colors.darkBlue} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={onRemove} activeOpacity={0.7}>
        <Ionicons name="close" size={14} color={Colors.dangerRed} />
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Search screen ─────────────────────────────
export default function SearchScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [medicines, setMedicines] = useState([]);
  const [search,    setSearch]    = useState('');
  const [loading,   setLoading]   = useState(true);
  const [showCart,  setShowCart]  = useState(false);

  const cart           = useStore(s => s.cart);
  const addToCart      = useStore(s => s.addToCart);
  const increaseQty    = useStore(s => s.increaseQty);
  const decreaseQty    = useStore(s => s.decreaseQty);
  const removeFromCart = useStore(s => s.removeFromCart);

  const headerFade  = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-40)).current;
  const cartAnim    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMedicines();
    }, [])
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        doSearch(search);
      } else {
        loadMedicines();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    Animated.spring(cartAnim, {
      toValue: showCart ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
    }).start();
  }, [showCart]);

  const loadMedicines = async () => {
    try {
      setLoading(true);
      const data = await getAllMedicines();
      setMedicines(data);
    } catch (err) {
      console.error('Load medicines error:', err);
    } finally {
      setLoading(false);
    }
  };

  const doSearch = async (q) => {
    try {
      const data = await searchMedicines(q);
      setMedicines(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleAddToCart = (item) => {
    // pass stock_qty so cart knows the real stock limit
    addToCart({ ...item, stock_qty: item.qty });
  };

  const cartTotal = cart.reduce((s, i) => s + i.sell_price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const cartHeight = cartAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, 260],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* Header */}
      <Animated.View style={[
        styles.header,
        { opacity: headerFade, transform: [{ translateY: headerSlide }] },
      ]}>
        <View>
          <Text style={styles.headerTitle}>Search & sell</Text>
          <Text style={styles.headerSub}>Find and add to cart</Text>
        </View>
        {cart.length > 0 && (
          <TouchableOpacity
            style={styles.cartToggle}
            onPress={() => setShowCart(p => !p)}
            activeOpacity={0.8}
          >
            <Ionicons name="cart-outline" size={20} color={Colors.white} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={16} color={Colors.gray500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Type medicine name..."
            placeholderTextColor={Colors.gray500}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color={Colors.gray500} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sliding cart panel */}
      {cart.length > 0 && (
        <Animated.View style={[styles.cartPanel, { maxHeight: cartHeight }]}>
          <TouchableOpacity
            style={styles.cartHeader}
            onPress={() => setShowCart(p => !p)}
            activeOpacity={0.8}
          >
            <Text style={styles.cartHeaderText}>
              Cart — {cartCount} tablet{cartCount !== 1 ? 's' : ''}
            </Text>
            <Ionicons
              name={showCart ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={Colors.darkBlue}
            />
          </TouchableOpacity>
          <ScrollView
            style={styles.cartScroll}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {cart.map(item => (
              <CartRow
                key={item.id}
                item={item}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      )}

      {/* Medicine list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Loading...</Text>
          </View>
        ) : medicines.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Ionicons name="search-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyText}>
              {search ? 'No medicine found' : 'No medicines in stock'}
            </Text>
          </View>
        ) : (
          medicines.map((m, i) => {
            // find how many of this medicine are already in cart
            const cartItem = cart.find(c => c.id === m.id);
            const cartQty  = cartItem ? cartItem.qty : 0;
            return (
              <MedicineCard
                key={m.id}
                item={m}
                cartQty={cartQty}
                delay={i * 50}
                onAdd={handleAddToCart}
              />
            );
          })
        )}
      </ScrollView>

      {/* Go to cart button */}
      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.goCartBtn}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.85}
        >
          <View style={styles.goCartLeft}>
            <Ionicons name="cart" size={18} color={Colors.white} />
            <Text style={styles.goCartText}>Go to cart</Text>
          </View>
          <View style={styles.goCartRight}>
            <Text style={styles.goCartTotal}>Rs {cartTotal.toFixed(0)}</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.white} />
          </View>
        </TouchableOpacity>
      )}

      <Footer activeScreen="Search" navigation={navigation} />
    </View>
  );
}

// ── Styles ────────────────────────────────────
const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: Colors.gray50 },
  header:         {
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  headerTitle:    { color: Colors.white, fontSize: 17, fontWeight: '600' },
  headerSub:      { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
  cartToggle:     {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.skyBlueDark,
    alignItems: 'center', justifyContent: 'center',
  },
  cartBadge:      {
    position: 'absolute', top: -2, right: -2,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: Colors.dangerRed,
    alignItems: 'center', justifyContent: 'center',
  },
  cartBadgeText:  { fontSize: 9, color: Colors.white, fontWeight: '700' },
  searchWrap:     { backgroundColor: Colors.darkBlue, paddingHorizontal: 14, paddingBottom: 12 },
  searchBox:      {
    backgroundColor: Colors.white,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  searchInput:    { flex: 1, fontSize: 13, color: Colors.black, padding: 0 },
  cartPanel:      {
    backgroundColor: Colors.white,
    borderBottomWidth: 0.5, borderBottomColor: Colors.gray200,
    overflow: 'hidden',
  },
  cartHeader:     {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: Colors.gray100,
  },
  cartHeaderText: { fontSize: 13, fontWeight: '600', color: Colors.darkBlue },
  cartScroll:     { maxHeight: 200, paddingHorizontal: 14 },
  cartRow:        {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 9, gap: 10,
    borderBottomWidth: 0.5, borderBottomColor: Colors.gray100,
  },
  cartName:       { fontSize: 13, fontWeight: '500', color: Colors.black },
  cartSubtotal:   { fontSize: 11, color: Colors.skyBlueDark, marginTop: 2, fontWeight: '600' },
  qtyControl:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn:         {
    width: 26, height: 26, borderRadius: 8,
    backgroundColor: Colors.gray100,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 0.5, borderColor: Colors.gray200,
  },
  qtyBtnDisabled: { backgroundColor: Colors.gray50, borderColor: Colors.gray100, opacity: 0.4 },
  qtyVal:         { fontSize: 14, fontWeight: '600', color: Colors.black, minWidth: 20, textAlign: 'center' },
  removeBtn:      {
    width: 26, height: 26, borderRadius: 8,
    backgroundColor: Colors.dangerBg,
    alignItems: 'center', justifyContent: 'center',
  },
  scroll:         { flex: 1 },
  scrollContent:  { padding: 14, gap: 10, paddingBottom: 100 },
  medCard:        {
    backgroundColor: Colors.white,
    borderRadius: 12, padding: 13,
    borderWidth: 0.5, borderColor: Colors.gray200,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  medInfo:        { flex: 1 },
  medName:        { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 6 },
  medMeta:        { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  qtyPill:        { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  qtyPillText:    { fontSize: 10, fontWeight: '600' },
  priceText:      { fontSize: 11, color: Colors.gray700, fontWeight: '500' },
  inCartPill:     { backgroundColor: Colors.skyBlueLight, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6 },
  inCartText:     { fontSize: 10, fontWeight: '600', color: Colors.skyBlueDark },
  limitText:      { fontSize: 10, color: Colors.dangerRed, marginTop: 4, fontWeight: '500' },
  addBtn:         {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.skyBlueDark,
    alignItems: 'center', justifyContent: 'center',
  },
  addBtnDisabled: { backgroundColor: Colors.gray300 },
  goCartBtn:      {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.darkBlue,
    marginHorizontal: 14, marginBottom: 10,
    paddingHorizontal: 18, paddingVertical: 14,
    borderRadius: 14,
  },
  goCartLeft:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goCartText:     { color: Colors.white, fontSize: 14, fontWeight: '600' },
  goCartRight:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  goCartTotal:    { color: Colors.skyBlue, fontSize: 14, fontWeight: '700' },
  emptyWrap:      { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText:      { fontSize: 14, color: Colors.gray500 },
});