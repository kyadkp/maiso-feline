"use server";

import { auth } from "@/auth";
import { createOrder, type OrderItemInput } from "@/lib/orders";
import { getProductBySlug } from "@/lib/products";
import { cartItemsSchema, checkoutSchema } from "@/lib/validation";

export interface CheckoutState {
  error?: string;
  orderNumber?: string;
}

export async function createOrderAction(
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const fields = checkoutSchema.safeParse({
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    paymentMethod: formData.get("paymentMethod"),
  });

  if (!fields.success) {
    return { error: fields.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  let rawItems: unknown;
  try {
    rawItems = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { error: "Panier invalide" };
  }

  const parsedItems = cartItemsSchema.safeParse(rawItems);
  if (!parsedItems.success) {
    return { error: parsedItems.error.issues[0]?.message ?? "Panier invalide" };
  }

  // Le prix et le nom de chaque article sont toujours relus depuis le
  // catalogue serveur : on ne fait jamais confiance aux valeurs du client.
  const items: OrderItemInput[] = [];
  for (const item of parsedItems.data) {
    const product = getProductBySlug(item.slug);
    if (!product) return { error: `Produit introuvable : ${item.slug}` };

    const colorOk = product.colors.some((c) => c.name === item.color);
    const sizeOption = product.sizes.find((s) => s.label === item.size);
    if (!colorOk || !sizeOption || !sizeOption.inStock) {
      return { error: `Option indisponible pour ${product.name}` };
    }

    items.push({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    });
  }

  const session = await auth();

  const order = await createOrder({
    ...fields.data,
    items,
    userId: session?.user?.id,
  });

  return { orderNumber: order.orderNumber };
}
