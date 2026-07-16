import type { ReactNode } from "react";

export function DemoSection({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
        Demo {index}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">{description}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}
