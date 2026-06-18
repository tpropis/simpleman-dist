// Cheap, synchronous device-capability probe (run once at boot). A few coarse
// signals pick a quality tier the scenes read to size particle counts and
// material cost. Ported from the freedaim cinematic engine.

export interface Tier {
  name: "high" | "mid" | "low" | "static";
  webgl: boolean;
  transmission: boolean;
  transmissionSamples: number;
  particles: number;
  dpr: number;
  antialias: boolean;
}

function detectGPU(): { ok: boolean; renderer: string } {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return { ok: false, renderer: "" };
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg
      ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)).toLowerCase()
      : "";
    return { ok: true, renderer };
  } catch {
    return { ok: false, renderer: "" };
  }
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const PRESETS: Record<Tier["name"], Tier> = {
  high: { name: "high", webgl: true, transmission: true, transmissionSamples: 6, particles: 700, dpr: 2, antialias: true },
  mid: { name: "mid", webgl: true, transmission: true, transmissionSamples: 3, particles: 450, dpr: 1.5, antialias: true },
  low: { name: "low", webgl: true, transmission: false, transmissionSamples: 0, particles: 250, dpr: 1, antialias: false },
  static: { name: "static", webgl: false, transmission: false, transmissionSamples: 0, particles: 0, dpr: 1, antialias: false },
};

export function detectTier(): Tier {
  if (typeof window === "undefined") return PRESETS.static;
  const { ok, renderer } = detectGPU();
  if (!ok) return PRESETS.static;

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
  const dpr = window.devicePixelRatio || 1;
  const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 480;
  const weakGPU = /swiftshader|llvmpipe|software|mali-4|adreno 3|powervr sgx/i.test(renderer);

  if (weakGPU || (isMobile && (cores <= 4 || mem <= 2)) || smallScreen) {
    return { ...PRESETS.low, dpr: Math.min(dpr, 1.5) };
  }
  if (isMobile || cores <= 4 || mem <= 4) {
    return { ...PRESETS.mid, dpr: Math.min(dpr, 2) };
  }
  return { ...PRESETS.high, dpr: Math.min(dpr, 2) };
}
