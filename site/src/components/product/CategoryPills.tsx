import Link from "next/link";
import type { Category, Section } from "@/lib/types";

export function CategoryPills({
  section,
  categories,
  active,
}: {
  section: Section;
  categories: Category[];
  active?: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap gap-2.5">
      <Link
        href={`/${section}`}
        className={`rounded-xs border px-4 py-2 text-[13px] tracking-wider uppercase transition-colors ${
          !active ? "border-accent bg-accent text-background" : "border-line hover:border-accent"
        }`}
      >
        Tout
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/${section}/${cat.slug}`}
          className={`rounded-xs border px-4 py-2 text-[13px] tracking-wider uppercase transition-colors ${
            active === cat.slug
              ? "border-accent bg-accent text-background"
              : "border-line hover:border-accent"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
