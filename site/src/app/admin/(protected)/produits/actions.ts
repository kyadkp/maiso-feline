"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProduct,
  deleteProduct,
  saveUploadedImage,
  updateProduct,
  type ProductInput,
} from "@/lib/admin";
import type { ColorOption, SizeOption } from "@/lib/types";

export interface ProductFormState {
  error?: string;
}

function parseColors(text: string): ColorOption[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, hex] = line.split(",").map((s) => s.trim());
      return { name: name || "Couleur", hex: hex || "#000000" };
    });
}

function parseSizes(text: string): SizeOption[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, stock] = line.split(",").map((s) => s.trim());
      return { label: label ?? "", inStock: stock?.toLowerCase() !== "non" };
    })
    .filter((s) => s.label.length > 0);
}

export async function saveProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const price = Number(formData.get("price"));
  const oldPriceRaw = String(formData.get("oldPrice") ?? "").trim();
  const oldPrice = oldPriceRaw ? Number(oldPriceRaw) : undefined;
  const description = String(formData.get("description") ?? "").trim();
  const tailles = String(formData.get("tailles") ?? "").trim();
  const colors = parseColors(String(formData.get("colors") ?? ""));
  const sizes = parseSizes(String(formData.get("sizes") ?? ""));
  const isNew = formData.get("isNew") === "on";
  const isBestSeller = formData.get("isBestSeller") === "on";
  const imageFiles = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const removeImageIds = formData.getAll("removeImageIds").map(String).filter(Boolean);

  if (name.length < 2) return { error: "Le nom du produit est trop court." };
  if (!categoryId) return { error: "Choisissez une catégorie." };
  if (!Number.isFinite(price) || price <= 0) return { error: "Le prix doit être un nombre positif." };
  if (oldPrice !== undefined && (!Number.isFinite(oldPrice) || oldPrice <= price)) {
    return { error: "Le prix barré doit être supérieur au prix actuel." };
  }
  if (description.length < 10) return { error: "La description est trop courte." };
  if (!tailles) return { error: "Indiquez un conseil de taille." };
  if (colors.length === 0) return { error: "Ajoutez au moins une couleur." };
  if (sizes.length === 0) return { error: "Ajoutez au moins une taille." };

  const addImageUrls: string[] = [];
  for (const file of imageFiles) {
    try {
      addImageUrls.push(await saveUploadedImage(file));
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Erreur lors de l'envoi d'une photo." };
    }
  }

  const input: ProductInput = {
    name,
    categoryId,
    price,
    oldPrice,
    description,
    tailles,
    colors,
    sizes,
    isNew,
    isBestSeller,
    addImageUrls,
    removeImageIds,
  };

  try {
    if (id) {
      await updateProduct(id, input);
    } else {
      await createProduct(input);
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de l'enregistrement." };
  }

  revalidatePath("/admin/produits");
  redirect("/admin/produits");
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteProduct(id);
  revalidatePath("/admin/produits");
}
