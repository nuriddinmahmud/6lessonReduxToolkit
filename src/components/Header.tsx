import { NavLink, Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function Header() {
  const cartCount = useAppSelector(s => s.cart.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useAppSelector(s => s.wishlist.ids.length);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-4 py-3">
        {/* brand */}
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
          <span className="text-xl font-black text-violet-700 group-hover:opacity-90">
            Uzum
          </span>
        </Link>

        {/* nav icons */}
        <nav className="ml-auto flex items-center gap-2 sm:gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hidden sm:inline-block rounded-xl px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-zinc-600 hover:text-violet-700"
              }`
            }
          >
            H
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `relative rounded-xl px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-zinc-600 hover:text-violet-700"
              }`
            }
          >
            ❤️
            {wishCount > 0 && (
              <span className="ml-2 rounded-full bg-rose-500 px-2 text-xs font-bold text-white">
                {wishCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative rounded-xl px-3 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-zinc-600 hover:text-violet-700"
              }`
            }
          >
            🛒
            {cartCount > 0 && (
              <span className="ml-2 rounded-full bg-emerald-600 px-2 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
