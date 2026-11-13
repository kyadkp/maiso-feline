"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/products";
import { toneSequence } from "@/lib/tone";
import type { Product } from "@/lib/types";
import { GalleryMedia } from "./ProductMedia";

const ACCORDION_SECTIONS = (product: Product) => [
  { title: "Description", body: product.description },
  { title: "Tailles & coupe", body: product.tailles },
  {
    title: "Livraison & retours",
    body: "Livraison en 24 à 72h à Dakar, 3 à 5 jours dans le reste du pays. Retour possible sous 7 jours si l'article n'a pas été porté.",
  },
];

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const thumbTones = toneSequence(product.tone);
  const [activeThumb, setActiveThumb] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(
    product.sizes.find((s) => s.inStock)?.label ?? product.sizes[0]?.label ?? ""
  );
  const [openSection, setOpenSection] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const selectedSize = product.sizes.find((s) => s.label === size);

  function buildCartItem() {
    return {
      slug: product.slug,
      name: product.name,
      price: product.price,
      color,
      size,
      tone: product.tone,
    };
  }

  function handleAddToCart() {
    addItem(buildCartItem());
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleOrderNow() {
    addItem(buildCartItem());
    router.push("/panier");
  }

  return (
    <div className="grid grid-cols-1 gap-10 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div>
        <GalleryMedia tone={thumbTones[activeThumb]} className="mb-3.5 aspect-[4/5]" />
        <div className="flex gap-3">
          {thumbTones.map((tone, i) => (
            <button
              key={i}
              onClick={() => setActiveThumb(i)}
              className={`h-22.5 w-18 overflow-hidden rounded-xs border transition-opacity ${
                activeThumb === i ? "border-accent opacity-100" : "border-line opacity-60 hover:opacity-100"
              }`}
            >
              <GalleryMedia tone={tone} className="h-full w-full" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2.5 text-xs tracking-[0.22em] text-accent uppercase">
          {product.categoryLabel}
        </p>
        <h1 className="mb-3.5 text-[clamp(30px,4vw,44px)] normal-case tracking-normal">
          {product.name}
        </h1>
        <div className="mb-6.5 flex items-center gap-3 text-xl">
          {product.oldPrice != null && (
            <span className="text-base text-foreground-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className={product.oldPrice != null ? "text-accent" : ""}>
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="mb-6.5">
          <span className="mb-2.5 block text-xs tracking-wider text-foreground-muted uppercase">
            Couleur — {color}
          </span>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                title={c.name}
                onClick={() => setColor(c.name)}
                className={`h-8.5 w-8.5 rounded-full border p-0.5 ${
                  color === c.name ? "border-accent" : "border-line"
                }`}
              >
                <span className="block h-full w-full rounded-full" style={{ background: c.hex }} />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6.5">
          <span className="mb-2.5 block text-xs tracking-wider text-foreground-muted uppercase">Taille</span>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                disabled={!s.inStock}
                onClick={() => setSize(s.label)}
                className={`min-w-12 rounded-xs border px-3.5 py-2.5 text-[13px] transition-colors ${
                  !s.inStock
                    ? "cursor-not-allowed border-line text-foreground-muted line-through opacity-30"
                    : size === s.label
                      ? "border-accent bg-accent text-background"
                      : "border-line hover:border-accent"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          {selectedSize?.lowStock && (
            <p className="mt-2.5 text-[13px] text-accent">Plus que quelques pièces en stock dans cette taille</p>
          )}
        </div>

        <div className="mb-3 flex flex-wrap gap-3.5">
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-xs border border-accent bg-accent px-6 py-3.5 text-center text-[13px] tracking-[0.14em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground"
            style={{ minWidth: 180 }}
          >
            {justAdded ? "Ajouté ✓" : "Ajouter au panier"}
          </button>
          <button
            onClick={handleOrderNow}
            className="flex-1 rounded-xs border border-foreground px-6 py-3.5 text-center text-[13px] tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-background"
            style={{ minWidth: 180 }}
          >
            Commander maintenant
          </button>
        </div>
        <p className="mb-7 text-xs text-foreground-muted">
          « Commander maintenant » passe directement à la validation de commande, sans repasser par le panier.
        </p>

        <div className="mb-7 flex flex-wrap gap-5.5 text-xs text-foreground-muted">
          <span>Livraison partout au Sénégal</span>
          <span>Paiement Wave / Orange Money / à la livraison</span>
        </div>

        <div className="border-t border-line">
          {ACCORDION_SECTIONS(product).map((section, i) => (
            <div key={section.title} className="border-b border-line">
              <button
                onClick={() => setOpenSection(openSection === i ? -1 : i)}
                className="flex w-full items-center justify-between py-4.5 text-left text-sm tracking-wide"
              >
                {section.title}
                <span>{openSection === i ? "−" : "+"}</span>
              </button>
              {openSection === i && (
                <p className="max-w-[520px] pb-4.5 text-sm text-foreground-muted">{section.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
