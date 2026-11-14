"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction, type SignupState } from "./actions";

const initialState: SignupState = {};

export default function InscriptionPage() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

  return (
    <div className="mx-auto max-w-[480px] px-5 py-20">
      <p className="mb-3 text-xs tracking-[0.22em] text-accent uppercase">Compte</p>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)] normal-case">Créer un compte</h1>

      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Nom complet
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Numéro de téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="77 123 45 67"
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
            minLength={6}
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>

        {state.error && <p className="text-sm text-accent">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xs border border-accent bg-accent px-6 py-3.5 text-[13px] tracking-[0.14em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground disabled:opacity-50"
        >
          {pending ? "Création…" : "Créer mon compte"}
        </button>
      </form>

      <p className="mt-6 text-sm text-foreground-muted">
        Déjà un compte ?{" "}
        <Link href="/connexion" className="text-accent underline underline-offset-4">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
