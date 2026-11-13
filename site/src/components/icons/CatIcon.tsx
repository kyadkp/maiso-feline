export function CatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 20 L38 4 L43 23 Z M50 20 L62 4 L57 23 Z M50 20 C29 20 16 37 16 56 C16 74 31 88 50 88 C69 88 84 74 84 56 C84 37 71 20 50 20 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="39" cy="54" r="2.4" fill="currentColor" />
      <circle cx="61" cy="54" r="2.4" fill="currentColor" />
      <path
        d="M50 60 L45 66 M50 60 L55 66 M50 60 L50 66"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
