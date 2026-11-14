"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { GalleryMedia } from "@/components/product/ProductMedia";
import { formatPrice } from "@/lib/format";
import type { Tone } from "@/lib/types";

export default function PanierPage() {
  const { items, setQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[760px] px-5 py-24 text-center">
        <h1 className="mb-4 text-[clamp(28px,5vw,40px)]">Votre panier est vide</h1>
        <p className="mb-8 text-foreground-muted">
          Parcourez la collection et ajoutez les pièces qui vous plaisent.
        </p>
        <Link
          href="/nouveautes"
          className="inline-flex rounded-xs border border-accent bg-accent px-7 py-3.5 text-[13px] tracking-[0.14em] text-background uppercase"
        >
          Voir les nouveautés
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] px-5 py-14">
      <h1 className="mb-10 text-[clamp(32px,5vw,48px)]">Votre panier</h1>

      <div className="mb-10 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.id} className="flex gap-5 py-6">
            <GalleryMedia
              tone={item.tone as Tone}
              imageUrl={item.imageUrl}
              alt={item.name}
              className="h-24 w-20 shrink-0"
            />
            <div className="flex flex-1 flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-base normal-case">{item.name}</p>
                <p className="text-sm text-foreground-muted">
                  {item.color} — Taille {item.size}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-xs text-foreground-muted underline underline-offset-4 hover:text-accent"
                >
                  Retirer
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-line">
                  <button
                    onClick={() => setQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1.5 text-lg"
                    aria-label="Diminuer la quantité"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => setQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1.5 text-lg"
                    aria-label="Augmenter la quantité"
                  >
                    +
                  </button>
                </div>
                <p className="min-w-24 text-right text-sm">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end gap-5">
        <div className="flex w-full max-w-[300px] justify-between text-lg">
          <span>Total</span>
          <span className="text-accent">{formatPrice(totalPrice)}</span>
        </div>
        <Link
          href="/commande"
          className="w-full max-w-[300px] rounded-xs border border-accent bg-accent px-7 py-3.5 text-center text-[13px] tracking-[0.14em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground"
        >
          Passer la commande
        </Link>
        <p className="max-w-[300px] text-right text-xs text-foreground-muted">
          Paiement Wave, Orange Money ou à la livraison, disponible à l&apos;étape 5.
        </p>
      </div>
    </div>
  );
}
