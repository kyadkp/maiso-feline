import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { SECTION_LABELS } from "@/lib/sections";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} — Maison Féline` : "Produit introuvable" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-6">
      <p className="mb-6 text-[13px] text-foreground-muted">
        <Link href="/" className="hover:text-accent">Accueil</Link> /{" "}
        <Link href={`/${product.section}`} className="hover:text-accent">
          {SECTION_LABELS[product.section]}
        </Link>{" "}
        /{" "}
        <Link href={`/${product.section}/${product.categorySlug}`} className="hover:text-accent">
          {product.categoryLabel}
        </Link>{" "}
        / {product.name}
      </p>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="py-14">
          <h2 className="mb-9 text-[clamp(28px,4vw,40px)]">Vous aimerez aussi</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
