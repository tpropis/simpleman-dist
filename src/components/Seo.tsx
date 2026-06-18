import { useEffect } from "react";

interface Props {
  title: string;
  description: string;
}

const BASE = "Simple Man Distillery";

function upsertMeta(name: string, content: string, attr: "name" | "property") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Lightweight SEO helper — no extra dependency. Sets the document title and
 * core meta/OG tags per page. Fine for a marketing SPA.
 */
export default function Seo({ title, description }: Props) {
  useEffect(() => {
    const full = title === BASE ? title : `${title} · ${BASE}`;
    document.title = full;
    upsertMeta("description", description, "name");
    upsertMeta("og:title", full, "property");
    upsertMeta("og:description", description, "property");
  }, [title, description]);

  return null;
}
