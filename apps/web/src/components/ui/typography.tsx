import type { HTMLAttributes, LabelHTMLAttributes } from "react";

type TypographyProps = HTMLAttributes<HTMLElement>;

export function Heading({ className = "", ...props }: TypographyProps) {
  return (
    <h1
      className={`text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl ${className}`}
      {...props}
    />
  );
}

export function SectionTitle({ className = "", ...props }: TypographyProps) {
  return <h2 className={`text-2xl font-semibold tracking-tight text-zinc-950 ${className}`} {...props} />;
}

export function Text({ className = "", ...props }: TypographyProps) {
  return <p className={`text-base leading-7 text-zinc-600 ${className}`} {...props} />;
}

export function SmallText({ className = "", ...props }: TypographyProps) {
  return <p className={`text-sm leading-6 text-zinc-500 ${className}`} {...props} />;
}

export function Label({ className = "", ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm font-medium text-zinc-900 ${className}`} {...props} />;
}
