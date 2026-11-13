import Link from "next/link";
import { CatIcon } from "@/components/icons/CatIcon";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 pt-16 pb-8">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-10 pb-12 sm:grid-cols-4 sm:gap-10">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="mb-4 flex items-center gap-2.5 font-display text-lg tracking-wider uppercase">
            <CatIcon className="h-6 w-6 text-accent" />
            Maison Féline
          </Link>
          <p className="max-w-[280px] text-sm text-foreground-muted">
            Vêtements et chaussures pour femme et homme. Conçu et expédié depuis le Sénégal.
          </p>
        </div>

        <div>
          <p className="mb-4.5 text-xs tracking-wider text-foreground-muted uppercase">Boutique</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/nouveautes" className="hover:text-accent">Nouveautés</Link></li>
            <li><Link href="/femme" className="hover:text-accent">Femme</Link></li>
            <li><Link href="/homme" className="hover:text-accent">Homme</Link></li>
            <li><Link href="/chaussures" className="hover:text-accent">Chaussures</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4.5 text-xs tracking-wider text-foreground-muted uppercase">Aide</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/suivi-commande" className="hover:text-accent">Suivre ma commande</Link></li>
            <li><Link href="/livraison-retours" className="hover:text-accent">Livraison &amp; retours</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/compte" className="hover:text-accent">Mon compte</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4.5 text-xs tracking-wider text-foreground-muted uppercase">Paiement accepté</p>
          <div className="flex flex-wrap gap-2.5">
            <span className="rounded-xs border border-line px-2.5 py-1.5 text-[11px] text-foreground-muted">Wave</span>
            <span className="rounded-xs border border-line px-2.5 py-1.5 text-[11px] text-foreground-muted">Orange Money</span>
            <span className="rounded-xs border border-line px-2.5 py-1.5 text-[11px] text-foreground-muted">Paiement à la livraison</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2.5 border-t border-line pt-6 text-xs text-foreground-muted">
        <span>© 2026 Maison Féline — Dakar, Sénégal</span>
        <span className="flex flex-wrap gap-x-2">
          <Link href="/mentions-legales" className="hover:text-accent">Mentions légales</Link>
          ·
          <Link href="/conditions-generales" className="hover:text-accent">Conditions générales</Link>
          ·
          <Link href="/politique-confidentialite" className="hover:text-accent">Politique de confidentialité</Link>
        </span>
      </div>
    </footer>
  );
}
