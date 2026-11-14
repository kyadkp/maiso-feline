"use server";

import { headers } from "next/headers";
import { auth } from "@/auth";
import { createOrder, setOrderPaytechToken, type OrderItemInput } from "@/lib/orders";
import { getProductBySlug } from "@/lib/products";
import { isPaytechConfigured, requestPayment } from "@/lib/paytech";
import { cartItemsSchema, checkoutSchema } from "@/lib/validation";

export interface CheckoutState {
  error?: string;
  orderNumber?: string;
  redirectUrl?: string;
}

async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3100";
  const protocol = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
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
    const product = await getProductBySlug(item.slug);
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

  if (fields.data.paymentMethod !== "COD" && !isPaytechConfigured()) {
    return {
      error:
        "Le paiement en ligne n'est pas encore configuré. Merci de choisir « Paiement à la livraison » pour l'instant.",
    };
  }

  const session = await auth();

  const order = await createOrder({
    ...fields.data,
    items,
    userId: session?.user?.id,
  });

  if (fields.data.paymentMethod === "COD") {
    return { orderNumber: order.orderNumber };
  }

  const baseUrl = await getBaseUrl();

  try {
    const payment = await requestPayment({
      itemName: `Commande ${order.orderNumber}`,
      amount: order.totalAmount,
      refCommand: order.orderNumber,
      targetPayment: fields.data.paymentMethod === "WAVE" ? "Wave" : "Orange Money",
      ipnUrl: `${baseUrl}/api/paytech/ipn`,
      successUrl: `${baseUrl}/commande/confirmation/${order.orderNumber}`,
      cancelUrl: `${baseUrl}/commande?paiement=annule`,
    });
    await setOrderPaytechToken(order.id, payment.token);
    return { redirectUrl: payment.redirectUrl };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? `Commande enregistrée (${order.orderNumber}), mais le paiement n'a pas pu démarrer : ${err.message}`
          : "Commande enregistrée, mais le paiement n'a pas pu démarrer.",
    };
  }
}
