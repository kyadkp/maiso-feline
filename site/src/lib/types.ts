export type Section = "femme" | "homme" | "chaussures";
export type Gender = "femme" | "homme" | "mixte";
export type Tone = 1 | 2 | 3 | 4;

export interface ColorOption {
  name: string;
  hex: string;
}

export interface SizeOption {
  label: string;
  inStock: boolean;
  lowStock?: boolean;
}

export interface Category {
  slug: string;
  label: string;
}

export interface Product {
  slug: string;
  name: string;
  section: Section;
  gender: Gender;
  categorySlug: string;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  colors: ColorOption[];
  sizes: SizeOption[];
  description: string;
  tailles: string;
  tone: Tone;
  isNew?: boolean;
  isBestSeller?: boolean;
}
