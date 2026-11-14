"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useActionState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";
import { createOrderAction, type CheckoutState } from "./actions";
import { PaymentCancelledNotice } from "./PaymentCancelledNotice";

const initialState: CheckoutState = {};

const PAYMENT_OPTIONS = [
  { value: "WAVE", label: "Wave" },
  { value: "ORANGE_MONEY", label: "Orange Money" },
  { value: "COD", label: "Paiement à la livraison" },
] as const;

export default function CommandePage() {
  const { items, totalPrice, clear } = useCart();
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createOrderAction, initialState);

  useEffect(() => {
    if (state.redirectUrl) {
      clear();
      window.location.href = state.redirectUrl;
    } else if (state.orderNumber) {
      clear();
      router.push(`/commande/confirmation/${state.orderNumber}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.orderNumber, state.redirectUrl]);

  if (items.length === 0 && !state.orderNumber) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-24 text-center">
        <h1 className="mb-4 text-[clamp(28px,5vw,40px)]">Votre panier est vide</h1>
        <Link
          href="/nouveautes"
          className="inline-flex rounded-xs border border-accent bg-accent px-7 py-3.5 text-[13px] tracking-[0.14em] text-background uppercase"
        >
          Voir les nouveautés
        </Link>
      </div>
    );
  }

  const itemsPayload = JSON.stringify(
    items.map((item) => ({
      slug: item.slug,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    }))
  );

  return (
    <div className="mx-auto max-w-[760px] px-5 py-14">
      <h1 className="mb-10 text-[clamp(32px,5vw,48px)]">Valider la commande</h1>

      <Suspense fallback={null}>
        <PaymentCancelledNotice />
      </Suspense>

      <div className="mb-10 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 py-4 text-sm">
            <span>
              {item.name} — {item.color}, taille {item.size} × {item.quantity}
            </span>
            <span className="text-foreground-muted">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between py-4 text-lg">
          <span>Total</span>
          <span className="text-accent">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="items" value={itemsPayload} />

        <div>
          <label htmlFor="customerName" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Nom complet
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Numéro de téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="77 123 45 67"
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="address" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Adresse de livraison
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="city" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Ville
          </label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Dakar"
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        <fieldset>
          <legend className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Mode de paiement
          </legend>
          <div className="space-y-2.5">
            {PAYMENT_OPTIONS.map((option, i) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 border border-line px-4 py-3 text-sm has-[:checked]:border-accent"
              >
                <input type="radio" name="paymentMethod" value={option.value} defaultChecked={i === 2} required />
                {option.label}
              </label>
            ))}
          </div>
          <p className="mt-2.5 text-xs text-foreground-muted">
            Pour Wave et Orange Money, vous serez redirigée vers une page de paiement
            sécurisée. La commande n&apos;est confirmée qu&apos;une fois le paiement reçu.
          </p>
        </fieldset>

        {state.error && <p className="text-sm text-accent">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xs border border-accent bg-accent px-6 py-3.5 text-[13px] tracking-[0.14em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground disabled:opacity-50"
        >
          {pending ? "Validation…" : "Confirmer la commande"}
        </button>
      </form>
    </div>
  );
}
