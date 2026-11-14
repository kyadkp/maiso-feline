import { InfoPage } from "@/components/InfoPage";

export default function LivraisonRetoursPage() {
  return (
    <InfoPage eyebrow="Livraison & retours" title="Livraison & retours">
      <p>
        Livraison en 24 à 72h à Dakar, 3 à 5 jours dans le reste du pays
        (délais indicatifs, à confirmer avant la mise en ligne).
      </p>
      <p>
        Retour possible sous 7 jours si l&apos;article n&apos;a pas été porté ni lavé,
        dans son emballage d&apos;origine.
      </p>
      <p>
        Paiement à la livraison : un acompte de 50 % est demandé avant l&apos;expédition,
        le solde étant réglé à la réception. Wave et Orange Money seront bientôt
        disponibles directement sur le site.
      </p>
    </InfoPage>
  );
}
