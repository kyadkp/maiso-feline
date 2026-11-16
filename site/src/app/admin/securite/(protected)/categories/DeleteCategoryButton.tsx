"use client";

import { useActionState } from "react";
import { deleteCategoryAction, type CategoryActionState } from "./actions";

const initialState: CategoryActionState = {};

export function DeleteCategoryButton({ id, label }: { id: string; label: string }) {
  const [state, formAction, pending] = useActionState(deleteCategoryAction, initialState);

  return (
    <div>
      <form
        action={formAction}
        onSubmit={(e) => {
          if (!confirm(`Supprimer la catégorie « ${label} » ?`)) e.preventDefault();
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          disabled={pending}
          className="text-xs text-foreground-muted underline underline-offset-4 hover:text-accent disabled:opacity-50"
        >
          Supprimer
        </button>
      </form>
      {state.error && <p className="mt-1 text-xs text-accent">{state.error}</p>}
    </div>
  );
}
