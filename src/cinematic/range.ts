// Small math helpers shared by the camera rig and scenes.

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1));
  return t * t * (3 - 2 * t);
}

/** Triangular bump that peaks at `center` and falls to 0 by ±`half`. */
export function bump(x: number, center: number, half: number): number {
  return Math.max(0, 1 - Math.abs(x - center) / half);
}

export interface Key {
  s: number;
  y: number;
}

/** Piecewise-linear sample of keyframes [{s,y}] at scroll position s (0..1). */
export function sampleKeys(keys: Key[], s: number): number {
  if (s <= keys[0].s) return keys[0].y;
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (s >= a.s && s <= b.s) {
      const t = (s - a.s) / (b.s - a.s || 1);
      return lerp(a.y, b.y, t);
    }
  }
  return keys[keys.length - 1].y;
}
