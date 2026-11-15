"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/auth";
import { updateOrderStatus } from "@/lib/admin";

const VALID_STATUSES = ["NOUVELLE", "CONFIRMEE", "LIVREE", "ANNULEE"] as const;

export async function updateOrderStatusAction(formData: FormData) {
  await requireAdmin();

  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!orderId || !VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    throw new Error("Donnée invalide");
  }

  await updateOrderStatus(orderId, status as (typeof VALID_STATUSES)[number]);
  revalidatePath("/admin/commandes");
}
