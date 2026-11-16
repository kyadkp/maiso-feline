"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/auth";
import { createCategory, deleteCategory } from "@/lib/admin";
import type { Section } from "@/lib/types";

export interface CategoryActionState {
  error?: string;
}

const SECTIONS: Section[] = ["femme", "homme", "chaussures"];

export async function createCategoryAction(
  _prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  await requireAdmin();

  const section = String(formData.get("section") ?? "") as Section;
  const label = String(formData.get("label") ?? "").trim();

  if (!SECTIONS.includes(section) || label.length < 2) {
    return { error: "Merci de choisir une rubrique et un nom d'au moins 2 caractères." };
  }

  try {
    await createCategory(section, label);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de la création." };
  }

  revalidatePath("/admin/securite/categories");
  return {};
}

export async function deleteCategoryAction(
  _prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Catégorie invalide." };

  try {
    await deleteCategory(id);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de la suppression." };
  }

  revalidatePath("/admin/securite/categories");
  return {};
}
