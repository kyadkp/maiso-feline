import { CategoryPills } from "@/components/product/CategoryPills";
import { FilterableProductGrid } from "@/components/product/FilterableProductGrid";
import { getProductsBySection } from "@/lib/products";

export const metadata = { title: "Femme — Maison Féline" };

export default function FemmePage() {
  const products = getProductsBySection("femme");

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <h1 className="mb-8 text-[clamp(32px,5vw,48px)]">Femme</h1>
      <CategoryPills section="femme" />
      <FilterableProductGrid products={products} />
    </div>
  );
}
