// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: []
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.name !== action.payload);
    }
  }
});

export const { addItemToCart, updateCartItemQuantity, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
