import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('persistentCart');
    if (serializedCart === null) {
      return { items: [], total: 0 };
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Failed to load cart from localStorage", e);
    return { items: [], total: 0 };
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('persistentCart');
    },
  },
});

// Helper function to save cart to localStorage
const saveCartToStorage = (cartState) => {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem('persistentCart', serializedCart);
  } catch (e) {
    console.warn("Failed to save cart to localStorage", e);
  }
};

const calculateTotal = (items) => {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;