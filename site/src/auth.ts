import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { phoneSchema } from "@/lib/validation";

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/connexion" },
  providers: [
    Credentials({
      credentials: {
        phone: { label: "Téléphone", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const phoneResult = phoneSchema.safeParse(credentials?.phone);
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        if (!phoneResult.success || password.length === 0) return null;

        const user = await prisma.user.findUnique({ where: { phone: phoneResult.data } });
        if (!user) return null;

        // Compte temporairement verrouillé après trop de tentatives échouées :
        // on refuse sans préciser la raison, pour ne pas confirmer qu'il existe.
        if (user.lockedUntil && user.lockedUntil > new Date()) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);

        if (!valid) {
          const attempts = user.failedAttempts + 1;
          const lock = attempts >= MAX_FAILED_ATTEMPTS;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedAttempts: lock ? 0 : attempts,
              lockedUntil: lock ? new Date(Date.now() + LOCK_DURATION_MS) : null,
            },
          });
          return null;
        }

        if (user.failedAttempts > 0 || user.lockedUntil) {
          await prisma.user.update({
            where: { id: user.id },
            data: { failedAttempts: 0, lockedUntil: null },
          });
        }

        return { id: user.id, name: user.name, phone: user.phone, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.phone = token.phone;
      session.user.role = token.role;
      return session;
    },
  },
});

// Une Server Action reste un point d'entrée accessible indépendamment de la
// page qui l'affiche : chaque action réservée à l'admin doit donc revérifier
// elle-même la session, sans se fier uniquement au layout qui l'entoure.
export async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Accès refusé");
  }
  return session;
}
