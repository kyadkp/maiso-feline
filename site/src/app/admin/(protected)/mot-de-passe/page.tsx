import { ChangePasswordForm } from "./ChangePasswordForm";

export const metadata = { title: "Mot de passe — Admin Maison Féline" };

export default function AdminPasswordPage() {
  return (
    <div>
      <h1 className="mb-8 text-[clamp(28px,5vw,40px)]">Mot de passe</h1>
      <ChangePasswordForm />
    </div>
  );
}
