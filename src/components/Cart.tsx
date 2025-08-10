import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import type { Product, Badge } from "../features/products/types";

const badgeStyle: Record<Badge, string> = {
  guarantee: "bg-pink-100 text-pink-700",
  super: "bg-emerald-100 text-emerald-700",
  sale: "bg-yellow-100 text-yellow-700",
};

type Props = { product?: Product };

export default function ProductCard({ product }: Props) {
  if (!product) return null;

  const dispatch = useAppDispatch();
  const wished = useAppSelector((s) => s.wishlist.ids.includes(product.id));

  return (
    <div className="relative h-full rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200 p-3 flex flex-col">
      {/* heart */}
      <button
        aria-label="wishlist"
        onClick={() => dispatch(toggleWishlist(product.id))}
        className={`absolute right-3 top-3 grid place-items-center h-10 w-10 rounded-full bg-white shadow ring-1 ring-zinc-200 ${
          wished ? "text-violet-600" : "text-zinc-400"
        }`}
      >
        ♥
      </button>

      {/* image */}
      <div className="rounded-2xl overflow-hidden">
        <div className="aspect-[3/4] grid place-items-center bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      {/* middle content grows (flex-1) */}
      <div className="mt-2 flex-1 flex flex-col">
        {/* badges */}
        <div className="flex flex-wrap gap-2">
          {product.badges?.map((b) => (
            <span
              key={b}
              className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${badgeStyle[b]}`}
            >
              {b === "guarantee"
                ? "Гарантия низкой цены"
                : b === "super"
                ? "Суперцена"
                : "Распродажа"}
            </span>
          ))}
        </div>

        {/* price */}
        <div className="mt-3 space-y-1">
          <div className="text-[20px] font-extrabold text-violet-700 leading-none">
            {product.price.toLocaleString("uz-UZ")}{" "}
            <span className="font-bold">сум</span>
          </div>
          {product.oldPrice && (
            <div className="text-zinc-400 line-through text-[14px] -mt-0.5">
              {product.oldPrice.toLocaleString("uz-UZ")}
            </div>
          )}
          {product.perMonth && (
            <div className="inline-flex w-max rounded-md bg-yellow-300 px-2 py-1 text-[12px] font-bold">
              {product.perMonth.toLocaleString("uz-UZ")} сум/мес
            </div>
          )}
        </div>

        {/* title + rating */}
        <div className="mt-2">
          {/* min-h -> satrlar turlicha bo‘lsa ham tugма joyi siljimasin */}
          <div className="text-[14px] text-zinc-900 min-h-[56px]">
            {product.title}
          </div>
          {product.rating && (
            <div className="mt-1 text-[13px] text-zinc-500">
              <span className="text-amber-500">★</span> {product.rating.toFixed(1)}
              {typeof product.reviewsCount === "number" && (
                <span className="text-zinc-400">
                  {" "}
                  ({product.reviewsCount} отзывов)
                </span>
              )}
            </div>
          )}
        </div>

        {/* spacer -> tugма pastga itariladi */}
        <div className="mt-auto" />
      </div>

      {/* buy button — har doim pastda */}
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-3 w-full rounded-2xl bg-violet-600 py-3 text-white text-[16px] font-bold hover:brightness-95"
      >
        В корзину
      </button>
    </div>
  );
}
