import { CategoryPills } from "@/components/product/CategoryPills";
import { FilterableProductGrid } from "@/components/product/FilterableProductGrid";
import { getProductsBySection } from "@/lib/products";

export const metadata = { title: "Homme — Maison Féline" };

export default function HommePage() {
  const products = getProductsBySection("homme");

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <h1 className="mb-8 text-[clamp(32px,5vw,48px)]">Homme</h1>
      <CategoryPills section="homme" />
      <FilterableProductGrid products={products} />
    </div>
  );
}
