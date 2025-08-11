import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleWishlist, clearWishlist } from "../../features/wishlist/WishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";

function formatUZS(n: number) {
  return `${n.toLocaleString("ru-RU")} сум`;
}

export default function WishlistPage() {
  const ids = useAppSelector((s) => s.wishlist.ids);
  const { list: allProducts } = useAppSelector((s) => s.products);
  const dispatch = useAppDispatch();

  const list = allProducts.filter((p) => ids.includes(p.id));

  const addAllToCart = () => {
    list.forEach((p) => dispatch(addToCart(p)));
  };

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-6">
      {/* Top bar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Sevimlilar</h1>
          <div className="text-sm text-zinc-500">
            Tanlangan: <span className="font-semibold text-violet-700">{list.length}</span> ta
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {list.length > 0 && (
            <>
              <button
                onClick={addAllToCart}
                className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:brightness-95"
              >
                Hammasini savatga qo‘shish
              </button>
              <button
                onClick={() => dispatch(clearWishlist())}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Empty state */}
      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
          <div className="text-lg font-semibold text-zinc-800">Wishlist bo‘sh</div>
          <p className="mt-1 text-zinc-500">Sevimli mahsulotlarni qo‘shib boring.</p>
          <Link
            to="/"
            className="mt-4 inline-flex rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:brightness-95"
          >
            Mahsulotlarga qaytish
          </Link>
        </div>
      ) : (
        // Grid
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {list.map((p) => (
            <li
              key={p.id}
              className="relative flex flex-col rounded-3xl bg-white p-3 shadow-sm ring-1 ring-zinc-200"
            >
              {/* Heart remove */}
              <button
                aria-label="remove from wishlist"
                onClick={() => dispatch(toggleWishlist(p.id))}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-violet-600 shadow ring-1 ring-zinc-200"
                title="Sevimlilardan olib tashlash"
              >
                ♥
              </button>

              {/* Image */}
              <div className="overflow-hidden rounded-2xl border border-zinc-100">
                <div className="grid aspect-[3/4] place-items-center bg-white">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-xs text-zinc-400">No image</div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mt-2 flex flex-1 flex-col">
                <div className="line-clamp-2 min-h-[40px] text-[14px] text-zinc-900">{p.title}</div>

                <div className="mt-2">
                  <div className="text-[20px] font-extrabold text-violet-700 leading-none">
                    {formatUZS(p.price)}
                  </div>
                  {p.oldPrice && p.oldPrice > p.price && (
                    <div className="mt-0.5 text-[13px] text-zinc-400 line-through">
                      {formatUZS(p.oldPrice)}
                    </div>
                  )}
                </div>

                <div className="mt-auto" />
              </div>

              {/* Actions */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => dispatch(addToCart(p))}
                  className="col-span-2 rounded-2xl bg-violet-600 py-2.5 text-center text-sm font-bold text-white hover:brightness-95 sm:col-span-1"
                >
                  В корзину
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist(p.id))}
                  className="col-span-2 rounded-2xl border border-zinc-300 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 sm:col-span-1"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
