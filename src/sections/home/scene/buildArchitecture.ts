import {
  BoxGeometry,
  CircleGeometry,
  Color,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  Path,
  RingGeometry,
  Shape,
  Vector2,
  type BufferGeometry,
} from 'three'
import { LAYER_DEPTH, LAYERS, PARTS, type Layer, type Part, type Role } from './composition'
import { PALETTE } from './palette'

/** Thickness of extruded frames and outlines along their normal. */
const EXTRUDE_DEPTH = 0.02

/**
 * One shared material per role, all matte to semi-matte.
 * Smoked is the only transparent role: two meshes, no depth writes, sorted by three.
 * Outlines are opaque, pre-mixed toward the background, so they never need sorting.
 * Gold carries a little emission so the single accent line reads under any light.
 */
function createMaterials() {
  return {
    surface: new MeshStandardMaterial({ color: PALETTE.graphite, roughness: 0.85, metalness: 0.1 }),
    rail: new MeshStandardMaterial({ color: PALETTE.faint, roughness: 0.6, metalness: 0.1 }),
    frame: new MeshStandardMaterial({ color: PALETTE.structure, roughness: 0.7, metalness: 0.05 }),
    smoked: new MeshStandardMaterial({
      color: PALETTE.smoke,
      roughness: 0.35,
      metalness: 0,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    }),
    highlight: new MeshStandardMaterial({ color: PALETTE.smoke, roughness: 0.8, metalness: 0 }),
    accent: new MeshStandardMaterial({
      color: PALETTE.gold,
      emissive: PALETTE.gold,
      emissiveIntensity: 0.6,
      roughness: 0.5,
      metalness: 0.3,
    }),
    edge: new LineBasicMaterial({ color: new Color(PALETTE.faint).lerp(new Color(PALETTE.background), 0.4) }),
  } satisfies Record<Role | 'edge', MeshStandardMaterial | LineBasicMaterial>
}

/** Rectangular ring, centred on the origin, extruded to a thin rim. */
function frameGeometry(width: number, height: number, border: number) {
  const outer = new Shape()
    .moveTo(-width / 2, -height / 2)
    .lineTo(width / 2, -height / 2)
    .lineTo(width / 2, height / 2)
    .lineTo(-width / 2, height / 2)
    .closePath()
  const w = width / 2 - border
  const h = height / 2 - border
  outer.holes.push(new Path().moveTo(-w, -h).lineTo(-w, h).lineTo(w, h).lineTo(w, -h).closePath())

  return extrude(outer)
}

/** Any flat shape given a thin, centred thickness. */
function extrude(shape: Shape) {
  const geometry = new ExtrudeGeometry(shape, { depth: EXTRUDE_DEPTH, bevelEnabled: false })
  geometry.translate(0, 0, -EXTRUDE_DEPTH / 2)
  return geometry
}

/** Rounded rectangle, centred on the origin, extruded thin. */
function panelGeometry(width: number, height: number, radius: number) {
  const x = width / 2 - radius
  const y = height / 2 - radius
  const shape = new Shape()
    .moveTo(-x, -height / 2)
    .lineTo(x, -height / 2)
    .absarc(x, -y, radius, -Math.PI / 2, 0, false)
    .lineTo(width / 2, y)
    .absarc(x, y, radius, 0, Math.PI / 2, false)
    .lineTo(-x, height / 2)
    .absarc(-x, y, radius, Math.PI / 2, Math.PI, false)
    .lineTo(-width / 2, -y)
    .absarc(-x, -y, radius, Math.PI, (Math.PI * 3) / 2, false)
  return extrude(shape)
}

function partGeometry(part: Part) {
  switch (part.kind) {
    case 'box':
      return new BoxGeometry(...part.size)
    case 'frame':
      return frameGeometry(part.size[0], part.size[1], part.border)
    case 'disc':
      return new CircleGeometry(part.radius, 32)
    case 'ring':
      return new RingGeometry(part.inner, part.outer, 48, 1, part.start ?? 0, part.sweep ?? Math.PI * 2)
    case 'panel':
      return panelGeometry(part.size[0], part.size[1], part.radius)
    case 'polygon':
      return extrude(new Shape(part.points.map(([x, y]) => new Vector2(x, y))))
  }
}

/** Surfaces carry an outline so their edges read against the dark background. */
const outlined = (part: Part) =>
  (part.kind === 'box' || part.kind === 'panel') && (part.role === 'surface' || part.role === 'smoked')

/**
 * Builds the composition, one child group per layer at its resting depth, so each layer
 * can move and spread on its own. dispose() frees every geometry and material it created.
 */
export function buildArchitecture() {
  const materials = createMaterials()
  const geometries: BufferGeometry[] = []
  const ownMaterials: MeshStandardMaterial[] = []

  /** A part that glows on hover gets its own copy of its role's material, lit from within at zero. */
  const glowing = (shared: MeshStandardMaterial) => {
    const own = shared.clone()
    own.emissive.set(PALETTE.light)
    own.emissiveIntensity = 0
    ownMaterials.push(own)
    return own
  }
  const layers = Object.fromEntries(LAYERS.map((layer) => [layer, new Group()])) as Record<Layer, Group>
  const group = new Group()
  for (const layer of LAYERS) {
    layers[layer].position.z = LAYER_DEPTH[layer]
    group.add(layers[layer])
  }

  for (const part of PARTS) {
    const geometry = partGeometry(part)
    const mesh = new Mesh(geometry, part.hover?.glow ? glowing(materials[part.role] as MeshStandardMaterial) : materials[part.role])
    mesh.position.set(...part.position)
    if (part.rotation) mesh.rotation.z = part.rotation
    geometries.push(geometry)
    if (outlined(part)) {
      const edges = new EdgesGeometry(geometry)
      mesh.add(new LineSegments(edges, materials.edge))
      geometries.push(edges)
    }
    if (part.name) mesh.name = part.name
    if (part.hover) mesh.userData.hover = part.hover
    layers[part.layer].add(mesh)
  }

  return {
    group,
    layers,
    dispose() {
      geometries.forEach((geometry) => geometry.dispose())
      Object.values(materials).forEach((material) => material.dispose())
      ownMaterials.forEach((material) => material.dispose())
    },
  }
}
