"use client";

import { useActionState } from "react";
import type { Category, Product } from "@/lib/types";
import { saveProductAction, type ProductFormState } from "./actions";

const initialState: ProductFormState = {};

function colorsToText(product?: Product): string {
  if (!product) return "Noir,#15130f\nOr,#8a6a3a";
  return product.colors.map((c) => `${c.name},${c.hex}`).join("\n");
}

function sizesToText(product?: Product): string {
  if (!product) return "S,oui\nM,oui\nL,oui\nXL,oui";
  return product.sizes.map((s) => `${s.label},${s.inStock ? "oui" : "non"}`).join("\n");
}

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const [state, formAction, pending] = useActionState(saveProductAction, initialState);

  return (
    <form action={formAction} className="max-w-[720px] space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div>
        <label htmlFor="name" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Nom du produit
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={product?.name}
          required
          className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="categoryId" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Catégorie
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product ? categories.find((c) => c.slug === product.categorySlug && c.section === product.section)?.id : undefined}
          required
          className="w-full border border-line bg-background px-4 py-3 text-sm"
        >
          <option value="" disabled>
            Choisir…
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.section === "femme" ? "Femme" : c.section === "homme" ? "Homme" : "Chaussures"} — {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Prix (FCFA)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={100}
            defaultValue={product?.price}
            required
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="oldPrice" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Prix barré (optionnel)
          </label>
          <input
            id="oldPrice"
            name="oldPrice"
            type="number"
            min={0}
            step={100}
            defaultValue={product?.oldPrice}
            className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={product?.description}
          required
          className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="tailles" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Conseil de taille
        </label>
        <textarea
          id="tailles"
          name="tailles"
          rows={2}
          defaultValue={product?.tailles}
          required
          className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="colors" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Couleurs — une par ligne : nom,code
          </label>
          <textarea
            id="colors"
            name="colors"
            rows={4}
            defaultValue={colorsToText(product)}
            required
            className="w-full border border-line bg-transparent px-4 py-3 font-mono text-xs outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="sizes" className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
            Tailles — une par ligne : taille,oui/non (en stock)
          </label>
          <textarea
            id="sizes"
            name="sizes"
            rows={4}
            defaultValue={sizesToText(product)}
            required
            className="w-full border border-line bg-transparent px-4 py-3 font-mono text-xs outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs tracking-wider text-foreground-muted uppercase">
          Photos — 5 conseillées pour une belle présentation
        </label>

        {product && product.images.length > 0 && (
          <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {product.images.map((img, i) => (
              <label key={img.id} className="group relative block cursor-pointer has-[:checked]:opacity-40">
                <input
                  type="checkbox"
                  name="removeImageIds"
                  value={img.id}
                  className="peer absolute right-1.5 top-1.5 z-10 h-4.5 w-4.5"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="aspect-[3/4] w-full rounded-xs border border-line object-cover" />
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 rounded-xs bg-accent px-1.5 py-0.5 text-[10px] text-background uppercase">
                    Principale
                  </span>
                )}
              </label>
            ))}
          </div>
        )}
        {product && product.images.length > 0 && (
          <p className="mb-3 text-xs text-foreground-muted">
            Cochez une photo pour la supprimer à l&apos;enregistrement.
          </p>
        )}

        <input
          id="images"
          name="images"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="w-full border border-line bg-transparent px-4 py-3 text-sm file:mr-3 file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-background"
        />
        <p className="mt-1.5 text-xs text-foreground-muted">
          jpg, png ou webp, 5 Mo par photo. Vous pouvez en sélectionner plusieurs à la fois ;
          elles s&apos;ajoutent à celles déjà en place. Sans photo, un visuel de remplacement élégant reste affiché.
        </p>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isNew" defaultChecked={product?.isNew} />
          Marquer « Nouveau »
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isBestSeller" defaultChecked={product?.isBestSeller} />
          Mettre en meilleure vente
        </label>
      </div>

      {state.error && <p className="text-sm text-accent">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xs border border-accent bg-accent px-7 py-3.5 text-[13px] tracking-[0.14em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground disabled:opacity-50"
      >
        {pending ? "Enregistrement…" : product ? "Mettre à jour" : "Créer le produit"}
      </button>
    </form>
  );
}
