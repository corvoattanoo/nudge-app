import Link from "next/link";
import type { ReactNode } from "react";

type NavigationItem = {
  href: string;
  label: string;
  active?: boolean;
};

type NavbarProps = {
  items?: NavigationItem[];
  action?: ReactNode;
};

const defaultItems: NavigationItem[] = [
  { href: "/", label: "Home", active: true },
  { href: "/groups", label: "Groups" },
  { href: "/plans", label: "Plans" },
];

export function Navbar({ items = defaultItems, action }: NavbarProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="shrink-0 text-lg font-semibold tracking-tight text-zinc-950">
          Nudge
        </Link>

        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 ${
                item.active
                  ? "text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </nav>
    </header>
  );
}
