import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
      role: "CLIENT" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    phone: string;
    role: "CLIENT" | "ADMIN";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    phone: string;
    role: "CLIENT" | "ADMIN";
  }
}
