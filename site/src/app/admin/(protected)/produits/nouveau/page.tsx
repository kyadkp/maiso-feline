import { listCategoriesAdmin } from "@/lib/admin";
import { ProductForm } from "../ProductForm";

export const metadata = { title: "Nouveau produit — Admin Maison Féline" };

export default async function NewProductPage() {
  const categories = await listCategoriesAdmin();

  return (
    <div>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)]">Nouveau produit</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
