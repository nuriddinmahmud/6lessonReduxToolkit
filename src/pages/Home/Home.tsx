import ProductCard from "../../components/ui/ProductCard";
import { useAppSelector } from "../../app/hooks";

export default function Home() {
  const { status, list } = useAppSelector(s => s.products);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-[1240px] px-4 py-6">
        <div className="animate-pulse text-zinc-500">Yuklanmoqda...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-[1240px] px-4 py-6">
        <div className="text-red-600">Xatolik! Mahsulotlar yuklanmadi.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-6">
      <h1 className="mb-4 text-xl font-bold">Mahsulotlar</h1>

      {list.length === 0 ? (
        <div className="text-zinc-500">Hozircha mahsulot yo‘q.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
