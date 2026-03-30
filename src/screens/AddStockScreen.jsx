// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Animated, TextInput, KeyboardAvoidingView, Platform,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Colors from '../theme/colors';

// // ── Input field ───────────────────────────────
// const InputField = ({ label, placeholder, value, onChangeText, keyboardType = 'default', icon }) => (
//   <View style={styles.inputGroup}>
//     <Text style={styles.inputLabel}>{label}</Text>
//     <View style={styles.inputWrap}>
//       {icon && <Ionicons name={icon} size={16} color={Colors.gray500} style={styles.inputIcon} />}
//       <TextInput
//         style={[styles.input, icon && { paddingLeft: 36 }]}
//         placeholder={placeholder}
//         placeholderTextColor={Colors.gray500}
//         value={value}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//       />
//     </View>
//   </View>
// );

// // ── Add Stock screen ──────────────────────────
// export default function AddStockScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   const [name,      setName]      = useState('');
//   const [qty,       setQty]       = useState('');
//   const [buyPrice,  setBuyPrice]  = useState('');
//   const [sellPrice, setSellPrice] = useState('');

//   // computed profit
//   const profit = (parseFloat(sellPrice) || 0) - (parseFloat(buyPrice) || 0);
//   const hasProfit = buyPrice !== '' && sellPrice !== '';

//   // animations
//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-40)).current;
//   const formFade    = useRef(new Animated.Value(0)).current;
//   const formSlide   = useRef(new Animated.Value(30)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
//       Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
//       Animated.timing(formFade,    { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
//       Animated.timing(formSlide,   { toValue: 0, duration: 500, delay: 150, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   const handleSave = () => {
//     if (!name || !qty || !buyPrice || !sellPrice) {
//       alert('Please fill all fields');
//       return;
//     }
//     // TODO: save to SQLite
//     console.log({ name, qty, buyPrice, sellPrice });
//     navigation.goBack();
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <View style={[styles.container, { paddingTop: insets.top }]}>

//         {/* Header */}
//         <Animated.View style={[
//           styles.header,
//           { opacity: headerFade, transform: [{ translateY: headerSlide }] },
//         ]}>
//           <TouchableOpacity
//             style={styles.backBtn}
//             onPress={() => navigation.goBack()}
//             activeOpacity={0.8}
//           >
//             <Ionicons name="arrow-back" size={20} color={Colors.white} />
//           </TouchableOpacity>
//           <View style={{ flex: 1, marginLeft: 12 }}>
//             <Text style={styles.headerTitle}>Add medicine</Text>
//             <Text style={styles.headerSub}>Enter tablet by tablet</Text>
//           </View>
//         </Animated.View>

//         <ScrollView
//           style={styles.scroll}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Animated.View style={[
//             styles.formCard,
//             { opacity: formFade, transform: [{ translateY: formSlide }] },
//           ]}>

//             {/* Medicine name */}
//             <InputField
//               label="Medicine name"
//               placeholder="e.g. Panadol 500mg"
//               value={name}
//               onChangeText={setName}
//               icon="medkit-outline"
//             />

//             {/* Quantity */}
//             <InputField
//               label="Quantity (tablets)"
//               placeholder="e.g. 100"
//               value={qty}
//               onChangeText={setQty}
//               keyboardType="numeric"
//               icon="layers-outline"
//             />

//             {/* Divider */}
//             <View style={styles.divider} />
//             <Text style={styles.dividerLabel}>Pricing</Text>

//             {/* Buy price */}
//             <InputField
//               label="Purchase price per tablet (Rs)"
//               placeholder="e.g. 12"
//               value={buyPrice}
//               onChangeText={setBuyPrice}
//               keyboardType="numeric"
//               icon="arrow-down-circle-outline"
//             />

//             {/* Sell price */}
//             <InputField
//               label="Sell price per tablet (Rs)"
//               placeholder="e.g. 15"
//               value={sellPrice}
//               onChangeText={setSellPrice}
//               keyboardType="numeric"
//               icon="arrow-up-circle-outline"
//             />

