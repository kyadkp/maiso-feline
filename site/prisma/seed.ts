import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { SEED_CATEGORY_TREE, SEED_PRODUCTS, type SeedSection } from "./seed-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL_POOLED ?? process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SECTION_MAP: Record<SeedSection, "FEMME" | "HOMME" | "CHAUSSURES"> = {
  femme: "FEMME",
  homme: "HOMME",
  chaussures: "CHAUSSURES",
};

async function main() {
  console.log("Seed : catégories…");
  const categoryIds = new Map<string, string>(); // "section/slug" -> id

  for (const section of Object.keys(SEED_CATEGORY_TREE) as SeedSection[]) {
    for (const cat of SEED_CATEGORY_TREE[section]) {
      const category = await prisma.category.upsert({
        where: { section_slug: { section: SECTION_MAP[section], slug: cat.slug } },
        update: { label: cat.label },
        create: { section: SECTION_MAP[section], slug: cat.slug, label: cat.label },
      });
      categoryIds.set(`${section}/${cat.slug}`, category.id);
    }
  }

  console.log("Seed : produits…");
  for (const product of SEED_PRODUCTS) {
    const categoryId = categoryIds.get(`${product.section}/${product.categorySlug}`);
    if (!categoryId) {
      console.warn(`Catégorie introuvable pour ${product.slug}, ignoré.`);
      continue;
    }
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        slug: product.slug,
        name: product.name,
        section: SECTION_MAP[product.section],
        categoryId,
        price: product.price,
        oldPrice: product.oldPrice,
        description: product.description,
        tailles: product.tailles,
        colors: JSON.parse(JSON.stringify(product.colors)),
        sizes: JSON.parse(JSON.stringify(product.sizes)),
        isNew: Boolean(product.isNew),
        isBestSeller: Boolean(product.isBestSeller),
        tone: product.tone,
      },
    });
  }

  const adminPhone = process.env.ADMIN_PHONE;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "Gérante";

  if (adminPhone && adminPassword) {
    console.log("Seed : compte admin…");
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where: { phone: adminPhone },
      update: { role: "ADMIN" },
      create: {
        phone: adminPhone,
        name: adminName,
        passwordHash,
        role: "ADMIN",
      },
    });
  } else {
    console.warn("ADMIN_PHONE / ADMIN_PASSWORD absents de .env : aucun compte admin créé.");
  }

  console.log("Seed terminé.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
