import * as OTPAuth from "otpauth";

const ISSUER = "Maison Féline";

function buildTotp(secretBase32: string, accountLabel?: string): OTPAuth.TOTP {
  return new OTPAuth.TOTP({
    issuer: ISSUER,
    label: accountLabel,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secretBase32),
  });
}

export function generateTotpSecret(): string {
  return new OTPAuth.Secret({ size: 20 }).base32;
}

export function buildTotpUri(secretBase32: string, accountLabel: string): string {
  return buildTotp(secretBase32, accountLabel).toString();
}

// window: 1 accepte aussi le code de la période précédente/suivante (±30s),
// pour tolérer un léger décalage d'horloge entre le téléphone et le serveur.
export function verifyTotpCode(secretBase32: string, code: string): boolean {
  if (!/^\d{6}$/.test(code)) return false;
  const delta = buildTotp(secretBase32).validate({ token: code, window: 1 });
  return delta !== null;
}
