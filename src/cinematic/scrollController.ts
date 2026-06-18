import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "./store";
import { SECTIONS } from "./layout";

gsap.registerPlugin(ScrollTrigger);

// Wires native page scroll to the shared store. We publish normalized progress
// values that each scene reads in its own useFrame loop — keeping scene logic
// colocated and letting the reduced-motion path snap to states.

let ctx: gsap.Context | null = null;

export function initScrollController() {
  const { setScroll, setSpiritsProgress, setProcessProgress, setActive, reducedMotion } =
    useStore.getState();

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setScroll(self.progress),
    });

    SECTIONS.forEach((id) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActive(id);
        },
      });
    });

    if (reducedMotion) return;

    const spiritsEl = document.getElementById("section-spirits");
    if (spiritsEl) {
      ScrollTrigger.create({
        trigger: spiritsEl,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setSpiritsProgress(self.progress),
      });
    }

    const processEl = document.getElementById("section-process");
    if (processEl) {
      ScrollTrigger.create({
        trigger: processEl,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setProcessProgress(self.progress),
      });
    }
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
  return ctx;
}

export function destroyScrollController() {
  if (ctx) {
    ctx.revert();
    ctx = null;
  }
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
