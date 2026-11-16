"use client";

import { useActionState } from "react";
import { changePasswordAction, type ChangePasswordState } from "./actions";

const initialState: ChangePasswordState = {};

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePasswordAction, initialState);

  return (
    <form action={formAction} className="max-w-sm space-y-5" key={state.success ? "done" : "form"}>
      <div>
        <label htmlFor="currentPassword" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Mot de passe actuel
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Nouveau mot de passe
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <p className="mt-1.5 text-xs text-foreground-muted">6 caractères minimum</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          className="w-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xs border border-accent bg-accent px-6 py-2.5 text-[13px] tracking-[0.14em] text-background uppercase disabled:opacity-50"
      >
        {pending ? "Enregistrement…" : "Changer le mot de passe"}
      </button>

      {state.error && <p className="text-sm text-accent">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-accent">Mot de passe changé avec succès.</p>
      )}
    </form>
  );
}
