import type { ReactNode } from "react";

export function InfoPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[760px] px-5 py-20">
      {eyebrow && (
        <p className="mb-3 text-xs tracking-[0.22em] text-accent uppercase">{eyebrow}</p>
      )}
      <h1 className="mb-8 text-[clamp(28px,5vw,44px)] normal-case">{title}</h1>
      <div className="space-y-4 text-[15px] leading-7 text-foreground-muted">{children}</div>
    </div>
  );
}