//             {/* Profit preview */}
//             {hasProfit && (
//               <Animated.View style={[
//                 styles.profitBox,
//                 { backgroundColor: profit >= 0 ? Colors.successBg : Colors.dangerBg },
//               ]}>
//                 <Ionicons
//                   name={profit >= 0 ? 'trending-up' : 'trending-down'}
//                   size={18}
//                   color={profit >= 0 ? Colors.successGreen : Colors.dangerRed}
//                 />
//                 <View>
//                   <Text style={[styles.profitLabel, {
//                     color: profit >= 0 ? Colors.successText : Colors.dangerText
//                   }]}>
//                     Profit per tablet
//                   </Text>
//                   <Text style={[styles.profitValue, {
//                     color: profit >= 0 ? Colors.successGreen : Colors.dangerRed
//                   }]}>
//                     Rs {profit.toFixed(2)}
//                   </Text>
//                 </View>
//               </Animated.View>
//             )}

//           </Animated.View>

//           {/* Buttons */}
//           <View style={styles.btnRow}>
//             <TouchableOpacity
//               style={styles.cancelBtn}
//               onPress={() => navigation.goBack()}
//               activeOpacity={0.75}
//             >
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.saveBtn,
//                 { opacity: (!name || !qty || !buyPrice || !sellPrice) ? 0.5 : 1 }
//               ]}
//               onPress={handleSave}
//               activeOpacity={0.8}
//             >
//               <Ionicons name="checkmark" size={18} color={Colors.white} />
//               <Text style={styles.saveBtnText}>Save to stock</Text>
//             </TouchableOpacity>
//           </View>

//         </ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// // ── Styles ────────────────────────────────────
// const styles = StyleSheet.create({
//   container:      { flex: 1, backgroundColor: Colors.gray50 },

//   header:         {
//     backgroundColor: Colors.darkBlue,
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   backBtn:        {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.12)',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   headerTitle:    { color: Colors.white, fontSize: 17, fontWeight: '600' },
//   headerSub:      { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 1 },

//   scroll:         { flex: 1 },
//   scrollContent:  { padding: 16, paddingBottom: 40, gap: 14 },

//   formCard:       {
//     backgroundColor: Colors.white,
//     borderRadius: 14,
//     padding: 16,
//     borderWidth: 0.5,
//     borderColor: Colors.gray200,
//     gap: 14,
//   },

//   inputGroup:     { gap: 6 },
//   inputLabel:     { fontSize: 12, fontWeight: '500', color: Colors.gray700 },
//   inputWrap:      { position: 'relative', justifyContent: 'center' },
//   inputIcon:      { position: 'absolute', left: 11, zIndex: 1 },
//   input:          {
//     backgroundColor: Colors.gray50,
//     borderWidth: 0.5,
//     borderColor: Colors.gray200,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 11,
//     fontSize: 14,
//     color: Colors.black,
//   },

//   divider:        { height: 0.5, backgroundColor: Colors.gray200 },
//   dividerLabel:   {
//     fontSize: 11, fontWeight: '600',
//     color: Colors.gray500,
//     letterSpacing: 0.5,
//     textTransform: 'uppercase',
//     marginTop: -6,
//   },

//   profitBox:      {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     padding: 12,
//     borderRadius: 10,
//   },
//   profitLabel:    { fontSize: 11, fontWeight: '500' },
//   profitValue:    { fontSize: 18, fontWeight: '700', marginTop: 2 },

//   btnRow:         { flexDirection: 'row', gap: 10 },
//   cancelBtn:      {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 12,
//     borderWidth: 0.5,
//     borderColor: Colors.gray300,
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//   },
//   cancelBtnText:  { fontSize: 14, color: Colors.gray700, fontWeight: '500' },
//   saveBtn:        {
//     flex: 2,
//     paddingVertical: 14,
//     borderRadius: 12,
//     backgroundColor: Colors.darkBlue,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//   },
//   saveBtnText:    { fontSize: 14, color: Colors.white, fontWeight: '600' },
// });


























// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Animated, TextInput,
//   KeyboardAvoidingView, Platform, Alert,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Colors from '../theme/colors';
// import { addMedicine } from '../database/queries';

// // ── Input field ───────────────────────────────
// const InputField = ({ label, placeholder, value, onChangeText, keyboardType = 'default', icon }) => (
//   <View style={styles.inputGroup}>
//     <Text style={styles.inputLabel}>{label}</Text>
//     <View style={styles.inputWrap}>
//       {icon && (
//         <Ionicons name={icon} size={16} color={Colors.gray500} style={styles.inputIcon} />
//       )}
//       <TextInput
//         style={[styles.input, icon && { paddingLeft: 38 }]}
//         placeholder={placeholder}
//         placeholderTextColor={Colors.gray500}
//         value={value}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//       />
//     </View>
//   </View>
// );

// // ── Add Stock screen ──────────────────────────
// export default function AddStockScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   const [name,      setName]      = useState('');
//   const [qty,       setQty]       = useState('');
//   const [buyPrice,  setBuyPrice]  = useState('');
//   const [sellPrice, setSellPrice] = useState('');
//   const [saving,    setSaving]    = useState(false);

//   const profit    = (parseFloat(sellPrice) || 0) - (parseFloat(buyPrice) || 0);
//   const hasProfit = buyPrice !== '' && sellPrice !== '';
//   const isValid   = name.trim() && qty && buyPrice && sellPrice;

//   // animations
//   const headerFade  = useRef(new Animated.Value(0)).current;
//   const headerSlide = useRef(new Animated.Value(-40)).current;
//   const formFade    = useRef(new Animated.Value(0)).current;
//   const formSlide   = useRef(new Animated.Value(30)).current;
//   const profitFade  = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
//       Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
//       Animated.timing(formFade,    { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
//       Animated.timing(formSlide,   { toValue: 0, duration: 500, delay: 150, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   // animate profit box when both prices entered
//   useEffect(() => {
//     Animated.timing(profitFade, {
//       toValue: hasProfit ? 1 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [hasProfit]);

//   const handleSave = async () => {

//     console.log('Platform:', Platform.OS);
// console.log('DB insert starting...');
// console.log('DB insert done');
//     // validation
//     if (!name.trim()) {
//       Alert.alert('Error', 'Please enter medicine name');
//       return;
//     }
//     if (!qty || parseInt(qty) <= 0) {
//       Alert.alert('Error', 'Please enter a valid quantity');
//       return;
//     }
//     if (!buyPrice || parseFloat(buyPrice) <= 0) {
//       Alert.alert('Error', 'Please enter a valid purchase price');
//       return;
//     }
//     if (!sellPrice || parseFloat(sellPrice) <= 0) {
//       Alert.alert('Error', 'Please enter a valid sell price');
//       return;
//     }
//     if (parseFloat(sellPrice) < parseFloat(buyPrice)) {
//       Alert.alert(
//         'Warning',
//         'Sell price is less than buy price. You will be selling at a loss. Continue?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Continue', onPress: () => saveToDb() },
//         ]
//       );
//       return;
//     }
//     await saveToDb();
//   };

//   const saveToDb = async () => {
//     try {
//       setSaving(true);
//       await addMedicine({
//         name:       name.trim(),
//         qty:        parseInt(qty),
//         buy_price:  parseFloat(buyPrice),
//         sell_price: parseFloat(sellPrice),
//       });

//       // success animation then go back
//       Alert.alert(
//         'Success',
//         `${name.trim()} added to stock!`,
//         [{ text: 'OK', onPress: () => navigation.goBack() }]
//       );

//       // reset form
//       setName('');
//       setQty('');
//       setBuyPrice('');
//       setSellPrice('');

//     } catch (err) {
//       console.error('Save medicine error:', err);
//       Alert.alert('Error', 'Failed to save medicine. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <View style={[styles.container, { paddingTop: insets.top }]}>

