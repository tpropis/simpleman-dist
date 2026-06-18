import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface AsLink extends BaseProps {
  to: string;
  href?: never;
  onClick?: never;
}
interface AsAnchor extends BaseProps {
  href: string;
  to?: never;
  onClick?: never;
}
interface AsButton extends BaseProps {
  onClick: () => void;
  to?: never;
  href?: never;
}

type Props = AsLink | AsAnchor | AsButton;

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  solid:
    "text-charcoal-900 bg-gradient-to-b from-gold-light to-copper border border-gold-light/40 shadow-glow-sm hover:from-gold hover:to-copper-deep hover:shadow-glow",
  outline:
    "text-cream border border-copper/50 hover:border-gold-light hover:text-gold-light bg-charcoal-700/30 hover:bg-charcoal-600/50",
  ghost:
    "text-cream-dim border border-transparent hover:text-gold-light hover:border-copper/30",
};

export default function PremiumButton(props: Props) {
  const { children, variant = "solid", size = "md", className = "" } = props;
  const cls = [
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium uppercase tracking-widest2 transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5",
    sizes[size],
    variants[variant],
    className,
  ].join(" ");

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "solid" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </span>
      )}
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    const external = props.href.startsWith("http");
    return (
      <a
        href={props.href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={(props as AsButton).onClick} className={cls}>
      {inner}
    </button>
  );
}
