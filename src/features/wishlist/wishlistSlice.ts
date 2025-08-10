import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type WishlistState = { ids: string[] };

const persisted = (() => {
  try { return JSON.parse(localStorage.getItem("wishlist_v1") || "null"); }
  catch { return null; }
})();
const initialState: WishlistState = persisted ?? { ids: [] };
const save = (s: WishlistState) => localStorage.setItem("wishlist_v1", JSON.stringify(s));

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, { payload }: PayloadAction<string>) => {
      if (state.ids.includes(payload)) state.ids = state.ids.filter(id => id !== payload);
      else state.ids.push(payload);
      save(state);
    },
    clearWishlist: (state) => { state.ids = []; save(state); },
    setWishlist: (state, { payload }: PayloadAction<string[]>) => {
      state.ids = payload;
      save(state);
    },
  },
});

export const { toggleWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
