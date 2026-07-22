import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-6 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return <div className={`mb-5 space-y-1.5 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: CardProps) {
  return <h3 className={`text-lg font-semibold tracking-tight text-zinc-950 ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }: CardProps) {
  return <p className={`text-sm leading-6 text-zinc-500 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: CardProps) {
  return <div className={className} {...props} />;
}

export function CardFooter({ className = "", ...props }: CardProps) {
  return <div className={`mt-6 flex items-center gap-3 ${className}`} {...props} />;
}
