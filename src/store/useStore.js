import { create } from 'zustand';
import { Platform, Alert } from 'react-native';

// web-safe alert
const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const useStore = create((set, get) => ({

  // ── Medicines ──────────────────────────────
  medicines: [],
  setMedicines: (medicines) => set({ medicines }),

  // ── Cart ───────────────────────────────────
  cart: [],
  setCart: (cart) => set({ cart }),
  clearCart: () => set({ cart: [] }),

  addToCart: (medicine) => {
    const cart = get().cart;
    const existing = cart.find(i => i.id === medicine.id);

    if (existing) {
      // check stock before increasing
      if (existing.qty >= medicine.qty) {
        showAlert('Out of stock', `Only ${medicine.qty} tablets available for ${medicine.name}`);
        return;
      }
      set({
        cart: cart.map(i =>
          i.id === medicine.id ? { ...i, qty: i.qty + 1 } : i
        ),
      });
    } else {
      if (medicine.qty <= 0) {
        showAlert('Out of stock', `${medicine.name} is out of stock`);
        return;
      }
      set({ cart: [...cart, { ...medicine, qty: 1 }] });
    }
  },

  increaseQty: (id) => {
    const cart = get().cart;
    const item = cart.find(i => i.id === id);
    if (!item) return;

    // item.qty in cart vs item.qty in stock (stored as stock_qty)
    if (item.qty >= item.stock_qty) {
      showAlert('Out of stock', `Only ${item.stock_qty} tablets available for ${item.name}`);
      return;
    }

    set({
      cart: cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i),
    });
  },

  decreaseQty: (id) => {
    const cart = get().cart;
    const item = cart.find(i => i.id === id);
    if (item.qty === 1) {
      set({ cart: cart.filter(i => i.id !== id) });
    } else {
      set({ cart: cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i) });
    }
  },

  removeFromCart: (id) => set({
    cart: get().cart.filter(i => i.id !== id),
  }),

  // ── Dashboard stats ────────────────────────
  dashStats: {
    todaySales:  0,
    todayProfit: 0,
    totalStock:  0,
    lowStock:    0,
    billCount:   0,
  },
  setDashStats: (dashStats) => set({ dashStats }),

}));

export default useStore;