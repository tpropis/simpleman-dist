import { create } from "zustand";
import { detectTier, prefersReducedMotion, type Tier } from "./perfTier";
import type { SectionId } from "./layout";

// Single source of truth shared between the scrolling DOM, the GSAP controller,
// and the WebGL scenes. Scene useFrame loops read transient values via
// useStore.getState() (no re-render); React UI subscribes with selectors so
// only the bits that change re-render.

interface Pointer {
  x: number;
  y: number;
}

interface CinematicState {
  tier: Tier;
  reducedMotion: boolean;
  ready: boolean;
  scroll: number; // global 0..1
  spiritsProgress: number; // section-local 0..1
  processProgress: number; // section-local 0..1
  active: SectionId;
  pointer: Pointer;
  setReady: (v: boolean) => void;
  setScroll: (v: number) => void;
  setSpiritsProgress: (v: number) => void;
  setProcessProgress: (v: number) => void;
  setActive: (v: SectionId) => void;
}

export const useStore = create<CinematicState>((set) => ({
  tier: detectTier(),
  reducedMotion: prefersReducedMotion(),
  ready: false,
  scroll: 0,
  spiritsProgress: 0,
  processProgress: 0,
  active: "hero",
  pointer: { x: 0, y: 0 },
  setReady: (ready) => set({ ready }),
  setScroll: (scroll) => set({ scroll }),
  setSpiritsProgress: (spiritsProgress) => set({ spiritsProgress }),
  setProcessProgress: (processProgress) => set({ processProgress }),
  setActive: (active) => set({ active }),
}));