//         {/* Header */}
//         <Animated.View style={[
//           styles.header,
//           { opacity: headerFade, transform: [{ translateY: headerSlide }] },
//         ]}>
//           <TouchableOpacity
//             style={styles.backBtn}
//             onPress={() => navigation.goBack()}
//             activeOpacity={0.8}
//           >
//             <Ionicons name="arrow-back" size={20} color={Colors.white} />
//           </TouchableOpacity>
//           <View style={{ flex: 1, marginLeft: 12 }}>
//             <Text style={styles.headerTitle}>Add medicine</Text>
//             <Text style={styles.headerSub}>Entered one by one per tablet</Text>
//           </View>
//         </Animated.View>

//         <ScrollView
//           style={styles.scroll}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Animated.View style={[
//             styles.formCard,
//             { opacity: formFade, transform: [{ translateY: formSlide }] },
//           ]}>

//             {/* Medicine name */}
//             <InputField
//               label="Medicine name"
//               placeholder="e.g. Panadol 500mg"
//               value={name}
//               onChangeText={setName}
//               icon="medkit-outline"
//             />

//             {/* Quantity */}
//             <InputField
//               label="Quantity (tablets)"
//               placeholder="e.g. 100"
//               value={qty}
//               onChangeText={setQty}
//               keyboardType="numeric"
//               icon="layers-outline"
//             />

//             {/* Divider */}
//             <View style={styles.divider} />
//             <Text style={styles.dividerLabel}>Pricing per tablet</Text>

//             {/* Buy price */}
//             <InputField
//               label="Purchase price (Rs)"
//               placeholder="e.g. 12"
//               value={buyPrice}
//               onChangeText={setBuyPrice}
//               keyboardType="numeric"
//               icon="arrow-down-circle-outline"
//             />

//             {/* Sell price */}
//             <InputField
//               label="Sell price (Rs)"
//               placeholder="e.g. 15"
//               value={sellPrice}
//               onChangeText={setSellPrice}
//               keyboardType="numeric"
//               icon="arrow-up-circle-outline"
//             />

//             {/* Profit preview */}
//             <Animated.View style={{ opacity: profitFade }}>
//               {hasProfit && (
//                 <View style={[
//                   styles.profitBox,
//                   { backgroundColor: profit >= 0 ? Colors.successBg : Colors.dangerBg },
//                 ]}>
//                   <Ionicons
//                     name={profit >= 0 ? 'trending-up' : 'trending-down'}
//                     size={20}
//                     color={profit >= 0 ? Colors.successGreen : Colors.dangerRed}
//                   />
//                   <View>
//                     <Text style={[styles.profitLabel, {
//                       color: profit >= 0 ? Colors.successText : Colors.dangerText,
//                     }]}>
//                       {profit >= 0 ? 'Profit per tablet' : 'Loss per tablet'}
//                     </Text>
//                     <Text style={[styles.profitValue, {
//                       color: profit >= 0 ? Colors.successGreen : Colors.dangerRed,
//                     }]}>
//                       Rs {Math.abs(profit).toFixed(2)}
//                     </Text>
//                   </View>
//                   {qty !== '' && (
//                     <View style={styles.totalProfitWrap}>
//                       <Text style={[styles.totalProfitLabel, {
//                         color: profit >= 0 ? Colors.successText : Colors.dangerText,
//                       }]}>
//                         Total {profit >= 0 ? 'profit' : 'loss'}
//                       </Text>
//                       <Text style={[styles.totalProfitValue, {
//                         color: profit >= 0 ? Colors.successGreen : Colors.dangerRed,
//                       }]}>
//                         Rs {Math.abs(profit * parseInt(qty || 0)).toFixed(0)}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//               )}
//             </Animated.View>

//           </Animated.View>

//           {/* Buttons */}
//           <View style={styles.btnRow}>
//             <TouchableOpacity
//               style={styles.cancelBtn}
//               onPress={() => navigation.goBack()}
//               activeOpacity={0.75}
//             >
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.saveBtn, (!isValid || saving) && { opacity: 0.5 }]}
//               onPress={handleSave}
//               disabled={!isValid || saving}
//               activeOpacity={0.8}
//             >
//               {saving ? (
//                 <Text style={styles.saveBtnText}>Saving...</Text>
//               ) : (
//                 <>
//                   <Ionicons name="checkmark" size={18} color={Colors.white} />
//                   <Text style={styles.saveBtnText}>Save to stock</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>

