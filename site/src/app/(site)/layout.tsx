import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Les pages du site lisent le catalogue en direct depuis la base de données
// (produits/catégories gérés par l'admin) : on force le rendu dynamique pour
// qu'un changement fait par la gérante apparaisse immédiatement, sans attendre
// un nouveau déploiement.
export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </CartProvider>
  );
}
