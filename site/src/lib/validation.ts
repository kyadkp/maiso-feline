import { z } from "zod";

// Normalise un numéro sénégalais (avec ou sans +221/221, espaces, tirets)
// vers sa forme locale à 9 chiffres (ex. "771234567").
export const phoneSchema = z
  .string()
  .trim()
  .transform((val) => val.replace(/[\s.-]/g, "").replace(/^(\+221|221)/, ""))
  .refine((val) => /^7\d{8}$/.test(val), {
    message: "Numéro de téléphone sénégalais invalide (ex. 77 123 45 67)",
  });

export const passwordSchema = z
  .string()
  .min(6, "Le mot de passe doit contenir au moins 6 caractères");

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Le nom est trop court").max(80),
  phone: phoneSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, "Mot de passe requis"),
});

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Le nom est trop court").max(80),
  phone: phoneSchema,
  address: z.string().trim().min(5, "Adresse trop courte").max(200),
  city: z.string().trim().min(2, "Ville trop courte").max(80),
  paymentMethod: z.enum(["WAVE", "ORANGE_MONEY", "COD"]),
});

// Le client n'envoie que slug/couleur/taille/quantité : le prix et le nom
// sont toujours relus depuis le catalogue côté serveur, jamais fournis par le client.
export const cartItemInputSchema = z.object({
  slug: z.string().min(1),
  color: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
});

export const cartItemsSchema = z.array(cartItemInputSchema).min(1, "Le panier est vide");

export const trackOrderSchema = z.object({
  orderNumber: z.string().trim().min(3).max(40),
  phone: phoneSchema,
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les deux mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
