import { ProductGrid } from "@/components/product/ProductGrid";
import { searchProducts } from "@/lib/products";
import { SearchForm } from "./SearchForm";

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? await searchProducts(query) : [];

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <h1 className="mb-8 text-[clamp(32px,5vw,48px)]">Recherche</h1>
      <SearchForm initialQuery={q} />

      {query === "" ? (
        <p className="text-foreground-muted">Commencez à taper pour voir les résultats.</p>
      ) : (
        <>
          <p className="mb-6 text-sm text-foreground-muted">
            {results.length} résultat{results.length > 1 ? "s" : ""} pour « {query} »
          </p>
          <ProductGrid products={results} />
        </>
      )}
    </div>
  );
}
