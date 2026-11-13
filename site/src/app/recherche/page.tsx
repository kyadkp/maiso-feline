"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { searchProducts } from "@/lib/products";

export default function RecherchePage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14">
      <h1 className="mb-8 text-[clamp(32px,5vw,48px)]">Recherche</h1>
      <div className="mb-12 flex items-center gap-3 border-b border-foreground pb-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0 text-foreground-muted">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une robe, une veste, des baskets…"
          className="w-full bg-transparent text-lg outline-none placeholder:text-foreground-muted"
        />
      </div>

      {query.trim() === "" ? (
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
