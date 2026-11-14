// Données de départ (catalogue fictif) utilisées uniquement par le script de
// seed pour peupler la base de données la première fois. Indépendant de
// src/lib/products.ts, qui lit désormais la base plutôt que des données statiques.

export type SeedSection = "femme" | "homme" | "chaussures";

export interface SeedColor {
  name: string;
  hex: string;
}

export interface SeedSize {
  label: string;
  inStock: boolean;
  lowStock?: boolean;
}

export interface SeedCategory {
  slug: string;
  label: string;
}

export interface SeedProduct {
  slug: string;
  name: string;
  section: SeedSection;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  colors: SeedColor[];
  sizes: SeedSize[];
  description: string;
  tailles: string;
  tone: 1 | 2 | 3 | 4;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const SEED_CATEGORY_TREE: Record<SeedSection, SeedCategory[]> = {
  femme: [
    { slug: "robes", label: "Robes" },
    { slug: "chemises", label: "Chemises" },
    { slug: "manteaux", label: "Manteaux" },
    { slug: "pantalons", label: "Pantalons" },
  ],
  homme: [
    { slug: "vestes", label: "Vestes" },
    { slug: "pantalons", label: "Pantalons" },
    { slug: "chemises", label: "Chemises" },
  ],
  chaussures: [
    { slug: "baskets", label: "Baskets" },
    { slug: "mocassins", label: "Mocassins" },
    { slug: "sandales", label: "Sandales" },
  ],
};

const COLORS = {
  noir: { name: "Noir", hex: "#15130f" },
  or: { name: "Camel doré", hex: "#8a6a3a" },
  gris: { name: "Gris anthracite", hex: "#4c4c4c" },
  ivoire: { name: "Ivoire", hex: "#e8e2d5" },
  bordeaux: { name: "Bordeaux", hex: "#5c2a2a" },
  vert: { name: "Vert émeraude", hex: "#2f4a3a" },
} satisfies Record<string, SeedColor>;

function clothingSizes(outOf: string[] = []): SeedSize[] {
  return ["S", "M", "L", "XL"].map((label) => ({
    label,
    inStock: !outOf.includes(label),
  }));
}

function shoeSizes(low: string[] = [], outOf: string[] = []): SeedSize[] {
  return ["38", "39", "40", "41", "42", "43"].map((label) => ({
    label,
    inStock: !outOf.includes(label),
    lowStock: low.includes(label),
  }));
}

export const SEED_PRODUCTS: SeedProduct[] = [
  // Femme — Robes
  {
    slug: "robe-felonie",
    name: "Robe Félonie",
    section: "femme",
    categorySlug: "robes",
    price: 34000,
    colors: [COLORS.noir, COLORS.bordeaux, COLORS.ivoire],
    sizes: clothingSizes(["XL"]),
    description: "Robe fluide en crêpe léger, coupe cintrée à la taille, fermeture éclair invisible au dos. Doublure satinée, tombé souple.",
    tailles: "Taille normalement. Prendre une taille au-dessus pour un porté plus ample.",
    tone: 1,
    isNew: true,
  },
  {
    slug: "robe-sahelie",
    name: "Robe Sahélie",
    section: "femme",
    categorySlug: "robes",
    price: 39500,
    colors: [COLORS.vert, COLORS.noir],
    sizes: clothingSizes(),
    description: "Robe longue à motifs tissés, manches amples, ceinture à nouer. Coton épais, idéale mi-saison.",
    tailles: "Coupe ample, taille normalement.",
    tone: 3,
    isBestSeller: true,
  },
  // Femme — Chemises
  {
    slug: "chemise-lynxia",
    name: "Chemise Lynxia",
    section: "femme",
    categorySlug: "chemises",
    price: 27000,
    colors: [COLORS.ivoire, COLORS.noir],
    sizes: clothingSizes(["S"]),
    description: "Chemise en popeline, col officier, poignets boutonnés. Coupe droite, tissu respirant.",
    tailles: "Coupe droite, taille normalement.",
    tone: 4,
  },
  {
    slug: "chemise-okapi",
    name: "Chemise Okapi",
    section: "femme",
    categorySlug: "chemises",
    price: 25500,
    colors: [COLORS.or, COLORS.ivoire],
    sizes: clothingSizes(),
    description: "Chemise fluide à motifs graphiques subtils, manches 3/4, boutons nacre.",
    tailles: "Coupe fluide, taille normalement.",
    tone: 2,
  },
  // Femme — Manteaux
  {
    slug: "manteau-saheline",
    name: "Manteau Sahéline",
    section: "femme",
    categorySlug: "manteaux",
    price: 72000,
    oldPrice: 57600,
    colors: [COLORS.noir, COLORS.gris],
    sizes: clothingSizes(["S", "XL"]),
    description: "Manteau long en lainage, col tailleur, doublure chaude. Coupe structurée, parfait pour les soirées fraîches.",
    tailles: "Coupe ajustée, taille normalement.",
    tone: 2,
  },
  {
    slug: "manteau-nyassa",
    name: "Manteau Nyassa",
    section: "femme",
    categorySlug: "manteaux",
    price: 68000,
    colors: [COLORS.bordeaux, COLORS.noir],
    sizes: clothingSizes(["XL"]),
    description: "Manteau oversize en drap de laine, poches plaquées, ceinture amovible.",
    tailles: "Coupe ample, prendre sa taille habituelle.",
    tone: 4,
  },
  // Femme — Pantalons
  {
    slug: "pantalon-zibeline",
    name: "Pantalon Zibeline",
    section: "femme",
    categorySlug: "pantalons",
    price: 29000,
    colors: [COLORS.noir, COLORS.ivoire],
    sizes: clothingSizes(),
    description: "Pantalon large taille haute, pinces marquées, tissu fluide à belle tenue.",
    tailles: "Taille haute, coupe ample.",
    tone: 1,
  },
  {
    slug: "pantalon-kalahari",
    name: "Pantalon Kalahari",
    section: "femme",
    categorySlug: "pantalons",
    price: 31500,
    colors: [COLORS.or, COLORS.gris],
    sizes: clothingSizes(["S"]),
    description: "Pantalon droit en toile structurée, poches italiennes, ceinture à boucle laiton.",
    tailles: "Coupe droite, taille normalement.",
    tone: 3,
  },
  // Homme — Vestes
  {
    slug: "veste-panthere",
    name: "Veste Panthère",
    section: "homme",
    categorySlug: "vestes",
    price: 58000,
    colors: [COLORS.noir, COLORS.or, COLORS.gris],
    sizes: clothingSizes(["XL"]),
    description: "Veste structurée en lainage dense, doublure satinée, fermeture boutons corne. Coupe ajustée, épaules marquées. Fabrication soignée, petite série.",
    tailles: "Coupe ajustée, taille normalement. Prendre une taille au-dessus pour un porté plus ample.",
    tone: 1,
    isNew: true,
  },
  {
    slug: "veste-leopold",
    name: "Veste Léopold",
    section: "homme",
    categorySlug: "vestes",
    price: 61000,
    colors: [COLORS.gris, COLORS.noir],
    sizes: clothingSizes(),
    description: "Veste mi-saison en coton ciré, col montant, poches zippées.",
    tailles: "Coupe ajustée, taille normalement.",
    tone: 2,
    isBestSeller: true,
  },
  // Homme — Pantalons
  {
    slug: "pantalon-griot",
    name: "Pantalon Griot",
    section: "homme",
    categorySlug: "pantalons",
    price: 31000,
    colors: [COLORS.noir, COLORS.gris, COLORS.or],
    sizes: clothingSizes(["S"]),
    description: "Pantalon chino en coton sergé, coupe droite, finitions renforcées.",
    tailles: "Coupe droite, taille normalement.",
    tone: 3,
  },
  {
    slug: "pantalon-savane",
    name: "Pantalon Savane",
    section: "homme",
    categorySlug: "pantalons",
    price: 28500,
    colors: [COLORS.ivoire, COLORS.gris],
    sizes: clothingSizes(),
    description: "Pantalon décontracté en lin mélangé, taille élastiquée, idéal climat chaud.",
    tailles: "Coupe ample, taille normalement.",
    tone: 1,
  },
  // Homme — Chemises
  {
    slug: "chemise-serengeti",
    name: "Chemise Serengeti",
    section: "homme",
    categorySlug: "chemises",
    price: 24000,
    colors: [COLORS.ivoire, COLORS.bordeaux],
    sizes: clothingSizes(["XL"]),
    description: "Chemise légère en lin, col classique, coupe droite respirante.",
    tailles: "Coupe droite, taille normalement.",
    tone: 3,
    isNew: true,
  },
  {
    slug: "chemise-obsidienne",
    name: "Chemise Obsidienne",
    section: "homme",
    categorySlug: "chemises",
    price: 26500,
    colors: [COLORS.noir, COLORS.gris],
    sizes: clothingSizes(),
    description: "Chemise en popeline stretch, coupe ajustée, idéale du bureau au soir.",
    tailles: "Coupe ajustée, taille normalement.",
    tone: 4,
  },
  // Chaussures — Baskets
  {
    slug: "baskets-griffe",
    name: "Baskets Griffe",
    section: "chaussures",
    categorySlug: "baskets",
    price: 42500,
    colors: [COLORS.noir, COLORS.ivoire],
    sizes: shoeSizes(["43"], []),
    description: "Baskets en cuir souple, semelle légère, détails métallisés discrets.",
    tailles: "Chausse normalement. Prendre une demi-pointure au-dessus si vous êtes entre deux tailles.",
    tone: 2,
    isNew: true,
  },
  {
    slug: "baskets-savane",
    name: "Baskets Savane",
    section: "chaussures",
    categorySlug: "baskets",
    price: 45000,
    colors: [COLORS.gris, COLORS.noir],
    sizes: shoeSizes([], ["38"]),
    description: "Baskets montantes en toile et cuir, semelle crantée, maintien renforcé.",
    tailles: "Chausse normalement.",
    tone: 4,
  },
  // Chaussures — Mocassins
  {
    slug: "mocassins-lynx",
    name: "Mocassins Lynx",
    section: "chaussures",
    categorySlug: "mocassins",
    price: 39900,
    colors: [COLORS.noir, COLORS.or],
    sizes: shoeSizes(["42"], []),
    description: "Mocassins en cuir patiné, semelle cousue, confort toute la journée.",
    tailles: "Chausse normalement.",
    tone: 1,
    isBestSeller: true,
  },
  {
    slug: "mocassins-reine",
    name: "Mocassins Reine",
    section: "chaussures",
    categorySlug: "mocassins",
    price: 37500,
    colors: [COLORS.bordeaux, COLORS.noir],
    sizes: shoeSizes([], []),
    description: "Mocassins féminins à talon plat, cuir souple, boucle dorée.",
    tailles: "Chausse normalement.",
    tone: 3,
  },
  // Chaussures — Sandales
  {
    slug: "sandales-oryx",
    name: "Sandales Oryx",
    section: "chaussures",
    categorySlug: "sandales",
    price: 26500,
    colors: [COLORS.or, COLORS.ivoire],
    sizes: shoeSizes(["39"], []),
    description: "Sandales plates en cuir tressé, brides ajustables, finition artisanale.",
    tailles: "Chausse normalement.",
    tone: 4,
  },
  {
    slug: "sandales-taiga",
    name: "Sandales Taïga",
    section: "chaussures",
    categorySlug: "sandales",
    price: 24000,
    colors: [COLORS.noir, COLORS.gris],
    sizes: shoeSizes([], ["38", "43"]),
    description: "Sandales robustes à double boucle, semelle épaisse, usage quotidien.",
    tailles: "Chausse normalement.",
    tone: 2,
  },
];
