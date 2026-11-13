import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { phoneSchema } from "@/lib/validation";

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

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, name: user.name, phone: user.phone };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.phone = token.phone;
      return session;
    },
  },
});
