import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type WishlistState = { ids: string[] };
const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, { payload }: PayloadAction<string>) => {
      state.ids = state.ids.includes(payload)
        ? state.ids.filter((id) => id !== payload)
        : [...state.ids, payload];
    },
    clearWishlist: (state) => {
      state.ids = [];
    },
    setWishlist: (state, { payload }: PayloadAction<string[]>) => {
      state.ids = payload;
    },
  },
});

export const { toggleWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
