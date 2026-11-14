import Link from "next/link";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return (
    <div className="mx-auto max-w-[600px] px-5 py-24 text-center">
      <p className="mb-3 text-xs tracking-[0.22em] text-accent uppercase">Commande confirmée</p>
      <h1 className="mb-6 text-[clamp(28px,5vw,40px)]">Merci pour votre commande</h1>
      <p className="mb-2 text-foreground-muted">Votre numéro de commande :</p>
      <p className="mb-8 font-display text-2xl tracking-wider">{orderNumber}</p>
      <p className="mb-3 text-sm text-foreground-muted">
        Conservez ce numéro avec votre numéro de téléphone pour suivre votre commande.
        Vous serez contactée pour organiser la livraison.
      </p>
      <p className="mb-10 text-sm text-accent">
        Un acompte de 50 % est demandé avant l&apos;expédition ; le solde sera réglé à la
        livraison.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/suivi-commande"
          className="rounded-xs border border-accent bg-accent px-6 py-3 text-[13px] tracking-[0.14em] text-background uppercase"
        >
          Suivre ma commande
        </Link>
        <Link href="/" className="rounded-xs border border-foreground px-6 py-3 text-[13px] tracking-[0.14em] uppercase">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
