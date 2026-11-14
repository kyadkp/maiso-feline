import { CategoryPills } from "@/components/product/CategoryPills";
import { FilterableProductGrid } from "@/components/product/FilterableProductGrid";
import { getCategories, getProductsBySection } from "@/lib/products";

export const metadata = { title: "Chaussures — Maison Féline" };

export default async function ChaussuresPage() {
  const [products, categories] = await Promise.all([
    getProductsBySection("chaussures"),
    getCategories("chaussures"),
  ]);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <h1 className="mb-8 text-[clamp(32px,5vw,48px)]">Chaussures</h1>
      <CategoryPills section="chaussures" categories={categories} />
      <FilterableProductGrid products={products} />
    </div>
  );
}
