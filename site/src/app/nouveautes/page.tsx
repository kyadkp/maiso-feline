import { FilterableProductGrid } from "@/components/product/FilterableProductGrid";
import { getNewProducts } from "@/lib/products";

export const metadata = { title: "Nouveautés — Maison Féline" };

export default function NouveautesPage() {
  const products = getNewProducts();

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <h1 className="mb-10 text-[clamp(32px,5vw,48px)]">Nouveautés</h1>
      <FilterableProductGrid products={products} />
    </div>
  );
}
