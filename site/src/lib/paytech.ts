import crypto from "node:crypto";

const BASE_URL = "https://paytech.sn/api";

export function isPaytechConfigured(): boolean {
  return Boolean(process.env.PAYTECH_API_KEY && process.env.PAYTECH_API_SECRET);
}

export interface RequestPaymentInput {
  itemName: string;
  amount: number;
  refCommand: string;
  targetPayment: "Wave" | "Orange Money";
  ipnUrl: string;
  successUrl: string;
  cancelUrl: string;
}

export interface RequestPaymentResult {
  token: string;
  redirectUrl: string;
}

/**
 * Lance une demande de paiement auprès de PayTech et renvoie l'URL de
 * paiement hébergée vers laquelle rediriger la cliente.
 */
export async function requestPayment(input: RequestPaymentInput): Promise<RequestPaymentResult> {
  const apiKey = process.env.PAYTECH_API_KEY;
  const apiSecret = process.env.PAYTECH_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error("PayTech n'est pas configuré (clés API manquantes)");
  }

  const env = process.env.PAYTECH_ENV === "prod" ? "prod" : "test";

  const response = await fetch(`${BASE_URL}/payment/request-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      API_KEY: apiKey,
      API_SECRET: apiSecret,
    },
    body: JSON.stringify({
      item_name: input.itemName,
      item_price: input.amount,
      currency: "XOF",
      ref_command: input.refCommand,
      command_name: "Maison Féline",
      env,
      target_payment: input.targetPayment,
      ipn_url: input.ipnUrl,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
    }),
  });

  const data = (await response.json().catch(() => null)) as {
    success: number;
    token?: string;
    redirect_url?: string;
    message?: string;
  } | null;

  if (!data || data.success !== 1 || !data.token || !data.redirect_url) {
    throw new Error(data?.message || "La demande de paiement PayTech a échoué");
  }

  return { token: data.token, redirectUrl: data.redirect_url };
}

export interface PaytechIpnFields {
  type_event?: string;
  ref_command?: string;
  item_price?: string;
  final_item_price?: string;
  hmac_compute?: string;
}

/**
 * Vérifie la signature HMAC d'une notification PayTech (IPN). Ne jamais
 * considérer une commande comme payée sans que cette vérification passe.
 */
export function verifyPaytechSignature(fields: PaytechIpnFields): boolean {
  const apiKey = process.env.PAYTECH_API_KEY;
  const apiSecret = process.env.PAYTECH_API_SECRET;
  if (!apiKey || !apiSecret) return false;

  const received = fields.hmac_compute;
  if (!received) return false;

  const amount = fields.final_item_price ?? fields.item_price ?? "";
  const message = `${amount}|${fields.ref_command ?? ""}|${apiKey}`;
  const expected = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

  const expectedBuf = Buffer.from(expected, "utf8");
  const receivedBuf = Buffer.from(received, "utf8");
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}
