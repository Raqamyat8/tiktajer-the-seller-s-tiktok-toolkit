import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        {eyebrow && (
          <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold opacity-80">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-3xl leading-[1.35] font-black md:text-5xl md:leading-[1.3]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-loose opacity-75 md:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="opacity-40">/</span>}
        </span>
      ))}
    </nav>
  );
}
