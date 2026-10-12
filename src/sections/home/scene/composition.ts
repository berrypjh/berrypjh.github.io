/**
 * Living Frontend Architecture: an exploded view of a browser rendering a page.
 *
 * World units, y up, the page centred on the origin and facing +z (the viewer).
 * Five layers pulled apart along z, back to front:
 *   chrome     — the window: title bar, window controls, a tab and the address bar
 *   layout     — the dashboard's frame: a sidebar (logo, nav) and a top bar (search, alerts, avatar)
 *   content    — its cards: three KPI tiles, the main chart (its line the one gold line), a donut
 *   components — what floats over it: a tooltip on the chart's peak, an add button
 *   overlay    — the cursor: it rests by the tooltip, and follows the real pointer over the page
 * No text anywhere: every element reads as dashboard UI by shape alone.
 * Front layers read shifted left and down from the angled view, so the cards sit a little right
 * of centre, while everything still fits the page once the layers close.
 *
 * Part positions are local to their layer's plane. Each layer sits at LAYER_DEPTH times a
 * runtime spread, so the scene can assemble, open up under the pointer, and close into one page.
 */

export type Role = 'surface' | 'smoked' | 'frame' | 'rail' | 'highlight' | 'accent'

export const LAYERS = ['chrome', 'layout', 'content', 'components', 'overlay'] as const

export type Layer = (typeof LAYERS)[number]

/** Resting distance of each layer from the page plane. */
export const LAYER_DEPTH: Record<Layer, number> = {
  chrome: -1,
  layout: -0.5,
  content: 0,
  components: 0.5,
  overlay: 1,
}

type Vec2 = [number, number]
type Vec3 = [number, number, number]

/**
 * Response while the scene's cursor is over the part, or over another part of the same group.
 * lift: travel toward the viewer; glow: added brightness 0–1; grow: added height, as a share,
 * rising from the part's base the way a bar in a chart does.
 */
export type Hover = { group: string; lift?: number; glow?: number; grow?: number }

/** `name` lets the runtime find a part it animates on its own; `rotation` turns it about the viewer's axis. */
type Common = { role: Role; layer: Layer; position: Vec3; rotation?: number; name?: string; hover?: Hover }

export type Part = Common &
  (
    /** Thin box: the window and its bars, chart bars, gridlines, line segments. size = [width, height, depth]. */
    | { kind: 'box'; size: Vec3 }
    /** Open rectangular frame. size = [width, height], border = rim width. */
    | { kind: 'frame'; size: Vec2; border: number }
    /** Flat round shape facing the viewer. */
    | { kind: 'disc'; radius: number }
    /** Flat ring, or an arc of one from `start` through `sweep` radians (anticlockwise from +x). */
    | { kind: 'ring'; inner: number; outer: number; start?: number; sweep?: number }
    /** Rounded rectangle, extruded thin: cards, bars, fields. A radius of half the height makes a pill. */
    | { kind: 'panel'; size: Vec2; radius: number }
    /** Flat outline extruded to a thin solid, points in the layer plane. */
    | { kind: 'polygon'; points: Vec2[] }
  )

const disc = (layer: Layer, role: Role, x: number, y: number, radius: number, hover?: Hover, z = 0): Part => ({
  kind: 'disc',
  role,
  layer,
  radius,
  position: [x, y, z],
  hover,
})

/** A straight line from `a` to `b`, drawn as a thin box turned to match, `z` off its layer's plane. */
function segment(layer: Layer, role: Role, a: Vec2, b: Vec2, width: number, hover?: Hover, z = 0): Part {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1])
  return {
    kind: 'box',
    role,
    layer,
    size: [length, width, 0.02],
    position: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, z],
    rotation: Math.atan2(b[1] - a[1], b[0] - a[0]),
    hover,
  }
}

/** Page geometry: the window, and the viewport under its title bar. */
const WIDTH = 3.2
const TOP = 1.05
const VIEWPORT_TOP = 0.71
const BOTTOM = -1.05

const chrome: Part[] = [
  { kind: 'box', role: 'surface', layer: 'chrome', size: [WIDTH, TOP - BOTTOM, 0.03], position: [0, 0, 0] },
  { kind: 'box', role: 'frame', layer: 'chrome', size: [WIDTH, TOP - VIEWPORT_TOP, 0.04], position: [0, (TOP + VIEWPORT_TOP) / 2, 0.01] },
  ...[0, 1, 2].map((i) => disc('chrome', 'surface', -1.47 + i * 0.11, 0.975, 0.035, undefined, 0.04)),
  { kind: 'box', role: 'surface', layer: 'chrome', size: [0.7, 0.1, 0.02], position: [-0.72, 0.975, 0.04], hover: { group: 'tab', glow: 0.3 } },
  { kind: 'box', role: 'surface', layer: 'chrome', size: [2.3, 0.1, 0.02], position: [0.3, 0.8, 0.04] },
]

