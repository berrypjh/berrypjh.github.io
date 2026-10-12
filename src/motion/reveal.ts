/**
 * Plays each .reveal-on-scroll block's rise the first time it scrolls into view.
 * Blocks rendered later (a filter change, an opened section) are picked up too.
 */
export function startReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-revealed', '')
        io.unobserve(entry.target)
      }
    },
    /* start a little before the block's edge reaches the fold, as the scroll timeline did */
    { rootMargin: '0px 0px -8% 0px' },
  )

  const watch = (root: Element | Document) => {
    if (root instanceof Element && root.matches('.reveal-on-scroll')) io.observe(root)
    root.querySelectorAll('.reveal-on-scroll:not([data-revealed])').forEach((el) => io.observe(el))
  }

  new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => node instanceof Element && watch(node))
    }
  }).observe(document.body, { childList: true, subtree: true })

  document.documentElement.classList.add('js-reveal')
  watch(document)
}
