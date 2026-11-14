export type Section = "femme" | "homme" | "chaussures";
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
  id: string;
  slug: string;
  label: string;
  section: Section;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  section: Section;
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
  images: ProductImage[];
}
