import type { Category, ColorOption, Product, Section, SizeOption } from "./types";

export const SECTION_LABELS: Record<Section, string> = {
  femme: "Femme",
  homme: "Homme",
  chaussures: "Chaussures",
};

export const CATEGORY_TREE: Record<Section, Category[]> = {
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
} satisfies Record<string, ColorOption>;

function clothingSizes(outOf: string[] = []): SizeOption[] {
  return ["S", "M", "L", "XL"].map((label) => ({
    label,
    inStock: !outOf.includes(label),
  }));
}

function shoeSizes(low: string[] = [], outOf: string[] = []): SizeOption[] {
  return ["38", "39", "40", "41", "42", "43"].map((label) => ({
    label,
    inStock: !outOf.includes(label),
    lowStock: low.includes(label),
  }));
}

export const PRODUCTS: Product[] = [
  // Femme — Robes
  {
    slug: "robe-felonie",
    name: "Robe Félonie",
    section: "femme",
    gender: "femme",
    categorySlug: "robes",
    categoryLabel: "Robes",
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
    gender: "femme",
    categorySlug: "robes",
    categoryLabel: "Robes",
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
    gender: "femme",
    categorySlug: "chemises",
    categoryLabel: "Chemises",
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
    gender: "femme",
    categorySlug: "chemises",
    categoryLabel: "Chemises",
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
    gender: "femme",
    categorySlug: "manteaux",
    categoryLabel: "Manteaux",
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
    gender: "femme",
    categorySlug: "manteaux",
    categoryLabel: "Manteaux",
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
    gender: "femme",
    categorySlug: "pantalons",
    categoryLabel: "Pantalons",
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
    gender: "femme",
    categorySlug: "pantalons",
    categoryLabel: "Pantalons",
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
    gender: "homme",
    categorySlug: "vestes",
    categoryLabel: "Vestes",
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
    gender: "homme",
    categorySlug: "vestes",
    categoryLabel: "Vestes",
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
    gender: "homme",
    categorySlug: "pantalons",
    categoryLabel: "Pantalons",
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
    gender: "homme",
    categorySlug: "pantalons",
    categoryLabel: "Pantalons",
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
    gender: "homme",
    categorySlug: "chemises",
    categoryLabel: "Chemises",
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
    gender: "homme",
    categorySlug: "chemises",
    categoryLabel: "Chemises",
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
    gender: "mixte",
    categorySlug: "baskets",
    categoryLabel: "Baskets",
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
    gender: "homme",
    categorySlug: "baskets",
    categoryLabel: "Baskets",
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
    gender: "homme",
    categorySlug: "mocassins",
    categoryLabel: "Mocassins",
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
    gender: "femme",
    categorySlug: "mocassins",
    categoryLabel: "Mocassins",
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
    gender: "femme",
    categorySlug: "sandales",
    categoryLabel: "Sandales",
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
    gender: "mixte",
    categorySlug: "sandales",
    categoryLabel: "Sandales",
    price: 24000,
    colors: [COLORS.noir, COLORS.gris],
    sizes: shoeSizes([], ["38", "43"]),
    description: "Sandales robustes à double boucle, semelle épaisse, usage quotidien.",
    tailles: "Chausse normalement.",
    tone: 2,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsBySection(section: Section): Product[] {
  return PRODUCTS.filter((p) => p.section === section);
}

export function getProductsByCategory(section: Section, categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.section === section && p.categorySlug === categorySlug);
}

export function getNewProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.isBestSeller || p.oldPrice);
}

export function getPromotions(): Product[] {
  return PRODUCTS.filter((p) => p.oldPrice);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.section === product.section
  ).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      SECTION_LABELS[p.section].toLowerCase().includes(q)
  );
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}
