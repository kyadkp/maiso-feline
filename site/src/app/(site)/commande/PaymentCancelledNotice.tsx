"use client";

import { useSearchParams } from "next/navigation";

export function PaymentCancelledNotice() {
  const searchParams = useSearchParams();
  if (searchParams.get("paiement") !== "annule") return null;

  return (
    <p className="mb-6 border border-accent px-4 py-3 text-sm text-accent">
      Le paiement a été annulé. Votre commande n&apos;a pas été renvoyée : vous pouvez
      recommencer ci-dessous.
    </p>
  );
}
