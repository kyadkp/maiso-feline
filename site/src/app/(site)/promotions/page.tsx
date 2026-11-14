import { FilterableProductGrid } from "@/components/product/FilterableProductGrid";
import { getPromotions } from "@/lib/products";

export const metadata = { title: "Promotions — Maison Féline" };

export default async function PromotionsPage() {
  const products = await getPromotions();

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <h1 className="mb-3 text-[clamp(32px,5vw,48px)]">Promotions</h1>
      <p className="mb-10 text-foreground-muted">
        -15% sur toute la nouvelle collection avec le code FELINE15, jusqu&apos;au 30 novembre.
      </p>
      <FilterableProductGrid products={products} />
    </div>
  );
}