//         </ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// // ── Styles ────────────────────────────────────
// const styles = StyleSheet.create({
//   container:        { flex: 1, backgroundColor: Colors.gray50 },

//   header:           {
//     backgroundColor: Colors.darkBlue,
//     paddingHorizontal: 16,
//     paddingTop: 12, paddingBottom: 16,
//     flexDirection: 'row', alignItems: 'center',
//   },
//   backBtn:          {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.12)',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   headerTitle:      { color: Colors.white, fontSize: 17, fontWeight: '600' },
//   headerSub:        { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 1 },

//   scroll:           { flex: 1 },
//   scrollContent:    { padding: 16, paddingBottom: 40, gap: 14 },

//   formCard:         {
//     backgroundColor: Colors.white,
//     borderRadius: 14, padding: 16,
//     borderWidth: 0.5, borderColor: Colors.gray200,
//     gap: 14,
//   },

//   inputGroup:       { gap: 6 },
//   inputLabel:       { fontSize: 12, fontWeight: '500', color: Colors.gray700 },
//   inputWrap:        { position: 'relative', justifyContent: 'center' },
//   inputIcon:        { position: 'absolute', left: 11, zIndex: 1 },
//   input:            {
//     backgroundColor: Colors.gray50,
//     borderWidth: 0.5, borderColor: Colors.gray200,
//     borderRadius: 10,
//     paddingHorizontal: 12, paddingVertical: 11,
//     fontSize: 14, color: Colors.black,
//   },

//   divider:          { height: 0.5, backgroundColor: Colors.gray200 },
//   dividerLabel:     {
//     fontSize: 11, fontWeight: '600',
//     color: Colors.gray500,
//     letterSpacing: 0.5,
//     textTransform: 'uppercase',
//     marginTop: -4,
//   },

//   profitBox:        {
//     flexDirection: 'row', alignItems: 'center',
//     gap: 12, padding: 12, borderRadius: 10,
//   },
//   profitLabel:      { fontSize: 11, fontWeight: '500' },
//   profitValue:      { fontSize: 20, fontWeight: '700', marginTop: 2 },
//   totalProfitWrap:  { marginLeft: 'auto', alignItems: 'flex-end' },
//   totalProfitLabel: { fontSize: 10, fontWeight: '500' },
//   totalProfitValue: { fontSize: 14, fontWeight: '700', marginTop: 2 },

//   btnRow:           { flexDirection: 'row', gap: 10 },
//   cancelBtn:        {
//     flex: 1, paddingVertical: 14,
//     borderRadius: 12,
//     borderWidth: 0.5, borderColor: Colors.gray300,
//     alignItems: 'center', backgroundColor: Colors.white,
//   },
//   cancelBtnText:    { fontSize: 14, color: Colors.gray700, fontWeight: '500' },
//   saveBtn:          {
//     flex: 2, paddingVertical: 14,
//     borderRadius: 12,
//     backgroundColor: Colors.darkBlue,
//     flexDirection: 'row',
//     alignItems: 'center', justifyContent: 'center', gap: 8,
//   },
//   saveBtnText:      { fontSize: 14, color: Colors.white, fontWeight: '600' },
// });

























import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Animated, TextInput,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../theme/colors';
import { addMedicine } from '../database/queries';

// ── Input field ───────────────────────────────
const InputField = ({ label, placeholder, value, onChangeText, keyboardType = 'default', icon }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrap}>
      {icon && (
        <Ionicons name={icon} size={16} color={Colors.gray500} style={styles.inputIcon} />
      )}
      <TextInput
        style={[styles.input, icon && { paddingLeft: 38 }]}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray500}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

