"use client";

import { useActionState } from "react";
import { createCategoryAction, type CategoryActionState } from "./actions";

const initialState: CategoryActionState = {};

export function CreateCategoryForm() {
  const [state, formAction, pending] = useActionState(createCategoryAction, initialState);

  return (
    <form action={formAction} className="mb-10 flex flex-wrap items-end gap-4">
      <div>
        <label htmlFor="section" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Rubrique
        </label>
        <select
          id="section"
          name="section"
          className="border border-line bg-background px-4 py-2.5 text-sm"
          defaultValue="femme"
        >
          <option value="femme">Femme</option>
          <option value="homme">Homme</option>
          <option value="chaussures">Chaussures</option>
        </select>
      </div>
      <div className="flex-1">
        <label htmlFor="label" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Nom de la catégorie
        </label>
        <input
          id="label"
          name="label"
          type="text"
          placeholder="Ex. Jupes"
          required
          className="w-full border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xs border border-accent bg-accent px-6 py-2.5 text-[13px] tracking-[0.14em] text-background uppercase disabled:opacity-50"
      >
        {pending ? "Ajout…" : "Ajouter"}
      </button>
      {state.error && <p className="w-full text-sm text-accent">{state.error}</p>}
    </form>
  );
}
