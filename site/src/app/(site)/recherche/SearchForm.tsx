"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const url = value.trim() ? `/recherche?q=${encodeURIComponent(value.trim())}` : "/recherche";
      router.replace(url);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="mb-12 flex items-center gap-3 border-b border-foreground pb-3">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0 text-foreground-muted">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        autoFocus
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Rechercher une robe, une veste, des baskets…"
        className="w-full bg-transparent text-lg outline-none placeholder:text-foreground-muted"
      />
    </div>
  );
}
