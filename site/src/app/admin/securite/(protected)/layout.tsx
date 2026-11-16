import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth, signOut } from "@/auth";

const ADMIN_LINKS = [
  { href: "/admin/securite", label: "Tableau de bord" },
  { href: "/admin/securite/commandes", label: "Commandes" },
  { href: "/admin/securite/produits", label: "Produits" },
  { href: "/admin/securite/categories", label: "Catégories" },
];

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/securite/connexion");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/admin/securite" className="font-display text-lg tracking-wider uppercase">
            Maison Féline — Admin
          </Link>
          <nav className="flex flex-wrap gap-5 text-[13px] tracking-wider uppercase">
            {ADMIN_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/securite/mot-de-passe"
              className="rounded-xs border border-line px-4 py-2 text-xs tracking-wider uppercase hover:border-accent hover:text-accent"
            >
              Mot de passe
            </Link>
            <Link
              href="/admin/securite/2fa"
              className="rounded-xs border border-line px-4 py-2 text-xs tracking-wider uppercase hover:border-accent hover:text-accent"
            >
              2FA
            </Link>
            <SignOutForm />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1240px] px-5 py-10">{children}</main>
    </div>
  );
}

function SignOutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/admin/securite/connexion" });
      }}
    >
      <button className="rounded-xs border border-line px-4 py-2 text-xs tracking-wider uppercase hover:border-accent hover:text-accent">
        Déconnexion
      </button>
    </form>
  );
}
