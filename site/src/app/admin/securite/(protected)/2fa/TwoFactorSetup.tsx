"use client";

import { useActionState } from "react";
import {
  confirmTwoFactorSetupAction,
  generateTwoFactorSetupAction,
  type ConfirmState,
  type GenerateState,
} from "./actions";

const initialGenerate: GenerateState = {};
const initialConfirm: ConfirmState = {};

export function TwoFactorSetup() {
  const [genState, genAction, genPending] = useActionState(generateTwoFactorSetupAction, initialGenerate);
  const [confirmState, confirmAction, confirmPending] = useActionState(
    confirmTwoFactorSetupAction,
    initialConfirm
  );

  if (confirmState.success) {
    return <p className="text-sm text-accent">Authentification à deux facteurs activée avec succès.</p>;
  }

  if (!genState.secret) {
    return (
      <form action={genAction} className="max-w-md">
        <p className="mb-5 text-sm text-foreground-muted">
          Installez une application d&apos;authentification (Google Authenticator, Authy…) sur votre
          téléphone, puis générez un code QR à scanner.
        </p>
        <button
          type="submit"
          disabled={genPending}
          className="rounded-xs border border-accent bg-accent px-6 py-2.5 text-[13px] tracking-[0.14em] text-background uppercase disabled:opacity-50"
        >
          {genPending ? "Génération…" : "Générer le code QR"}
        </button>
        {genState.error && <p className="mt-3 text-sm text-accent">{genState.error}</p>}
      </form>
    );
  }

  return (
    <div className="max-w-sm">
      <p className="mb-4 text-sm text-foreground-muted">
        Scannez ce code avec votre application d&apos;authentification, puis entrez le code à 6 chiffres
        affiché pour confirmer l&apos;activation.
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={genState.qrDataUrl} alt="Code QR d'activation de la 2FA" className="mb-4 h-48 w-48" />
      <p className="mb-5 break-all text-xs text-foreground-muted">Clé manuelle : {genState.secret}</p>
      <form action={confirmAction} className="space-y-4">
        <input type="hidden" name="secret" value={genState.secret} />
        <div>
          <label htmlFor="code" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Code à 6 chiffres
          </label>
          <input
            id="code"
            name="code"
            inputMode="numeric"
            maxLength={6}
            required
            className="w-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
          />
        </div>
        <button
          type="submit"
          disabled={confirmPending}
          className="rounded-xs border border-accent bg-accent px-6 py-2.5 text-[13px] tracking-[0.14em] text-background uppercase disabled:opacity-50"
        >
          {confirmPending ? "Vérification…" : "Confirmer et activer"}
        </button>
        {confirmState.error && <p className="text-sm text-accent">{confirmState.error}</p>}
      </form>
    </div>
  );
}
