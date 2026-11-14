"use client";

import { useActionState } from "react";
import { formatPrice } from "@/lib/format";
import { trackOrderAction, type TrackOrderState } from "./actions";

const initialState: TrackOrderState = {};

const STATUS_LABELS: Record<string, string> = {
  NOUVELLE: "Nouvelle",
  CONFIRMEE: "Confirmée",
  LIVREE: "Livrée",
  ANNULEE: "Annulée",
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  WAVE: "Wave",
  ORANGE_MONEY: "Orange Money",
  COD: "À la livraison",
};

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  PAID: "Payée",
  FAILED: "Échouée",
};

export default function SuiviCommandePage() {
  const [state, formAction, pending] = useActionState(trackOrderAction, initialState);

  return (
    <div className="mx-auto max-w-[600px] px-5 py-14">
      <p className="mb-3 text-xs tracking-[0.22em] text-accent uppercase">Suivi de commande</p>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)]">Où en est ma commande ?</h1>

      <form action={formAction} className="mb-10 space-y-5">
        <div>
          <label htmlFor="orderNumber" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Numéro de commande
          </label>
          <input
            id="orderNumber"
            name="orderNumber"
            type="text"
            placeholder="MF-2026-123456"
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
            inputMode="numeric"
            placeholder="77 123 45 67"
            maxLength={13}
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        {state.error && <p className="text-sm text-accent">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xs border border-accent bg-accent px-6 py-3.5 text-[13px] tracking-[0.14em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground disabled:opacity-50"
        >
          {pending ? "Recherche…" : "Suivre ma commande"}
        </button>
      </form>

      {state.order && (
        <div className="border-y border-line py-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-display text-lg tracking-wider">{state.order.orderNumber}</p>
            <span className="rounded-xs border border-accent px-3 py-1.5 text-xs tracking-wider text-accent uppercase">
              {STATUS_LABELS[state.order.status] ?? state.order.status}
            </span>
          </div>
          <p className="mb-1 text-sm text-foreground-muted">
            Commande du {new Date(state.order.createdAt).toLocaleDateString("fr-FR")}
          </p>
          <p className="mb-5 text-sm text-foreground-muted">
            Paiement {PAYMENT_METHOD_LABELS[state.order.paymentMethod] ?? state.order.paymentMethod} —{" "}
            {state.order.paymentMethod === "COD"
              ? "à régler à la livraison"
              : (PAYMENT_STATUS_LABELS[state.order.paymentStatus] ?? state.order.paymentStatus)}
          </p>
          <div className="divide-y divide-line">
            {state.order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 text-sm">
                <span>
                  {item.name} — {item.color}, taille {item.size} × {item.quantity}
                </span>
                <span className="text-foreground-muted">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 text-lg">
            <span>Total</span>
            <span className="text-accent">{formatPrice(state.order.totalAmount)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
