import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // Connexion avec pooling (DATABASE_URL_POOLED) : nécessaire en environnement
  // serverless (Vercel), où chaque exécution peut ouvrir sa propre connexion.
  const connectionString = process.env.DATABASE_URL_POOLED ?? process.env.DATABASE_URL;
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