const panel = (layer: Layer, role: Role, x: number, y: number, w: number, h: number, radius: number, hover?: Hover, z = 0): Part => ({
  kind: 'panel',
  role,
  layer,
  size: [w, h],
  radius,
  position: [x, y, z],
  hover,
})

/** Frame: the sidebar down the left, the top bar's row. */
const SIDEBAR_X = -1.4
const TOPBAR_Y = 0.5

const layout: Part[] = [
  { kind: 'box', role: 'smoked', layer: 'layout', size: [3.1, 1.66, 0.02], position: [0, -0.17, 0] },
  { kind: 'frame', role: 'frame', layer: 'layout', size: [3.1, 1.66], border: 0.02, position: [0, -0.17, 0] },
  // sidebar: logo, then nav icons, the first one selected
  // (bars and fields sit just off the page surface, their icons just off them)
  panel('layout', 'surface', SIDEBAR_X, -0.17, 0.24, 1.5, 0.05, undefined, 0.02),
  disc('layout', 'highlight', SIDEBAR_X, 0.45, 0.045, { group: 'logo', glow: 0.4 }, 0.04),
  ...[0, 1, 2, 3].map((i) => disc('layout', i === 0 ? 'highlight' : 'rail', SIDEBAR_X, -0.08 - i * 0.14, 0.032, { group: `nav-${i}`, glow: 0.6 }, 0.04)),
  // top bar: search field with its magnifier, alerts, the signed-in avatar
  panel('layout', 'surface', -0.55, TOPBAR_Y, 0.8, 0.11, 0.055, { group: 'search', glow: 0.25 }, 0.02),
  { kind: 'ring', role: 'rail', layer: 'layout', inner: 0.018, outer: 0.028, position: [-0.88, TOPBAR_Y + 0.005, 0.04] },
  segment('layout', 'rail', [-0.862, TOPBAR_Y - 0.013], [-0.842, TOPBAR_Y - 0.033], 0.012, undefined, 0.04),
  disc('layout', 'frame', 1.1, TOPBAR_Y, 0.032, { group: 'alerts', glow: 0.5 }, 0.02),
  disc('layout', 'frame', 1.33, TOPBAR_Y, 0.05, { group: 'avatar', glow: 0.4 }, 0.02),
]

/** KPI tiles: centre of each, and the row they share. */
const KPI_X = [-0.48, 0.33, 1.1]
const KPI_Y = 0.26
const KPI_ICON: Role[] = ['highlight', 'frame', 'rail']
/** Each tile's small trend, as heights across the tile. */
const SPARKS = [
  [-0.04, 0.02, -0.01, 0.05],
  [0.03, -0.03, 0.01, -0.02],
]
/** The middle tile shows small bars instead of a line. */
const MINI_BARS = [0.05, 0.09, 0.07, 0.11]

function kpi(i: number): Part[] {
  const x = KPI_X[i]
  const hover: Hover = { group: `kpi-${i}`, lift: 0.06, glow: 0.12 }
  const lift: Hover = { group: `kpi-${i}`, lift: 0.06 }
  const tile = [panel('content', 'surface', x, KPI_Y, 0.74, 0.26, 0.04, hover), disc('content', KPI_ICON[i], x - 0.27, KPI_Y, 0.045, lift, 0.02)]
  if (i === 1) {
    return [
      ...tile,
      ...MINI_BARS.map((height, b): Part => ({
        kind: 'box',
        role: 'frame',
        layer: 'content',
        size: [0.045, height, 0.02],
        position: [x - 0.08 + b * 0.09, KPI_Y - 0.07 + height / 2, 0.02],
        hover: { group: `kpi-${i}`, lift: 0.06, grow: 0.3 },
      })),
    ]
  }
  const points = SPARKS[i === 0 ? 0 : 1].map((h, p): Vec2 => [x - 0.12 + p * 0.14, KPI_Y + h])
  return [...tile, ...points.slice(1).map((point, p) => segment('content', 'frame', points[p], point, 0.012, lift, 0.02))]
}

