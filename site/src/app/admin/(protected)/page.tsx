import Link from "next/link";
import { getDashboardStats } from "@/lib/admin";
import { formatPrice } from "@/lib/format";

export const metadata = { title: "Tableau de bord — Admin Maison Féline" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Commandes totales", value: stats.totalOrders.toString() },
    { label: "Nouvelles commandes", value: stats.newOrders.toString() },
    { label: "Chiffre d'affaires", value: formatPrice(stats.revenue) },
  ];

  return (
    <div>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)]">Tableau de bord</h1>

      <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="border border-line p-6">
            <p className="mb-2 text-xs tracking-wider text-foreground-muted uppercase">{card.label}</p>
            <p className="font-display text-3xl">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/commandes"
          className="rounded-xs border border-accent bg-accent px-6 py-3 text-[13px] tracking-[0.14em] text-background uppercase"
        >
          Voir les commandes
        </Link>
        <Link
          href="/admin/produits/nouveau"
          className="rounded-xs border border-foreground px-6 py-3 text-[13px] tracking-[0.14em] uppercase"
        >
          Ajouter un produit
        </Link>
      </div>
    </div>
  );
}
