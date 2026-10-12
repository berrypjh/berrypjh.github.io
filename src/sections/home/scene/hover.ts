import { Mesh, type MeshStandardMaterial, type Object3D } from 'three'
import type { Hover } from './composition'

/** Distance below which a group's hover amount counts as arrived. */
const ARRIVED = 1e-3

type Target = { mesh: Mesh; hover: Hover; restY: number; restZ: number; height: number }

/**
 * Hover responses of the drawn page. Each group eases toward 1 while the cursor is over it and
 * back to 0 after: parts lift toward the viewer, glow, or grow up from their base, as composition.ts declares.
 */
export function createHover(root: Object3D) {
  const groups = new Map<string, { amount: number; targets: Target[] }>()
  root.traverse((object) => {
    const hover = object.userData.hover as Hover | undefined
    if (!(object instanceof Mesh) || !hover) return
    const group = groups.get(hover.group) ?? { amount: 0, targets: [] }
    object.geometry.computeBoundingBox()
    const height = object.geometry.boundingBox!.max.y - object.geometry.boundingBox!.min.y
    group.targets.push({ mesh: object, hover, restY: object.position.y, restZ: object.position.z, height })
    groups.set(hover.group, group)
  })
  let active: string | null = null

  const apply = ({ mesh, hover, restY, restZ, height }: Target, amount: number) => {
    const grow = (hover.grow ?? 0) * amount
    // taller by `grow`, and raised by half of that, so the base stays put
    mesh.scale.y = 1 + grow
    mesh.position.y = restY + (height * grow) / 2
    mesh.position.z = restZ + (hover.lift ?? 0) * amount
    if (hover.glow) (mesh.material as MeshStandardMaterial).emissiveIntensity = hover.glow * amount
  }

  return {
    /** Moves every group toward its goal for this frame; `follow` is the share of the way travelled. */
    update(hovered: string | null, follow: number) {
      active = hovered
      for (const [name, group] of groups) {
        group.amount += ((name === active ? 1 : 0) - group.amount) * follow
        group.targets.forEach((target) => apply(target, group.amount))
      }
    },
    /** True once every group has arrived. */
    get settled() {
      return [...groups].every(([name, group]) => Math.abs((name === active ? 1 : 0) - group.amount) < ARRIVED)
    },
  }
}
