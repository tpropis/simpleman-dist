import type { ReactNode } from "react";
import AnimatedSection from "./AnimatedSection";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <AnimatedSection className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <div
          className={`mb-4 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-copper/60" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-cream-dim sm:text-lg">
          {intro}
        </p>
      )}
    </AnimatedSection>
  );
}
