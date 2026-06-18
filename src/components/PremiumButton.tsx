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
interface AsLink extends BaseProps { to: string; href?: never; onClick?: never }
interface AsAnchor extends BaseProps { href: string; to?: never; onClick?: never }
interface AsButton extends BaseProps { onClick: () => void; to?: never; href?: never }
type Props = AsLink | AsAnchor | AsButton;

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.72rem]",
  md: "px-6 py-3.5 text-sm",
  lg: "px-7 py-4 text-sm",
};

const variants: Record<Variant, string> = {
  solid: "gradient-ember text-charcoal-900 hover:brightness-110",
  outline: "border border-border text-cream hover:border-copper hover:text-gold",
  ghost: "text-gold hover:text-cream",
};

export default function PremiumButton(props: Props) {
  const { children, variant = "solid", size = "md", className = "" } = props;
  const cls = [
    "inline-flex items-center justify-center gap-2 rounded-sm font-semibold uppercase tracking-widest2 transition",
    sizes[size],
    variants[variant],
    className,
  ].join(" ");

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {children}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    const external = props.href.startsWith("http");
    return (
      <a href={props.href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={(props as AsButton).onClick} className={cls}>
      {children}
    </button>
  );
}
