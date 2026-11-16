import { notFound } from "next/navigation";
import { getProductForAdmin, listCategoriesAdmin } from "@/lib/admin";
import { ProductForm } from "../ProductForm";

export const metadata = { title: "Modifier un produit — Admin Maison Féline" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductForAdmin(id), listCategoriesAdmin()]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)]">Modifier « {product.name} »</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
