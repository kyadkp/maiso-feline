import { InfoPage } from "@/components/InfoPage";

export default function CommandePage() {
  return (
    <InfoPage eyebrow="Commande" title="La validation de commande arrive bientôt">
      <p>
        Le formulaire de livraison, la création de la commande et le choix du
        paiement (Wave, Orange Money, à la livraison) seront mis en place aux
        étapes 3 et 5 du projet, une fois la base de données et les paiements
        connectés.
      </p>
      <p>
        Votre panier reste enregistré sur cet appareil en attendant — rien
        n&apos;est perdu.
      </p>
    </InfoPage>
  );
}
