"use server";

import { getOrderForTracking } from "@/lib/orders";
import { trackOrderSchema } from "@/lib/validation";

export interface TrackOrderState {
  error?: string;
  order?: {
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: { name: string; color: string; size: string; quantity: number; price: number }[];
  };
}

export async function trackOrderAction(
  _prevState: TrackOrderState,
  formData: FormData
): Promise<TrackOrderState> {
  const parsed = trackOrderSchema.safeParse({
    orderNumber: formData.get("orderNumber"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  const order = await getOrderForTracking(parsed.data.orderNumber, parsed.data.phone);
  if (!order) {
    return { error: "Aucune commande trouvée avec ce numéro et ce téléphone" };
  }

  return {
    order: {
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt.toISOString(),
      items: order.items.map((item) => ({
        name: item.name,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
    },
  };
}
