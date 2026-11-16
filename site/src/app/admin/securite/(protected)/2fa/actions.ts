"use server";

import bcrypt from "bcryptjs";
import QRCode from "qrcode";
import { requireAdmin } from "@/auth";
import { prisma } from "@/lib/db";
import { buildTotpUri, generateTotpSecret, verifyTotpCode } from "@/lib/totp";

export interface GenerateState {
  error?: string;
  secret?: string;
  qrDataUrl?: string;
}

// Le secret n'est pas enregistré en base tant qu'il n'est pas confirmé par un
// code valide (confirmTwoFactorSetupAction) : il transite par un champ caché
// du formulaire entre les deux étapes, pour ne jamais laisser de secret
// orphelin si la gérante abandonne l'activation en cours de route.
export async function generateTwoFactorSetupAction(): Promise<GenerateState> {
  const session = await requireAdmin();

  const secret = generateTotpSecret();
  const uri = buildTotpUri(secret, session.user.phone);
  const qrDataUrl = await QRCode.toDataURL(uri);

  return { secret, qrDataUrl };
}

export interface ConfirmState {
  error?: string;
  success?: boolean;
}

export async function confirmTwoFactorSetupAction(
  _prevState: ConfirmState,
  formData: FormData
): Promise<ConfirmState> {
  const session = await requireAdmin();

  const secret = String(formData.get("secret") ?? "");
  const code = String(formData.get("code") ?? "").trim();

  if (!secret) return { error: "Session d'activation expirée, recommencez." };
  if (!verifyTotpCode(secret, code)) {
    return { error: "Code incorrect. Vérifiez l'heure de votre téléphone et réessayez." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorSecret: secret, twoFactorEnabled: true },
  });

  return { success: true };
}

export interface DisableState {
  error?: string;
  success?: boolean;
}

export async function disableTwoFactorAction(
  _prevState: DisableState,
  formData: FormData
): Promise<DisableState> {
  const session = await requireAdmin();

  const password = String(formData.get("password") ?? "");
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { error: "Compte introuvable" };

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return { error: "Mot de passe incorrect" };

  await prisma.user.update({
    where: { id: user.id },
    data: { twoFactorSecret: null, twoFactorEnabled: false },
  });

  return { success: true };
}