/** Main chart card: its span, the chart's baseline, and its values left to right. */
const MAIN_CARD = { x: -0.115, y: -0.42, w: 1.47, h: 0.96 }
const BASELINE = -0.8
const TREND: Vec2[] = [
  [-0.75, -0.72],
  [-0.54, -0.55],
  [-0.33, -0.62],
  [-0.12, -0.4],
  [0.09, -0.48],
  [0.3, -0.26],
  [0.5, -0.34],
]
/** The chart's highest point, where the tooltip points. */
const PEAK = TREND[5]

/** Donut card: its span, the donut's centre, each slice's share, and the gap between slices. */
const SIDE_CARD = { x: 1.1, y: -0.42, w: 0.74, h: 0.96 }
const DONUT_CENTER: Vec2 = [1.1, -0.3]
const DONUT = [0.38, 0.27, 0.2, 0.15]
const DONUT_ROLES: Role[] = ['frame', 'highlight', 'rail', 'surface']
const DONUT_GAP = 0.05

const content: Part[] = [
  ...[0, 1, 2].flatMap(kpi),
  // main chart card: gridlines, the area under the trend, its gold line, a point at each value
  panel('content', 'surface', MAIN_CARD.x, MAIN_CARD.y, MAIN_CARD.w, MAIN_CARD.h, 0.05),
  ...[0, 1, 2].map((i): Part => ({ kind: 'box', role: 'rail', layer: 'content', size: [1.3, 0.006, 0.006], position: [MAIN_CARD.x, -0.7 + i * 0.2, 0.015] })),
  { kind: 'polygon', role: 'smoked', layer: 'content', points: [[TREND[0][0], BASELINE], ...TREND, [TREND[TREND.length - 1][0], BASELINE]], position: [0, 0, 0.02] },
  ...TREND.slice(1).map((point, i) => segment('content', 'accent', TREND[i], point, 0.018, undefined, 0.04)),
  ...TREND.map(([x, y]) => disc('content', 'highlight', x, y, 0.028, { group: 'trend', glow: 0.5 }, 0.055)),
  // donut card: the donut, slices running anticlockwise from the top, and a legend dot per slice
  panel('content', 'surface', SIDE_CARD.x, SIDE_CARD.y, SIDE_CARD.w, SIDE_CARD.h, 0.05),
  ...DONUT.map((share, i): Part => {
    const before = DONUT.slice(0, i).reduce((sum, each) => sum + each, 0)
    return {
      kind: 'ring',
      role: DONUT_ROLES[i],
      layer: 'content',
      inner: 0.11,
      outer: 0.19,
      start: Math.PI / 2 + before * Math.PI * 2 + DONUT_GAP / 2,
      sweep: share * Math.PI * 2 - DONUT_GAP,
      position: [...DONUT_CENTER, 0.02],
      hover: { group: `slice-${i}`, lift: 0.06, glow: 0.3 },
    }
  }),
  ...DONUT_ROLES.map((role, i) => disc('content', role, 0.86 + i * 0.16, -0.66, 0.022, undefined, 0.02)),
]

const components: Part[] = [
  // a tooltip over the chart's peak, its pointer aimed down at the point
  panel('components', 'highlight', PEAK[0], PEAK[1] + 0.2, 0.34, 0.14, 0.03, { group: 'tooltip', lift: 0.08, glow: 0.15 }),
  { kind: 'polygon', role: 'highlight', layer: 'components', points: [[-0.035, 0], [0.035, 0], [0, -0.045]], position: [PEAK[0], PEAK[1] + 0.13, 0], hover: { group: 'tooltip', lift: 0.08 } },
  // an add button, bottom right, its plus drawn in two strokes
  disc('components', 'highlight', 1.32, -0.82, 0.09, { group: 'add', lift: 0.08, glow: 0.2 }),
  { kind: 'box', role: 'surface', layer: 'components', size: [0.08, 0.016, 0.01], position: [1.32, -0.82, 0.01], hover: { group: 'add', lift: 0.08 } },
  { kind: 'box', role: 'surface', layer: 'components', size: [0.016, 0.08, 0.01], position: [1.32, -0.82, 0.01], hover: { group: 'add', lift: 0.08 } },
]

/** A classic arrow cursor, tip at the local origin. */
const CURSOR: Vec2[] = [
  [0, 0],
  [0, -0.28],
  [0.07, -0.21],
  [0.12, -0.32],
  [0.16, -0.3],
  [0.11, -0.19],
  [0.2, -0.19],
]

const overlay: Part[] = [
  { kind: 'polygon', role: 'highlight', layer: 'overlay', points: CURSOR, position: [0.42, -0.16, 0], name: 'cursor' },
]

export const PARTS: Part[] = [...chrome, ...layout, ...content, ...components, ...overlay]
