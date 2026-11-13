import { notFound } from "next/navigation";
import { CategoryPills } from "@/components/product/CategoryPills";
import { FilterableProductGrid } from "@/components/product/FilterableProductGrid";
import { CATEGORY_TREE, getProductsByCategory } from "@/lib/products";

export function generateStaticParams() {
  return CATEGORY_TREE.femme.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo = CATEGORY_TREE.femme.find((c) => c.slug === category);
  return { title: categoryInfo ? `${categoryInfo.label} Femme — Maison Féline` : "Catégorie introuvable" };
}

export default async function FemmeCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo = CATEGORY_TREE.femme.find((c) => c.slug === category);
  if (!categoryInfo) notFound();

  const products = getProductsByCategory("femme", category);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <p className="mb-2 text-xs tracking-wider text-foreground-muted uppercase">Femme</p>
      <h1 className="mb-8 text-[clamp(32px,5vw,48px)]">{categoryInfo.label}</h1>
      <CategoryPills section="femme" active={category} />
      <FilterableProductGrid products={products} />
    </div>
  );
}
