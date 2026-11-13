import Link from "next/link";
import { CardMedia } from "./ProductMedia";
import { formatPrice, SECTION_LABELS } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.oldPrice != null
      ? Math.round(100 - (product.price / product.oldPrice) * 100)
      : null;

  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div className="relative mb-4">
        <CardMedia tone={product.tone} />
        {product.isNew && (
          <span className="absolute left-3.5 top-3.5 rounded-xs bg-accent px-2.5 py-1 text-[11px] tracking-wider text-background uppercase">
            Nouveau
          </span>
        )}
        {discount != null && !product.isNew && (
          <span className="absolute left-3.5 top-3.5 rounded-xs bg-accent px-2.5 py-1 text-[11px] tracking-wider text-background uppercase">
            -{discount}%
          </span>
        )}
      </div>
      <p className="mb-2 text-xs tracking-wider text-foreground-muted uppercase">
        {SECTION_LABELS[product.section]} — {product.categoryLabel}
      </p>
      <p className="mb-1 font-display text-[17px] normal-case tracking-normal">
        {product.name}
      </p>
      <p className="text-[15px]">
        {product.oldPrice != null && (
          <span className="mr-2 text-[13px] text-foreground-muted line-through">
            {formatPrice(product.oldPrice)}
          </span>
        )}
        <span className={product.oldPrice != null ? "text-accent" : ""}>
          {formatPrice(product.price)}
        </span>
      </p>
    </Link>
  );
}
