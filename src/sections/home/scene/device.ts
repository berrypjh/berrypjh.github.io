/**
 * Media queries the scene adapts to, created once and shared.
 * Live objects: read `.matches` at use time, or listen for `change`.
 */
export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')

/** Primary input is a finger: no hover, smaller GPU budget, calmer motion. */
export const coarsePointer = matchMedia('(pointer: coarse)')

/**
 * Pixel ratio cap. Thin lines stay crisp at 1.5 on phones, where each extra
 * step costs fill rate for little visible gain; desktops get up to 2.
 */
export function pixelRatio() {
  return Math.min(window.devicePixelRatio, coarsePointer.matches ? 1.5 : 2)
}
