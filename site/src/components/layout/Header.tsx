"use client";

import Link from "next/link";
import { useState } from "react";
import { CatIcon } from "@/components/icons/CatIcon";
import { useCart } from "@/components/cart/CartContext";

const NAV_LINKS = [
  { href: "/nouveautes", label: "Nouveautés" },
  { href: "/femme", label: "Femme" },
  { href: "/homme", label: "Homme" },
  { href: "/chaussures", label: "Chaussures" },
  { href: "/promotions", label: "Promotions" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4.5">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base tracking-wider whitespace-nowrap uppercase sm:gap-2.5 sm:text-xl"
          onClick={() => setOpen(false)}
        >
          <CatIcon className="h-5.5 w-5.5 shrink-0 text-accent sm:h-6.5 sm:w-6.5" />
          Maison Féline
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] tracking-wider uppercase md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-transparent py-1.5 transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4.5">
          <Link href="/recherche" aria-label="Recherche">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <Link href="/compte" aria-label="Compte" className="hidden sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </Link>
          <Link href="/panier" aria-label="Panier" className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
              <path d="M6 8h12l-1 13H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-background">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5 p-1 md:hidden"
          >
            <span className="h-px w-5.5 bg-foreground" />
            <span className="h-px w-5.5 bg-foreground" />
            <span className="h-px w-5.5 bg-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line px-5 py-4 text-[13px] tracking-wider uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/compte"
            onClick={() => setOpen(false)}
            className="block px-5 py-4 text-[13px] tracking-wider uppercase sm:hidden"
          >
            Mon compte
          </Link>
        </nav>
      )}
    </header>
  );
}
