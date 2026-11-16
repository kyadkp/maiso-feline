"use client";

import { useActionState } from "react";
import { adminLoginAction, type AdminLoginState } from "./actions";

const initialState: AdminLoginState = {};

export default function AdminConnexionPage() {
  const [state, formAction, pending] = useActionState(adminLoginAction, initialState);

  return (
    <div className="mx-auto flex min-h-screen max-w-[420px] flex-col justify-center px-5 py-20">
      <p className="mb-3 text-xs tracking-[0.22em] text-accent uppercase">Espace gérante</p>
      <h1 className="mb-8 text-[clamp(26px,5vw,36px)]">Connexion admin</h1>

      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Numéro de téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={13}
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="totpCode" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Code 2FA (si activée)
          </label>
          <input
            id="totpCode"
            name="totpCode"
            inputMode="numeric"
            maxLength={6}
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        {state.error && <p className="text-sm text-accent">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xs border border-accent bg-accent px-6 py-3.5 text-[13px] tracking-[0.14em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground disabled:opacity-50"
        >
          {pending ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