// ── Add Stock screen ──────────────────────────
export default function AddStockScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [name,      setName]      = useState('');
  const [qty,       setQty]       = useState('');
  const [buyPrice,  setBuyPrice]  = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [saving,    setSaving]    = useState(false);

  const profit    = (parseFloat(sellPrice) || 0) - (parseFloat(buyPrice) || 0);
  const hasProfit = buyPrice !== '' && sellPrice !== '';
  const isValid   = name.trim() && qty && buyPrice && sellPrice;

  // animations
  const headerFade  = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-40)).current;
  const formFade    = useRef(new Animated.Value(0)).current;
  const formSlide   = useRef(new Animated.Value(30)).current;
  const profitFade  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade,  { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(formFade,    { toValue: 1, duration: 500, delay: 150, useNativeDriver: true }),
      Animated.timing(formSlide,   { toValue: 0, duration: 500, delay: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.timing(profitFade, {
      toValue: hasProfit ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [hasProfit]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter medicine name');
      return;
    }
    if (!qty || parseInt(qty) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }
    if (!buyPrice || parseFloat(buyPrice) <= 0) {
      Alert.alert('Error', 'Please enter a valid purchase price');
      return;
    }
    if (!sellPrice || parseFloat(sellPrice) <= 0) {
      Alert.alert('Error', 'Please enter a valid sell price');
      return;
    }
    if (parseFloat(sellPrice) < parseFloat(buyPrice)) {
      Alert.alert(
        'Warning',
        'Sell price is less than buy price. You will be selling at a loss. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: () => saveToDb() },
        ]
      );
      return;
    }
    await saveToDb();
  };

  const saveToDb = async () => {
    const savedName = name.trim();
    try {
      setSaving(true);
      await addMedicine({
        name:       savedName,
        qty:        parseInt(qty),
        buy_price:  parseFloat(buyPrice),
        sell_price: parseFloat(sellPrice),
      });

      // reset form
      setName('');
      setQty('');
      setBuyPrice('');
      setSellPrice('');

      // web: Alert.alert callbacks are unreliable — use native alert + direct navigate
      if (Platform.OS === 'web') {
        alert(`✓ ${savedName} added to stock!`);
        navigation.goBack();
      } else {
        Alert.alert(
          'Success',
          `${savedName} added to stock!`,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }

    } catch (err) {
      console.error('Save medicine error:', err);
      Alert.alert('Error', 'Failed to save medicine. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>

        {/* Header */}
        <Animated.View style={[
          styles.header,
          { opacity: headerFade, transform: [{ translateY: headerSlide }] },
        ]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Add medicine</Text>
            <Text style={styles.headerSub}>Entered one by one per tablet</Text>
          </View>
        </Animated.View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[
            styles.formCard,
            { opacity: formFade, transform: [{ translateY: formSlide }] },
          ]}>

            <InputField
              label="Medicine name"
              placeholder="e.g. Panadol 500mg"
              value={name}
              onChangeText={setName}
              icon="medkit-outline"
            />

            <InputField
              label="Quantity (tablets)"
              placeholder="e.g. 100"
              value={qty}
              onChangeText={setQty}
              keyboardType="numeric"
              icon="layers-outline"
            />

            <View style={styles.divider} />
            <Text style={styles.dividerLabel}>Pricing per tablet</Text>

            <InputField
              label="Purchase price (Rs)"
              placeholder="e.g. 12"
              value={buyPrice}
              onChangeText={setBuyPrice}
              keyboardType="numeric"
              icon="arrow-down-circle-outline"
            />

            <InputField
              label="Sell price (Rs)"
              placeholder="e.g. 15"
              value={sellPrice}
              onChangeText={setSellPrice}
              keyboardType="numeric"
              icon="arrow-up-circle-outline"
            />

            {/* Profit preview */}
            <Animated.View style={{ opacity: profitFade }}>
              {hasProfit && (
                <View style={[
                  styles.profitBox,
                  { backgroundColor: profit >= 0 ? Colors.successBg : Colors.dangerBg },
                ]}>
                  <Ionicons
                    name={profit >= 0 ? 'trending-up' : 'trending-down'}
                    size={20}
                    color={profit >= 0 ? Colors.successGreen : Colors.dangerRed}
                  />
                  <View>
                    <Text style={[styles.profitLabel, {
                      color: profit >= 0 ? Colors.successText : Colors.dangerText,
                    }]}>
                      {profit >= 0 ? 'Profit per tablet' : 'Loss per tablet'}
                    </Text>
                    <Text style={[styles.profitValue, {
                      color: profit >= 0 ? Colors.successGreen : Colors.dangerRed,
                    }]}>
                      Rs {Math.abs(profit).toFixed(2)}
                    </Text>
                  </View>
                  {qty !== '' && (
                    <View style={styles.totalProfitWrap}>
                      <Text style={[styles.totalProfitLabel, {
                        color: profit >= 0 ? Colors.successText : Colors.dangerText,
                      }]}>
                        Total {profit >= 0 ? 'profit' : 'loss'}
                      </Text>
                      <Text style={[styles.totalProfitValue, {
                        color: profit >= 0 ? Colors.successGreen : Colors.dangerRed,
                      }]}>
                        Rs {Math.abs(profit * parseInt(qty || 0)).toFixed(0)}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </Animated.View>

          </Animated.View>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.75}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveBtn, (!isValid || saving) && { opacity: 0.5 }]}
              onPress={handleSave}
              disabled={!isValid || saving}
              activeOpacity={0.8}
            >
              {saving ? (
                <Text style={styles.saveBtnText}>Saving...</Text>
              ) : (
                <>
                  <Ionicons name="checkmark" size={18} color={Colors.white} />
                  <Text style={styles.saveBtnText}>Save to stock</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Styles ────────────────────────────────────
const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: Colors.gray50 },

  header:           {
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 16,
    paddingTop: 12, paddingBottom: 16,
    flexDirection: 'row', alignItems: 'center',
  },
  backBtn:          {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle:      { color: Colors.white, fontSize: 17, fontWeight: '600' },
  headerSub:        { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 1 },

  scroll:           { flex: 1 },
  scrollContent:    { padding: 16, paddingBottom: 40, gap: 14 },

  formCard:         {
    backgroundColor: Colors.white,
    borderRadius: 14, padding: 16,
    borderWidth: 0.5, borderColor: Colors.gray200,
    gap: 14,
  },

  inputGroup:       { gap: 6 },
  inputLabel:       { fontSize: 12, fontWeight: '500', color: Colors.gray700 },
  inputWrap:        { position: 'relative', justifyContent: 'center' },
  inputIcon:        { position: 'absolute', left: 11, zIndex: 1 },
  input:            {
    backgroundColor: Colors.gray50,
    borderWidth: 0.5, borderColor: Colors.gray200,
    borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 11,
    fontSize: 14, color: Colors.black,
  },

  divider:          { height: 0.5, backgroundColor: Colors.gray200 },
  dividerLabel:     {
    fontSize: 11, fontWeight: '600',
    color: Colors.gray500,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: -4,
  },

  profitBox:        {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, padding: 12, borderRadius: 10,
  },
  profitLabel:      { fontSize: 11, fontWeight: '500' },
  profitValue:      { fontSize: 20, fontWeight: '700', marginTop: 2 },
  totalProfitWrap:  { marginLeft: 'auto', alignItems: 'flex-end' },
  totalProfitLabel: { fontSize: 10, fontWeight: '500' },
  totalProfitValue: { fontSize: 14, fontWeight: '700', marginTop: 2 },

  btnRow:           { flexDirection: 'row', gap: 10 },
  cancelBtn:        {
    flex: 1, paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 0.5, borderColor: Colors.gray300,
    alignItems: 'center', backgroundColor: Colors.white,
  },
  cancelBtnText:    { fontSize: 14, color: Colors.gray700, fontWeight: '500' },
  saveBtn:          {
    flex: 2, paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.darkBlue,
    flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  saveBtnText:      { fontSize: 14, color: Colors.white, fontWeight: '600' },
});