import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "./db";
import { SECTION_FROM_DB, SECTION_TO_DB } from "./sections";
import type { Category, ColorOption, Product, Section, SizeOption } from "./types";
import type { OrderStatus, Prisma } from "@/generated/prisma/client";

// ---------- Tableau de bord ----------

export async function getDashboardStats() {
  const [totalOrders, newOrders, revenueAgg] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "NOUVELLE" } }),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
  ]);

  return {
    totalOrders,
    newOrders,
    revenue: revenueAgg._sum.totalAmount ?? 0,
  };
}

// ---------- Commandes ----------

export interface OrderFilters {
  status?: OrderStatus | "ALL";
  search?: string;
}

export async function listOrdersAdmin(filters: OrderFilters = {}) {
  const where: Prisma.OrderWhereInput = {};
  if (filters.status && filters.status !== "ALL") where.status = filters.status;

  const search = filters.search?.trim();
  if (search) {
    where.OR = [
      { customerName: { contains: search } },
      { phone: { contains: search } },
      { orderNumber: { contains: search } },
    ];
  }

  return prisma.order.findMany({
    where,
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  return prisma.order.update({ where: { id: orderId }, data: { status } });
}

// ---------- Catégories ----------

function toCategory(c: { id: string; slug: string; label: string; section: string }): Category {
  return { id: c.id, slug: c.slug, label: c.label, section: SECTION_FROM_DB[c.section] };
}

export async function listCategoriesAdmin(): Promise<(Category & { productCount: number })[]> {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: [{ section: "asc" }, { label: "asc" }],
  });
  return categories.map((c) => ({ ...toCategory(c), productCount: c._count.products }));
}

function slugify(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCategory(section: Section, label: string) {
  const slug = slugify(label);
  if (!slug) throw new Error("Nom de catégorie invalide");
  return prisma.category.create({ data: { section: SECTION_TO_DB[section], slug, label } });
}

export async function deleteCategory(id: string) {
  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    throw new Error(
      `Impossible de supprimer : ${productCount} produit(s) sont encore dans cette catégorie.`
    );
  }
  await prisma.category.delete({ where: { id } });
}

// ---------- Produits ----------

const PRODUCT_INCLUDE = { category: true, images: { orderBy: { position: "asc" as const } } };

function toProduct(p: {
  id: string;
  slug: string;
  name: string;
  section: string;
  category: { slug: string; label: string };
  price: number;
  oldPrice: number | null;
  description: string;
  tailles: string;
  colors: unknown;
  sizes: unknown;
  isNew: boolean;
  isBestSeller: boolean;
  tone: number;
  images: { id: string; url: string }[];
}): Product {
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
    tone: p.tone as 1 | 2 | 3 | 4,
    isNew: p.isNew,
    isBestSeller: p.isBestSeller,
    images: p.images.map((img) => ({ id: img.id, url: img.url })),
  };
}

export async function listProductsAdmin(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: PRODUCT_INCLUDE,
    orderBy: { createdAt: "desc" },
  });
  return products.map(toProduct);
}

export async function getProductForAdmin(id: string): Promise<Product | undefined> {
  const product = await prisma.product.findUnique({ where: { id }, include: PRODUCT_INCLUDE });
  return product ? toProduct(product) : undefined;
}

export interface ProductInput {
  name: string;
  categoryId: string;
  price: number;
  oldPrice?: number;
  description: string;
  tailles: string;
  colors: ColorOption[];
  sizes: SizeOption[];
  isNew: boolean;
  isBestSeller: boolean;
  addImageUrls?: string[];
  removeImageIds?: string[];
}

function uniqueSlug(name: string, suffix = 0): string {
  const base = slugify(name);
  return suffix === 0 ? base : `${base}-${suffix}`;
}

export async function createProduct(input: ProductInput) {
  const category = await prisma.category.findUnique({ where: { id: input.categoryId } });
  if (!category) throw new Error("Catégorie introuvable");

  let slug = uniqueSlug(input.name);
  let attempt = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = uniqueSlug(input.name, attempt++);
  }

  return prisma.product.create({
    data: {
      slug,
      name: input.name,
      section: category.section,
      categoryId: category.id,
      price: input.price,
      oldPrice: input.oldPrice,
      description: input.description,
      tailles: input.tailles,
      colors: JSON.parse(JSON.stringify(input.colors)),
      sizes: JSON.parse(JSON.stringify(input.sizes)),
      isNew: input.isNew,
      isBestSeller: input.isBestSeller,
      tone: ((Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4),
      images: {
        create: (input.addImageUrls ?? []).map((url, position) => ({ url, position })),
      },
    },
  });
}

export async function updateProduct(id: string, input: ProductInput) {
  const category = await prisma.category.findUnique({ where: { id: input.categoryId } });
  if (!category) throw new Error("Catégorie introuvable");

  if (input.removeImageIds?.length) {
    const removed = await prisma.productImage.findMany({
      where: { id: { in: input.removeImageIds }, productId: id },
    });
    await prisma.productImage.deleteMany({ where: { id: { in: input.removeImageIds }, productId: id } });
    await Promise.all(removed.map((img) => deleteUploadedImage(img.url)));
  }

  if (input.addImageUrls?.length) {
    const existingCount = await prisma.productImage.count({ where: { productId: id } });
    await prisma.productImage.createMany({
      data: input.addImageUrls.map((url, i) => ({ productId: id, url, position: existingCount + i })),
    });
  }

  return prisma.product.update({
    where: { id },
    data: {
      name: input.name,
      section: category.section,
      categoryId: category.id,
      price: input.price,
      oldPrice: input.oldPrice ?? null,
      description: input.description,
      tailles: input.tailles,
      colors: JSON.parse(JSON.stringify(input.colors)),
      sizes: JSON.parse(JSON.stringify(input.sizes)),
      isNew: input.isNew,
      isBestSeller: input.isBestSeller,
    },
  });
}

export async function deleteProduct(id: string) {
  const images = await prisma.productImage.findMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  await Promise.all(images.map((img) => deleteUploadedImage(img.url)));
}

// ---------- Upload de photo ----------

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

export async function saveUploadedImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Format d'image non autorisé (jpg, png ou webp uniquement)");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image trop lourde (5 Mo maximum)");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}

export async function deleteUploadedImage(url: string): Promise<void> {
  if (!url.startsWith("/uploads/")) return;
  try {
    await unlink(path.join(UPLOAD_DIR, path.basename(url)));
  } catch {
    // le fichier n'existe déjà plus : rien à faire
  }
}
