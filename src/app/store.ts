import { configureStore } from "@reduxjs/toolkit";
import cart from "../features/cart/cartSlice";
import wishlist from "../features/wishlist/wishlistSlice";
import products from "../features/products/productsSlice";

export const store = configureStore({
  reducer: { cart, wishlist, products },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
