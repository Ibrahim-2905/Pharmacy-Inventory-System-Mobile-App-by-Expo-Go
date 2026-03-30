import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Animated, TextInput,
  Alert, Modal, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../theme/colors';
import {
  getAllMedicines,
  deleteMedicine,
  updateMedicine,
} from '../database/queries';
import Footer from '../components/Footer';

// ── Web-safe confirm dialog ───────────────────
const confirmAction = (title, message) => {
  if (Platform.OS === 'web') {
    return window.confirm(`${title}\n\n${message}`);
  }
  return null; // native uses Alert.alert with callbacks
};

// ── Edit modal ────────────────────────────────
const EditModal = ({ visible, medicine, onClose, onSave }) => {
  const [name,      setName]      = useState('');
  const [qty,       setQty]       = useState('');
  const [buyPrice,  setBuyPrice]  = useState('');
  const [sellPrice, setSellPrice] = useState('');

  useEffect(() => {
    if (medicine) {
      setName(medicine.name);
      setQty(String(medicine.qty));
      setBuyPrice(String(medicine.buy_price));
      setSellPrice(String(medicine.sell_price));
    }
  }, [medicine]);

  const handleSave = () => {
    if (!name || !qty || !buyPrice || !sellPrice) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    onSave({
      id:         medicine.id,
      name:       name.trim(),
      qty:        parseInt(qty),
      buy_price:  parseFloat(buyPrice),
      sell_price: parseFloat(sellPrice),
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Edit medicine</Text>

          <View style={styles.modalInputGroup}>
            <Text style={styles.modalLabel}>Medicine name</Text>
            <TextInput
              style={styles.modalInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.gray500}
            />
          </View>

          <View style={styles.modalInputGroup}>
            <Text style={styles.modalLabel}>Quantity (tablets)</Text>
            <TextInput
              style={styles.modalInput}
              value={qty}
              onChangeText={setQty}
              keyboardType="numeric"
              placeholderTextColor={Colors.gray500}
            />
          </View>

          <View style={styles.modalRow2}>
            <View style={[styles.modalInputGroup, { flex: 1 }]}>
              <Text style={styles.modalLabel}>Buy price (Rs)</Text>
              <TextInput
                style={styles.modalInput}
                value={buyPrice}
                onChangeText={setBuyPrice}
                keyboardType="numeric"
                placeholderTextColor={Colors.gray500}
              />
            </View>
            <View style={[styles.modalInputGroup, { flex: 1 }]}>
              <Text style={styles.modalLabel}>Sell price (Rs)</Text>
              <TextInput
                style={styles.modalInput}
                value={sellPrice}
                onChangeText={setSellPrice}
                keyboardType="numeric"
                placeholderTextColor={Colors.gray500}
              />
            </View>
          </View>

          {buyPrice && sellPrice && (
            <View style={styles.profitPreview}>
              <Text style={styles.profitPreviewText}>
                Profit per tablet:
                <Text style={{ color: Colors.successGreen, fontWeight: '700' }}>
                  {' '}Rs {(parseFloat(sellPrice) - parseFloat(buyPrice)).toFixed(2)}
                </Text>
              </Text>
            </View>
          )}

          <View style={styles.modalBtns}>
            <TouchableOpacity style={styles.modalCancelBtn} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSave} activeOpacity={0.8}>
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ── Medicine row ──────────────────────────────
const MedicineRow = ({ item, delay, onEdit, onDelete }) => {
  const fade  = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,  { toValue: 1, duration: 350, delay, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 350, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  const profit = item.sell_price - item.buy_price;
  const isLow  = item.qty <= 10;

  return (
    <Animated.View style={[styles.medRow, { opacity: fade, transform: [{ translateY: slide }] }]}>
      <View style={styles.medLeft}>
        <View style={styles.medTopRow}>
          <Text style={styles.medName}>{item.name}</Text>
          <View style={[styles.badge, {
            backgroundColor: isLow ? Colors.dangerBg : Colors.successBg,
          }]}>
            <Text style={[styles.badgeText, {
              color: isLow ? Colors.dangerText : Colors.successText,
            }]}>
              {isLow ? 'Low' : 'OK'}
            </Text>
          </View>
        </View>

        <View style={styles.medDetails}>
          <Text style={styles.medDetail}>
            <Text style={styles.detailLabel}>Qty: </Text>
            <Text style={[styles.detailValue, { color: isLow ? Colors.dangerRed : Colors.black }]}>
              {item.qty} tablets
            </Text>
          </Text>
          <Text style={styles.medDot}>·</Text>
          <Text style={styles.medDetail}>
            <Text style={styles.detailLabel}>Buy: </Text>
            <Text style={styles.detailValue}>Rs {item.buy_price}</Text>
          </Text>
          <Text style={styles.medDot}>·</Text>
          <Text style={styles.medDetail}>
            <Text style={styles.detailLabel}>Sell: </Text>
            <Text style={styles.detailValue}>Rs {item.sell_price}</Text>
          </Text>
        </View>

        <Text style={styles.profitText}>
          Profit per tablet:
          <Text style={{ color: Colors.successGreen, fontWeight: '600' }}>
            {' '}Rs {profit.toFixed(2)}
          </Text>
        </Text>
      </View>

      <View style={styles.medActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onEdit(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil-outline" size={15} color={Colors.skyBlueDark} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => onDelete(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={15} color={Colors.dangerRed} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ── Stock screen ──────────────────────────────
export default function StockScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [medicines,    setMedicines]    = useState([]);
  const [search,       setSearch]       = useState('');
  const [loading,      setLoading]      = useState(true);
  const [editVisible,  setEditVisible]  = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const headerFade  = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade,  { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMedicines();
    }, [])
  );

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

  const doDelete = async (item) => {
    try {
      await deleteMedicine(item.id);
      await loadMedicines();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDelete = (item) => {
    if (Platform.OS === 'web') {
      // window.confirm is synchronous and works reliably on web
      const confirmed = window.confirm(
        `Delete medicine\n\nAre you sure you want to delete "${item.name}"?`
      );
      if (confirmed) {
        doDelete(item);
      }
    } else {
      // native Alert works fine on iOS/Android
      Alert.alert(
        'Delete medicine',
        `Are you sure you want to delete "${item.name}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => doDelete(item),
          },
        ]
      );
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditVisible(true);
  };

  const handleSaveEdit = async (updated) => {
    try {
      await updateMedicine(updated);
      setEditVisible(false);
      setSelectedItem(null);
      await loadMedicines();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowCount     = medicines.filter(m => m.qty <= 10).length;
  const healthyCount = medicines.filter(m => m.qty > 10).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* Header */}
      <Animated.View style={[
        styles.header,
        { opacity: headerFade, transform: [{ translateY: headerSlide }] },
      ]}>
        <View>
          <Text style={styles.headerTitle}>Stock inventory</Text>
          <Text style={styles.headerSub}>{medicines.length} medicines total</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddStock')}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color={Colors.white} />
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={16} color={Colors.gray500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicine..."
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

      {/* Summary row */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryVal}>{medicines.length}</Text>
          <Text style={styles.summaryLbl}>Total</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryVal, { color: Colors.dangerRed }]}>{lowCount}</Text>
          <Text style={styles.summaryLbl}>Low stock</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryVal, { color: Colors.successGreen }]}>{healthyCount}</Text>
          <Text style={styles.summaryLbl}>Healthy</Text>
        </View>
      </View>

      {/* List */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Loading...</Text>
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Ionicons name="cube-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyText}>
              {medicines.length === 0 ? 'No medicines yet. Add one!' : 'No medicine found'}
            </Text>
            {medicines.length === 0 && (
              <TouchableOpacity
                style={styles.addFirstBtn}
                onPress={() => navigation.navigate('AddStock')}
                activeOpacity={0.8}
              >
                <Text style={styles.addFirstBtnText}>Add first medicine</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filtered.map((m, i) => (
            <MedicineRow
              key={m.id}
              item={m}
              delay={i * 60}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </ScrollView>

      {/* Edit modal */}
      <EditModal
        visible={editVisible}
        medicine={selectedItem}
        onClose={() => { setEditVisible(false); setSelectedItem(null); }}
        onSave={handleSaveEdit}
      />

      <Footer activeScreen="Stock" navigation={navigation} />
    </View>
  );
}

// ── Styles ────────────────────────────────────
const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: Colors.gray50 },
  header:          {
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 16,
    paddingTop: 12, paddingBottom: 14,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle:     { color: Colors.white, fontSize: 17, fontWeight: '600' },
  headerSub:       { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
  addBtn:          {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.skyBlueDark,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 20,
  },
  addBtnText:      { color: Colors.white, fontSize: 13, fontWeight: '500' },
  searchWrap:      { backgroundColor: Colors.darkBlue, paddingHorizontal: 14, paddingBottom: 12 },
  searchBox:       {
    backgroundColor: Colors.white,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9,
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  searchInput:     { flex: 1, fontSize: 13, color: Colors.black, padding: 0 },
  summaryRow:      {
    flexDirection: 'row',
    paddingHorizontal: 14, paddingVertical: 10, gap: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 0.5, borderBottomColor: Colors.gray200,
  },
  summaryCard:     {
    flex: 1, alignItems: 'center', paddingVertical: 6,
    backgroundColor: Colors.gray50, borderRadius: 8,
  },
  summaryVal:      { fontSize: 18, fontWeight: '600', color: Colors.darkBlue },
  summaryLbl:      { fontSize: 10, color: Colors.gray500, marginTop: 2 },
  scroll:          { flex: 1 },
  scrollContent:   { padding: 14, gap: 10, paddingBottom: 20 },
  medRow:          {
    backgroundColor: Colors.white,
    borderRadius: 12, padding: 13,
    borderWidth: 0.5, borderColor: Colors.gray200,
    flexDirection: 'row', alignItems: 'center',
  },
  medLeft:         { flex: 1 },
  medTopRow:       {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 6,
  },
  medName:         { fontSize: 14, fontWeight: '600', color: Colors.black, flex: 1 },
  medDetails:      {
    flexDirection: 'row', alignItems: 'center',
    flexWrap: 'wrap', gap: 4, marginBottom: 5,
  },
  medDetail:       { fontSize: 11 },
  detailLabel:     { color: Colors.gray500 },
  detailValue:     { color: Colors.black, fontWeight: '500' },
  medDot:          { color: Colors.gray300, fontSize: 11 },
  profitText:      { fontSize: 11, color: Colors.gray500 },
  badge:           { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText:       { fontSize: 10, fontWeight: '600' },
  medActions:      { flexDirection: 'column', gap: 6, marginLeft: 10 },
  actionBtn:       {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: Colors.skyBlueLight,
    alignItems: 'center', justifyContent: 'center',
  },
  deleteBtn:       { backgroundColor: Colors.dangerBg },
  emptyWrap:       { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText:       { fontSize: 14, color: Colors.gray500 },
  addFirstBtn:     {
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 12, marginTop: 4,
  },
  addFirstBtnText: { color: Colors.white, fontSize: 13, fontWeight: '600' },
  // modal
  modalOverlay:    {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center', justifyContent: 'center',
    padding: 20,
  },
  modalCard:       {
    backgroundColor: Colors.white,
    borderRadius: 16, padding: 20,
    width: '100%', gap: 12,
  },
  modalTitle:      { fontSize: 16, fontWeight: '700', color: Colors.black, marginBottom: 4 },
  modalInputGroup: { gap: 5 },
  modalLabel:      { fontSize: 12, fontWeight: '500', color: Colors.gray700 },
  modalInput:      {
    backgroundColor: Colors.gray50,
    borderWidth: 0.5, borderColor: Colors.gray200,
    borderRadius: 10, paddingHorizontal: 12,
    paddingVertical: 10, fontSize: 14, color: Colors.black,
  },
  modalRow2:       { flexDirection: 'row', gap: 10 },
  profitPreview:   { backgroundColor: Colors.successBg, borderRadius: 8, padding: 10 },
  profitPreviewText: { fontSize: 12, color: Colors.successText },
  modalBtns:       { flexDirection: 'row', gap: 10, marginTop: 4 },
  modalCancelBtn:  {
    flex: 1, paddingVertical: 12,
    borderRadius: 10, borderWidth: 0.5,
    borderColor: Colors.gray300, alignItems: 'center',
  },
  modalCancelText: { fontSize: 13, color: Colors.gray700, fontWeight: '500' },
  modalSaveBtn:    {
    flex: 2, paddingVertical: 12,
    borderRadius: 10, backgroundColor: Colors.darkBlue,
    alignItems: 'center',
  },
  modalSaveText:   { fontSize: 13, color: Colors.white, fontWeight: '600' },
});