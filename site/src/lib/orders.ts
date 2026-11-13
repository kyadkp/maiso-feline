import { prisma } from "@/lib/db";
import type { PaymentMethod } from "@/generated/prisma/enums";

export interface OrderItemInput {
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: PaymentMethod;
  items: OrderItemInput[];
  userId?: string;
}

async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  for (let attempt = 0; attempt < 5; attempt++) {
    const suffix = Math.floor(100000 + Math.random() * 900000); // 6 chiffres
    const candidate = `MF-${year}-${suffix}`;
    const existing = await prisma.order.findUnique({ where: { orderNumber: candidate } });
    if (!existing) return candidate;
  }
  throw new Error("Impossible de générer un numéro de commande unique");
}

export async function createOrder(input: CreateOrderInput) {
  if (input.items.length === 0) {
    throw new Error("La commande ne contient aucun article");
  }

  const totalAmount = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderNumber = await generateOrderNumber();

  return prisma.order.create({
    data: {
      orderNumber,
      customerName: input.customerName,
      phone: input.phone,
      address: input.address,
      city: input.city,
      paymentMethod: input.paymentMethod,
      totalAmount,
      userId: input.userId,
      items: {
        create: input.items.map((item) => ({
          slug: item.slug,
          name: item.name,
          price: item.price,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });
}

export async function getOrderForTracking(orderNumber: string, phone: string) {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });
  if (!order || order.phone !== phone) return null;
  return order;
}

export async function getOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}
