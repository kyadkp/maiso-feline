import { prisma } from "./db";
import type { Category as DbCategory, Product as DbProduct } from "@/generated/prisma/client";
import { SECTION_FROM_DB, SECTION_LABELS, SECTION_TO_DB } from "./sections";
import type { ColorOption, Category, Product, Section, SizeOption, Tone } from "./types";

type DbProductWithCategory = DbProduct & { category: DbCategory };

function toProduct(p: DbProductWithCategory): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    section: SECTION_FROM_DB[p.section],
    categorySlug: p.category.slug,
    categoryLabel: p.category.label,
    price: p.price,
    oldPrice: p.oldPrice ?? undefined,
    colors: p.colors as unknown as ColorOption[],
    sizes: p.sizes as unknown as SizeOption[],
    description: p.description,
    tailles: p.tailles,
    tone: p.tone as Tone,
    isNew: p.isNew,
    isBestSeller: p.isBestSeller,
    imageUrl: p.imageUrl,
  };
}

function toCategory(c: DbCategory): Category {
  return { id: c.id, slug: c.slug, label: c.label, section: SECTION_FROM_DB[c.section] };
}

export async function getCategories(section: Section): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    where: { section: SECTION_TO_DB[section] },
  });
  return categories.map(toCategory);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  return product ? toProduct(product) : undefined;
}

export async function getProductsBySection(section: Section): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { section: SECTION_TO_DB[section] },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(toProduct);
}

export async function getProductsByCategory(
  section: Section,
  categorySlug: string
): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { section: SECTION_TO_DB[section], category: { slug: categorySlug } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(toProduct);
}

export async function getNewProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isNew: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(toProduct);
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { OR: [{ isBestSeller: true }, { oldPrice: { not: null } }] },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(toProduct);
}

export async function getPromotions(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { oldPrice: { not: null } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(toProduct);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { section: SECTION_TO_DB[product.section], slug: { not: product.slug } },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return products.map(toProduct);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  // SQLite ne gère pas la recherche insensible à la casse nativement avec Prisma :
  // on filtre en mémoire sur un catalogue qui reste petit à ce stade du projet.
  const products = await prisma.product.findMany({ include: { category: true } });
  return products
    .map(toProduct)
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        SECTION_LABELS[p.section].toLowerCase().includes(q)
    );
}
