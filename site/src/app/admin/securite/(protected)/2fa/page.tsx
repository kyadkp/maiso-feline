import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { DisableTwoFactorForm } from "./DisableTwoFactorForm";
import { TwoFactorSetup } from "./TwoFactorSetup";

export const metadata = { title: "Authentification à deux facteurs — Admin Maison Féline" };

export default async function AdminTwoFactorPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session!.user.id } });
  const enabled = user?.twoFactorEnabled ?? false;

  return (
    <div>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)]">Authentification à deux facteurs</h1>
      {enabled ? (
        <div>
          <p className="mb-6 text-sm text-foreground-muted">
            La 2FA est activée sur ce compte : un code de votre application d&apos;authentification est
            demandé à chaque connexion admin.
          </p>
          <DisableTwoFactorForm />
        </div>
      ) : (
        <TwoFactorSetup />
      )}
    </div>
  );
}
