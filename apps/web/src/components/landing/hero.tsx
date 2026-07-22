import type { ReactNode } from "react";
import { Container } from "../ui/container";

type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  visual?: ReactNode;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  visual,
}: HeroProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className={`grid gap-12 ${visual ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:items-center lg:gap-16" : ""}`}>
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="mb-5 text-sm font-medium tracking-wide text-zinc-600">{eyebrow}</p>
            ) : null}

            <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              {description}
            </p>

            {primaryAction || secondaryAction ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {primaryAction}
                {secondaryAction}
              </div>
            ) : null}
          </div>
          {visual ? <div className="w-full">{visual}</div> : null}
        </div>
      </Container>
    </section>
  );
}
