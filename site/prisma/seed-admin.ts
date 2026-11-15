import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Script léger exécuté à chaque déploiement (voir vercel.json) : crée ou met
// à jour uniquement le compte admin à partir des variables d'environnement.
// Contrairement à seed.ts (catalogue fictif, usage local uniquement), il ne
// touche jamais aux produits/catégories réels de la boutique.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL_POOLED ?? process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPhone = process.env.ADMIN_PHONE;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "Gérante";

  if (!adminPhone || !adminPassword) {
    console.warn("ADMIN_PHONE / ADMIN_PASSWORD absents : aucun compte admin créé ou mis à jour.");
    return;
  }

  const existing = await prisma.user.findUnique({ where: { phone: adminPhone } });
  if (existing) {
    console.log("Compte admin déjà présent, rien à faire.");
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.create({
    data: { phone: adminPhone, name: adminName, passwordHash, role: "ADMIN" },
  });
  console.log("Compte admin créé.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
