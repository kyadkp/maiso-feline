import { InfoPage } from "@/components/InfoPage";

export default function ContactPage() {
  return (
    <InfoPage eyebrow="Contact" title="Nous contacter">
      <p>
        Une adresse e-mail, un numéro WhatsApp et les horaires du service client
        de Maison Féline s&apos;afficheront ici — à nous transmettre pour
        remplacer ces informations provisoires.
      </p>
      <ul className="space-y-1.5">
        <li>WhatsApp : +221 XX XXX XX XX (à confirmer)</li>
        <li>E-mail : contact@maisonfeline.sn (à confirmer)</li>
        <li>Dakar, Sénégal</li>
      </ul>
    </InfoPage>
  );
}
