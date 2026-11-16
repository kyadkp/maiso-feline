"use client";

import { useActionState } from "react";
import { disableTwoFactorAction, type DisableState } from "./actions";

const initialState: DisableState = {};

export function DisableTwoFactorForm() {
  const [state, formAction, pending] = useActionState(disableTwoFactorAction, initialState);

  if (state.success) {
    return <p className="text-sm text-accent">Authentification à deux facteurs désactivée.</p>;
  }

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      <div>
        <label htmlFor="password" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Confirmez avec votre mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xs border border-line px-6 py-2.5 text-[13px] tracking-[0.14em] uppercase hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {pending ? "Désactivation…" : "Désactiver la 2FA"}
      </button>
      {state.error && <p className="text-sm text-accent">{state.error}</p>}
    </form>
  );
}
