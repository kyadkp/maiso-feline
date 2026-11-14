import { listCategoriesAdmin } from "@/lib/admin";
import { SECTION_LABELS } from "@/lib/sections";
import type { Section } from "@/lib/types";
import { CreateCategoryForm } from "./CreateCategoryForm";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

export const metadata = { title: "Catégories — Admin Maison Féline" };

const SECTIONS: Section[] = ["femme", "homme", "chaussures"];

export default async function AdminCategoriesPage() {
  const categories = await listCategoriesAdmin();

  return (
    <div>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)]">Catégories</h1>

      <CreateCategoryForm />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {SECTIONS.map((section) => (
          <div key={section}>
            <h2 className="mb-4 text-xs tracking-wider text-accent uppercase">{SECTION_LABELS[section]}</h2>
            <div className="divide-y divide-line border-y border-line">
              {categories
                .filter((c) => c.section === section)
                .map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm">{c.label}</p>
                      <p className="text-xs text-foreground-muted">
                        {c.productCount} produit{c.productCount > 1 ? "s" : ""}
                      </p>
                    </div>
                    <DeleteCategoryButton id={c.id} label={c.label} />
                  </div>
                ))}
              {categories.filter((c) => c.section === section).length === 0 && (
                <p className="py-3 text-sm text-foreground-muted">Aucune catégorie.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
