import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-foreground-muted">
        Aucun produit ne correspond à ces critères pour le moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
