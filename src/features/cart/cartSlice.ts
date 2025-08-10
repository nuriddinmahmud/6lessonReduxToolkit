import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; 
import type { Product } from "../products/types";

type CartItem = Product & { qty: number };
type CartState = { items: CartItem[] };

const persisted = (() => {
  try { return JSON.parse(localStorage.getItem("cart_v1") || "null"); }
  catch { return null; }
})();
const initialState: CartState = persisted ?? { items: [] };
const save = (s: CartState) => localStorage.setItem("cart_v1", JSON.stringify(s));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<Product>) => {
      const f = state.items.find(i => i.id === payload.id);
      if (f) f.qty += 1;
      else state.items.push({ ...payload, qty: 1 });
      save(state);
    },
    removeFromCart: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== payload);
      save(state);
    },
    changeQty: (state, { payload }: PayloadAction<{ id: string; qty: number }>) => {
      const it = state.items.find(i => i.id === payload.id);
      if (it) it.qty = Math.max(1, payload.qty);
      save(state);
    },
    clearCart: (state) => { state.items = []; save(state); },
  },
});

export const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
