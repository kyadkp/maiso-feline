"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { loginSchema } from "@/lib/validation";

export interface AdminLoginState {
  error?: string;
}

export async function adminLoginAction(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const parsed = loginSchema.safeParse({
    phone: formData.get("phone"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }

  try {
    await signIn("credentials", {
      phone: parsed.data.phone,
      password: parsed.data.password,
      totpCode: String(formData.get("totpCode") ?? ""),
      redirectTo: "/admin",
    });
    return {};
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        error:
          "Identifiants ou code 2FA incorrects, ou compte temporairement bloqué après plusieurs essais.",
      };
    }
    throw err;
  }
}
