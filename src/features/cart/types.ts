import type { Product } from "../products/types";
export type CartItem = Product & { qty: number };
export type CartState = { items: CartItem[] };
