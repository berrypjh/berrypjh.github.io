import { MathUtils } from 'three'

/**
 * Scroll distance over which the handoff completes, as a share of the stage height,
 * counted from the moment the stage's top edge passes the top of the viewport.
 * Until then the Hero is being read, and the scene holds still.
 */
const SPAN = 0.6

/**
 * Hero-to-Selected-Work handoff: 0 while the stage is fully in view, easing to 1
 * as it scrolls out past the top. A pure reading of layout, so it is correct after
 * fast scrolls, reverse scrolls, resizes and hash jumps alike.
 */
export function handoffProgress(area: Element) {
  const { top, height } = area.getBoundingClientRect()
  return MathUtils.smoothstep(-top / (height * SPAN), 0, 1)
}

/**
 * Calls `onScroll` for scrolls while `area` is on screen, and once whenever it
 * enters or leaves, so the last frame before it disappears is the settled one.
 * Off screen, scrolling costs nothing. Returns the cleanup function.
 */
export function watchScroll(area: Element, onScroll: () => void) {
  let visible = false
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    onScroll()
  })
  const scroll = () => {
    if (visible) onScroll()
  }

  observer.observe(area)
  window.addEventListener('scroll', scroll, { passive: true })

  return () => {
    observer.disconnect()
    window.removeEventListener('scroll', scroll)
  }
}
