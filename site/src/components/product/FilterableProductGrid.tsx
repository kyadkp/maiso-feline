"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "./ProductGrid";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function FilterableProductGrid({ products }: { products: Product[] }) {
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s.label)));
    return Array.from(set).sort();
  }, [products]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map.entries());
  }, [products]);

  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices, 0),
      max: Math.max(...prices, 0),
    };
  }, [products]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = products.filter((p) => {
    const sizeOk =
      selectedSizes.length === 0 ||
      p.sizes.some((s) => s.inStock && selectedSizes.includes(s.label));
    const colorOk =
      selectedColors.length === 0 || p.colors.some((c) => selectedColors.includes(c.name));
    const priceOk = p.price <= maxPrice;
    return sizeOk && colorOk && priceOk;
  });

  const hasActiveFilters =
    selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice < priceBounds.max;

  function resetFilters() {
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(priceBounds.max);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-2 rounded-xs border border-line px-4 py-2.5 text-[13px] tracking-wider uppercase"
        >
          Filtres
          {hasActiveFilters && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
        </button>
        <p className="text-sm text-foreground-muted">
          {filtered.length} produit{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      {filtersOpen && (
        <div className="mb-8 grid grid-cols-1 gap-8 border-y border-line py-6 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-xs tracking-wider text-foreground-muted uppercase">Taille</p>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggle(selectedSizes, size, setSelectedSizes)}
                  className={`min-w-11 rounded-xs border px-3 py-2 text-[13px] transition-colors ${
                    selectedSizes.includes(size)
                      ? "border-accent bg-accent text-background"
                      : "border-line hover:border-accent"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs tracking-wider text-foreground-muted uppercase">Couleur</p>
            <div className="flex flex-wrap gap-2.5">
              {allColors.map(([name, hex]) => (
                <button
                  key={name}
                  title={name}
                  onClick={() => toggle(selectedColors, name, setSelectedColors)}
                  className={`h-8.5 w-8.5 rounded-full border p-0.5 ${
                    selectedColors.includes(name) ? "border-accent" : "border-line"
                  }`}
                >
                  <span className="block h-full w-full rounded-full" style={{ background: hex }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs tracking-wider text-foreground-muted uppercase">
              Prix max — {formatPrice(maxPrice)}
            </p>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-left text-[13px] text-accent underline underline-offset-4 sm:col-span-3"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}

      <ProductGrid products={filtered} />
    </div>
  );
}
