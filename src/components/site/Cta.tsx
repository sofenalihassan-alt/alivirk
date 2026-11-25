import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";
import type { NavPath } from "@/lib/site";

type Variant = "gold" | "glass" | "ghost";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-sm px-6 py-3 font-display text-sm font-medium transition-[background,color,box-shadow,border-color] duration-500";

const variants: Record<Variant, string> = {
  gold: "bg-primary text-primary-foreground hover:bg-gold-soft",
  glass: "border-b border-gold/40 text-foreground hover:border-gold hover:bg-glass",
  ghost: "text-foreground hover:text-gold",
};

function Inner({ children, icon }: { children: ReactNode; icon: boolean }) {
  return (
    <>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 cta-sheen opacity-0 group-hover:opacity-100 group-hover:animate-[sheen_1.2s_ease]" />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );
}

export function CtaLink({
  to,
  children,
  variant = "gold",
  icon = true,
  className,
}: {
  to: NavPath;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  className?: string | undefined;
}) {
  return (
    <Magnetic>
      <Link to={to} className={cn(base, variants[variant], className)}>
        <Inner icon={icon}>{children}</Inner>
      </Link>
    </Magnetic>
  );
}

export function CtaAnchor({
  href,
  children,
  variant = "glass",
  icon = true,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  className?: string | undefined;
}) {
  const external = href.startsWith("http");
  return (
    <Magnetic>
      <a
        href={href}
        className={cn(base, variants[variant], className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Inner icon={icon}>{children}</Inner>
      </a>
    </Magnetic>
  );
}
