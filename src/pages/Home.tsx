import { useAppSelector } from "../hooks";
import ProductCard from "../components/Cart";

export default function Home() {
  const products = useAppSelector((s) => s.products.list);

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-6">
      {/* Mobil: 2 ta, md: 3 ta, lg: 4 ta, xl: 5 ta */}
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
