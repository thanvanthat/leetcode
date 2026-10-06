export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Rounds to 2 decimals so SVG coordinates serialize identically on server and client. */
export const r2 = (n: number) => Math.round(n * 100) / 100;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic pseudo-random generator so procedural art renders identically on server and client. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Easing shared by Framer Motion transitions. */
export const easeCine = [0.76, 0, 0.24, 1] as const;
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
