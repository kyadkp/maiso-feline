import Link from "next/link";
import { listProductsAdmin } from "@/lib/admin";
import { formatPrice } from "@/lib/format";
import { SECTION_LABELS } from "@/lib/sections";
import { GalleryMedia } from "@/components/product/ProductMedia";
import { DeleteProductButton } from "./DeleteProductButton";

export const metadata = { title: "Produits — Admin Maison Féline" };

export default async function AdminProduitsPage() {
  const products = await listProductsAdmin();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[clamp(28px,5vw,40px)]">Produits</h1>
        <Link
          href="/admin/produits/nouveau"
          className="rounded-xs border border-accent bg-accent px-6 py-3 text-[13px] tracking-[0.14em] text-background uppercase"
        >
          Ajouter un produit
        </Link>
      </div>

      <div className="divide-y divide-line border-y border-line">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-5 py-4">
            <GalleryMedia
              tone={product.tone}
              imageUrl={product.imageUrl}
              alt={product.name}
              className="h-20 w-16 shrink-0"
            />
            <div className="flex-1">
              <p className="font-display text-base normal-case">{product.name}</p>
              <p className="text-sm text-foreground-muted">
                {SECTION_LABELS[product.section]} — {product.categoryLabel}
              </p>
            </div>
            <p className="w-28 text-right text-sm">{formatPrice(product.price)}</p>
            <div className="flex w-32 flex-col items-end gap-1.5">
              <Link
                href={`/admin/produits/${product.id}`}
                className="text-xs text-accent underline underline-offset-4"
              >
                Modifier
              </Link>
              <DeleteProductButton id={product.id} name={product.name} />
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="py-10 text-center text-foreground-muted">Aucun produit pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
