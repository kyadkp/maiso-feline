"use client";

import { useTransition } from "react";
import { updateOrderStatusAction } from "./actions";

const STATUS_OPTIONS = [
  { value: "NOUVELLE", label: "Nouvelle" },
  { value: "CONFIRMEE", label: "Confirmée" },
  { value: "LIVREE", label: "Livrée" },
  { value: "ANNULEE", label: "Annulée" },
];

export function StatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={updateOrderStatusAction}>
      <input type="hidden" name="orderId" value={orderId} />
      <select
        key={status}
        name="status"
        defaultValue={status}
        disabled={isPending}
        onChange={(e) => {
          const form = e.currentTarget.form;
          startTransition(() => {
            form?.requestSubmit();
          });
        }}
        className="border border-line bg-background px-2 py-1.5 text-xs tracking-wider uppercase disabled:opacity-50"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}
