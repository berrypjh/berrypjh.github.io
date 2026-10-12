/**
 * Scene colours, taken from tokens.css so the object shares the page's palette.
 * Kept as constants: the renderer needs them before any lighting, and they change rarely.
 * Lit surfaces render darker than their base colour, so structure uses the lighter tokens.
 */
export const PALETTE = {
  /** --color-bg */
  background: '#0b0b0a',
  /** --color-border-strong: graphite plates */
  graphite: '#3d392f',
  /** --color-text-muted: structural frames */
  structure: '#918c82',
  /** --color-text-soft: smoked planes, the one highlight tile and the fill light */
  smoke: '#b8b2a6',
  /** --color-text: the key light and the sky of the ambient light */
  light: '#f1eee7',
  /** --color-gold */
  gold: '#b89a5e',
  /** --color-gold-soft: warm rim light */
  goldSoft: '#d3b976',
  /** --color-text-faint: rails and plate outlines, darker than the frames but still readable */
  faint: '#6e685d',
} as const
