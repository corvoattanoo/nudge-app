import type { HTMLAttributes } from "react";

type BadgeVariant = "neutral" | "accent" | "outline";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-zinc-100 text-zinc-700",
  accent: "bg-[#fff0eb] text-[#c2410c]",
  outline: "border border-zinc-200 bg-white text-zinc-600",
};

export function Badge({ className = "", variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
