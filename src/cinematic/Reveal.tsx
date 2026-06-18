import { useEffect, useState } from "react";
import type { ElementType, ReactNode, CSSProperties } from "react";

interface Props {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  children: ReactNode;
}

/** A calm fade + rise on mount. Re-keyed elements re-mount and re-animate. */
export default function Reveal({
  as: Tag = "span",
  className = "",
  style,
  delay = 0,
  children,
}: Props) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <Tag
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
