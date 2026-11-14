import type { Section } from "./types";

export const SECTION_LABELS: Record<Section, string> = {
  femme: "Femme",
  homme: "Homme",
  chaussures: "Chaussures",
};

export const SECTION_TO_DB = {
  femme: "FEMME",
  homme: "HOMME",
  chaussures: "CHAUSSURES",
} as const;

export const SECTION_FROM_DB: Record<string, Section> = {
  FEMME: "femme",
  HOMME: "homme",
  CHAUSSURES: "chaussures",
};
