import { notFound } from "next/navigation";
import { CategoryPills } from "@/components/product/CategoryPills";
import { FilterableProductGrid } from "@/components/product/FilterableProductGrid";
import { CATEGORY_TREE, getProductsByCategory } from "@/lib/products";

export function generateStaticParams() {
  return CATEGORY_TREE.chaussures.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo = CATEGORY_TREE.chaussures.find((c) => c.slug === category);
  return { title: categoryInfo ? `${categoryInfo.label} — Maison Féline` : "Catégorie introuvable" };
}

export default async function ChaussuresCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo = CATEGORY_TREE.chaussures.find((c) => c.slug === category);
  if (!categoryInfo) notFound();

  const products = getProductsByCategory("chaussures", category);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <p className="mb-2 text-xs tracking-wider text-foreground-muted uppercase">Chaussures</p>
      <h1 className="mb-8 text-[clamp(32px,5vw,48px)]">{categoryInfo.label}</h1>
      <CategoryPills section="chaussures" active={category} />
      <FilterableProductGrid products={products} />
    </div>
  );
}
