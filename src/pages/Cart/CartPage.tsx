import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeQty, removeFromCart, clearCart } from "../../features/cart/cartSlice";

function formatUZS(n: number) {
  return `${n.toLocaleString("ru-RU")} сум`;
}

export default function CartPage() {
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();

  const sumQty = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((a, i) => a + i.price * i.qty, 0), [items]);
  // "Tejamkorlik" – oldPrice mavjud bo'lsa ko'rsatamiz
  const savings = useMemo(
    () =>
      items.reduce((a, i) => {
        const diff = (Math.max(i.oldPrice ?? i.price, i.price) - i.price) * i.qty;
        return a + Math.max(0, diff);
      }, 0),
    [items]
  );
  const totalWithoutCard = total + savings;

  return (
    <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_360px]">
      {/* LEFT: items */}
      <section className="space-y-4">
        {/* top bar */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">
              Ваша корзина,{" "}
              <span className="text-violet-700">{sumQty}</span> товар
            </h1>

            <div className="hidden items-center gap-3 sm:flex">
              <label className="inline-flex select-none items-center gap-2 text-[15px] text-zinc-700">
                <input type="checkbox" className="h-5 w-5 accent-violet-600" defaultChecked />
                Снять все
              </label>

              <div className="text-[13px] text-zinc-500">
                Ближайшая дата доставки:{" "}
                <span className="rounded-md bg-violet-50 px-2 py-0.5 font-semibold text-violet-700">
                  12 августа
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* list */}
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.id} className="rounded-2xl border border-zinc-200 bg-white p-4">
              {/* "Доставка Uzum Market" satri */}
              <div className="mb-3 text-[13px] text-zinc-500">
                Доставка Uzum Market
                <div className="mt-1 text-[16px] font-extrabold text-zinc-900">
                  Доставим с{" "}
                  <span className="rounded-md bg-violet-50 px-1.5 py-0.5 text-violet-700">
                    12 августа
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-[24px_96px_1fr_auto] items-center gap-3 sm:grid-cols-[24px_120px_1fr_auto]">
                {/* checkbox */}
                <div className="flex items-center justify-center">
                  <input type="checkbox" className="h-5 w-5 accent-violet-600" defaultChecked />
                </div>

                {/* image */}
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
                  <div className="grid aspect-square place-items-center">
                    {i.image ? (
                      <img src={i.image} alt={i.title} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <div className="text-xs text-zinc-400">No image</div>
                    )}
                  </div>
                </div>

                {/* title + seller + badges */}
                <div className="min-w-0">
                  <div className="mb-1 inline-flex items-center gap-2">
                    {Math.max(i.oldPrice ?? i.price, i.price) > i.price && (
                      <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[12px] font-semibold text-pink-700">
                        Гарантия низкой цены
                      </span>
                    )}
                  </div>
                  <div className="line-clamp-2 text-[16px] font-semibold text-zinc-900">
                    {i.title}
                  </div>
                  <div className="mt-1 text-[13px] text-zinc-500">
                    Продавец: <span className="text-zinc-700">Uzum Market</span>
                  </div>

                  {/* qty stepper (mobile) */}
                  <div className="mt-3 flex items-center gap-3 sm:hidden">
                    <QtyStepper
                      value={i.qty}
                      onDec={() =>
                        dispatch(changeQty({ id: i.id, qty: Math.max(1, i.qty - 1) }))
                      }
                      onInc={() => dispatch(changeQty({ id: i.id, qty: i.qty + 1 }))}
                    />
                    <button
                      onClick={() => dispatch(removeFromCart(i.id))}
                      className="ml-2 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700"
                    >
                      <TrashIcon /> Удалить
                    </button>
                  </div>
                </div>

                {/* price + actions */}
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => dispatch(removeFromCart(i.id))}
                    className="hidden items-center gap-2 text-sm text-zinc-400 hover:text-zinc-600 sm:inline-flex"
                    title="Удалить"
                  >
                    <TrashIcon />
                    <span className="sr-only">Удалить</span>
                  </button>

                  <div className="text-right">
                    <div className="text-[20px] font-extrabold text-violet-700">
                      {formatUZS(i.price * i.qty)}{" "}
                      <span className="align-middle text-[16px]">💳</span>
                    </div>

                    {Math.max(i.oldPrice ?? i.price, i.price) > i.price && (
                      <div className="text-[12px] text-zinc-500">
                        без карты Uzum {formatUZS((i.oldPrice ?? i.price) * i.qty)}
                      </div>
                    )}
                  </div>

                  {/* qty stepper (desktop) */}
                  <div className="hidden sm:block">
                    <QtyStepper
                      value={i.qty}
                      onDec={() =>
                        dispatch(changeQty({ id: i.id, qty: Math.max(1, i.qty - 1) }))
                      }
                      onInc={() => dispatch(changeQty({ id: i.id, qty: i.qty + 1 }))}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {items.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-2 rounded-xl border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </section>

      {/* RIGHT: summary */}
      <aside className="space-y-4">
        {/* free delivery progress */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-[15px] font-semibold">Бесплатно в пункт выдачи</div>
          <div className="mt-1 text-[13px] text-zinc-500">
            Ещё 67 670 сум, и будет бесплатно курьером
          </div>

          <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-200">
            <div className="h-1.5 w-1/3 rounded-full bg-violet-600" />
          </div>

          <div className="mt-1 flex justify-between text-[12px] text-zinc-500">
            <span>30 000 сум</span>
            <span>0 сум</span>
          </div>
        </div>

        {/* order card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-[15px] font-semibold">Ваш заказ</div>

          <div className="mt-3 space-y-1 text-[14px]">
            <div className="flex justify-between">
              <span className="text-zinc-500">Товары ({sumQty}):</span>
              <span className="font-medium">{formatUZS(totalWithoutCard)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Доставим 12 августа</span>
              <span className="text-violet-700">Выбор даты</span>
            </div>
          </div>

          <div className="mt-4 border-t border-zinc-200 pt-3">
            <div className="text-[15px] font-semibold text-zinc-700">Итого</div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className="text-sm text-zinc-500">С картой Uzum</div>
              <div className="text-2xl font-extrabold text-violet-700">{formatUZS(total)}</div>
            </div>
            {savings > 0 && (
              <div className="mt-1 text-right text-[13px] text-emerald-600">
                Вы экономите: {formatUZS(savings)}
              </div>
            )}
            <div className="mt-1 flex justify-between text-[13px] text-zinc-500">
              <span>Без карты</span>
              <span>{formatUZS(totalWithoutCard)}</span>
            </div>
          </div>

          <button className="mt-4 w-full rounded-2xl bg-violet-600 py-3 text-center text-[15px] font-bold text-white hover:brightness-95">
            Перейти к оформлению
          </button>
        </div>
      </aside>
    </div>
  );
}

/* --- helpers --- */
function QtyStepper({
  value,
  onDec,
  onInc,
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="inline-flex items-center rounded-xl border border-zinc-300">
      <button
        className="h-8 w-8 rounded-l-xl text-lg text-zinc-700 hover:bg-zinc-50"
        onClick={onDec}
      >
        −
      </button>
      <div className="mx-2 min-w-[24px] text-center text-[15px]">{value}</div>
      <button
        className="h-8 w-8 rounded-r-xl text-lg text-zinc-700 hover:bg-zinc-50"
        onClick={onInc}
      >
        +
      </button>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
