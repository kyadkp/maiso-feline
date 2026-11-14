import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPaytechSignature, type PaytechIpnFields } from "@/lib/paytech";

async function parseBody(req: NextRequest): Promise<Record<string, string>> {
  const contentType = req.headers.get("content-type") ?? "";
  const raw = await req.text();

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(raw) as Record<string, string>;
    } catch {
      // repli sur le format formulaire ci-dessous
    }
  }

  const params = new URLSearchParams(raw);
  const fields: Record<string, string> = {};
  for (const [key, value] of params.entries()) fields[key] = value;
  return fields;
}

export async function POST(req: NextRequest) {
  const fields = await parseBody(req);
  const ipn = fields as PaytechIpnFields;

  if (!verifyPaytechSignature(ipn)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const orderNumber = ipn.ref_command;
  if (!orderNumber) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { orderNumber } });
  if (!order) {
    return new NextResponse("Order not found", { status: 404 });
  }

  if (ipn.type_event === "sale_complete") {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        // Le paiement confirmé fait avancer une commande encore "Nouvelle"
        // vers "Confirmée", sans écraser un statut déjà géré manuellement.
        status: order.status === "NOUVELLE" ? "CONFIRMEE" : order.status,
      },
    });
  } else if (ipn.type_event === "sale_canceled") {
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: "FAILED" },
    });
  }

  return new NextResponse("OK", { status: 200 });
}
