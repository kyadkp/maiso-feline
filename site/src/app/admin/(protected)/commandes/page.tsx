import { listOrdersAdmin } from "@/lib/admin";
import { formatPrice } from "@/lib/format";
import { StatusSelect } from "./StatusSelect";

export const metadata = { title: "Commandes — Admin Maison Féline" };

const PAYMENT_LABELS: Record<string, string> = {
  WAVE: "Wave",
  ORANGE_MONEY: "Orange Money",
  COD: "À la livraison",
};

const STATUS_FILTERS = [
  { value: "ALL", label: "Tous les statuts" },
  { value: "NOUVELLE", label: "Nouvelle" },
  { value: "CONFIRMEE", label: "Confirmée" },
  { value: "LIVREE", label: "Livrée" },
  { value: "ANNULEE", label: "Annulée" },
];

export default async function AdminCommandesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status = "ALL", q = "" } = await searchParams;
  const orders = await listOrdersAdmin({ status: status as "ALL", search: q });

  return (
    <div>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)]">Commandes</h1>

      <form className="mb-8 flex flex-wrap gap-4" method="GET">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Rechercher par nom, téléphone ou numéro…"
          className="min-w-64 flex-1 border border-line bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <select
          name="status"
          defaultValue={status}
          className="border border-line bg-background px-4 py-2.5 text-sm"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xs border border-foreground px-5 py-2.5 text-[13px] tracking-wider uppercase hover:bg-foreground hover:text-background"
        >
          Filtrer
        </button>
      </form>

      <p className="mb-4 text-sm text-foreground-muted">
        {orders.length} commande{orders.length > 1 ? "s" : ""}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs tracking-wider text-foreground-muted uppercase">
              <th className="py-3 pr-4">Numéro</th>
              <th className="py-3 pr-4">Client</th>
              <th className="py-3 pr-4">Téléphone</th>
              <th className="py-3 pr-4">Adresse</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Paiement</th>
              <th className="py-3 pr-4">Montant</th>
              <th className="py-3 pr-4">Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-display">{order.orderNumber}</td>
                <td className="py-3 pr-4">{order.customerName}</td>
                <td className="py-3 pr-4">{order.phone}</td>
                <td className="py-3 pr-4">
                  {order.address}, {order.city}
                </td>
                <td className="py-3 pr-4">{new Date(order.createdAt).toLocaleDateString("fr-FR")}</td>
                <td className="py-3 pr-4">{PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}</td>
                <td className="py-3 pr-4 text-accent">{formatPrice(order.totalAmount)}</td>
                <td className="py-3 pr-4">
                  <StatusSelect orderId={order.id} status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="py-10 text-center text-foreground-muted">Aucune commande ne correspond.</p>
        )}
      </div>
    </div>
  );
}
