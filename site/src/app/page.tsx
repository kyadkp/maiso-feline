import Link from "next/link";
import { CatIcon } from "@/components/icons/CatIcon";
import { Reveal } from "@/components/Reveal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getNewProducts, getBestSellers } from "@/lib/products";

const MARQUEE_ITEMS = [
  "Livraison partout au Sénégal",
  "Paiement Wave & Orange Money",
  "Paiement à la livraison disponible",
  "Nouveautés chaque mois",
];

export default function Home() {
  const nouveautes = getNewProducts();
  const bestSellers = getBestSellers();

  return (
    <>
      <section className="relative flex min-h-[92vh] items-end overflow-hidden border-b border-line">
        <div className="absolute top-1/2 right-[-5%] h-[70vh] w-[70vh] -translate-y-1/2 text-accent opacity-10">
          <CatIcon className="h-full w-full" />
        </div>
        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-20">
          <Reveal>
            <p className="mb-7 text-xs tracking-[0.22em] text-accent uppercase">
              Collection Automne — Hiver
            </p>
          </Reveal>
          <Reveal className="mb-7">
            <h1 className="text-[clamp(44px,10vw,128px)] leading-[0.95]">
              <span className="block">L&apos;élégance</span>
              <span className="block">a du caractère</span>
            </h1>
          </Reveal>
          <Reveal className="mb-9">
            <p className="max-w-[440px] text-foreground-muted">
              Vêtements et chaussures pour femme et homme, pensés pour une
              silhouette affirmée, au Sénégal et au-delà.
            </p>
          </Reveal>
          <Reveal>
            <Link
              href="#nouveautes"
              className="inline-flex items-center gap-2.5 rounded-xs border border-accent bg-accent px-7 py-3.5 text-[13px] tracking-[0.14em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground"
            >
              Découvrir la collection
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="overflow-hidden border-b border-line py-4">
        <div className="marquee-track flex gap-12 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-display text-[15px] tracking-[0.1em] text-foreground-muted uppercase">
              {item}
            </span>
          ))}
        </div>
      </div>

      <section id="nouveautes" className="px-5 py-24">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12 flex items-baseline justify-between gap-5">
            <h2 className="text-[clamp(32px,5vw,56px)]">Nouveautés</h2>
            <Link href="/nouveautes" className="rounded-xs border border-foreground px-6 py-3 text-[13px] tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-background">
              Tout voir
            </Link>
          </Reveal>
          <ProductGrid products={nouveautes} />
        </div>
      </section>

      <section className="relative flex min-h-[70vh] items-center overflow-hidden border-y border-line">
        <div className="absolute top-1/2 left-[-10%] h-[60vh] w-[60vh] -translate-y-1/2 text-accent opacity-6">
          <CatIcon className="h-full w-full" />
        </div>
        <Reveal className="relative mx-5 ml-auto max-w-[560px] px-5 text-right">
          <p className="mb-3 text-xs tracking-[0.22em] text-accent uppercase">L&apos;atelier</p>
          <h2 className="mb-5 text-[clamp(32px,5vw,56px)]">
            Chaque pièce a sa propre démarche
          </h2>
          <p className="mb-7 text-foreground-muted">
            Des matières choisies, des coupes précises, une attention au
            détail qui se voit et se sent. Maison Féline habille celles et
            ceux qui avancent avec assurance.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-xs border border-foreground px-7 py-3.5 text-[13px] tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-background">
            Notre histoire
          </Link>
        </Reveal>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-12 flex items-baseline justify-between gap-5">
            <h2 className="text-[clamp(32px,5vw,56px)]">Meilleures ventes</h2>
            <Link href="/promotions" className="rounded-xs border border-foreground px-6 py-3 text-[13px] tracking-[0.14em] uppercase transition-colors hover:bg-foreground hover:text-background">
              Tout voir
            </Link>
          </Reveal>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      <Reveal className="bg-accent px-5 py-16 text-center text-background">
        <p className="mb-3 text-xs tracking-[0.22em] uppercase">Offre limitée</p>
        <h2 className="mb-3.5 text-[clamp(32px,5vw,56px)] text-background">
          -15% sur toute la nouvelle collection
        </h2>
        <p className="mb-7">Avec le code FELINE15, jusqu&apos;au 30 novembre.</p>
        <Link href="/promotions" className="inline-flex items-center gap-2.5 rounded-xs border border-background px-7 py-3.5 text-[13px] tracking-[0.14em] uppercase transition-colors hover:bg-background hover:text-accent">
          En profiter
        </Link>
      </Reveal>
    </>
  );
}
