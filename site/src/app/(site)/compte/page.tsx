import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { getOrdersForUser } from "@/lib/orders";
import { formatPrice } from "@/lib/format";

const STATUS_LABELS: Record<string, string> = {
  NOUVELLE: "Nouvelle",
  CONFIRMEE: "Confirmée",
  LIVREE: "Livrée",
  ANNULEE: "Annulée",
};

export default async function ComptePage() {
  const session = await auth();
  if (!session?.user) redirect("/connexion");

  const orders = await getOrdersForUser(session.user.id);

  return (
    <div className="mx-auto max-w-[760px] px-5 py-14">
      <div className="mb-10 flex items-start justify-between gap-5">
        <div>
          <p className="mb-2 text-xs tracking-wider text-foreground-muted uppercase">Mon compte</p>
          <h1 className="text-[clamp(28px,5vw,40px)] normal-case">{session.user.name}</h1>
          <p className="text-sm text-foreground-muted">{session.user.phone}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="rounded-xs border border-line px-4 py-2.5 text-xs tracking-wider uppercase hover:border-accent hover:text-accent">
            Se déconnecter
          </button>
        </form>
      </div>

      <h2 className="mb-6 text-lg">Mes commandes</h2>

      {orders.length === 0 ? (
        <p className="text-foreground-muted">Vous n&apos;avez pas encore passé de commande.</p>
      ) : (
        <div className="divide-y divide-line border-y border-line">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-5">
              <div>
                <p className="font-display text-base normal-case">{order.orderNumber}</p>
                <p className="text-sm text-foreground-muted">
                  {new Date(order.createdAt).toLocaleDateString("fr-FR")} — {order.items.length} article
                  {order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-accent">{formatPrice(order.totalAmount)}</p>
                <p className="text-sm text-foreground-muted">
                  {STATUS_LABELS[order.status] ?? order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
