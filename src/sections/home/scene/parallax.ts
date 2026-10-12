import { MathUtils, Vector3, type Camera, type Group, type Light } from 'three'
import { LAYER_DEPTH, LAYERS, type Layer } from './composition'
import { reducedMotion } from './device'

/** Pointer state over the stage: position in -1..1 per axis, and engage 0–1 while hovering it. */
export type Pose = { x: number; y: number; engage: number }

/** What the pointer reports: a Pose, plus whether it is directly on the canvas rather than on text above it. */
export type PointerReport = Pose & { direct: boolean }

/** Sideways travel per unit of layer depth at full pointer offset: front leads, back drifts the other way. */
const SHIFT_PER_DEPTH = 0.07
/** Whole-object turn at full offset: a slight alignment, never a spin. */
const TILT = MathUtils.degToRad(1.2)
/** Key light travel, about two degrees of angle: subtler than any geometry. */
const LIGHT_SHIFT = 0.4
/** Extra spread while the pointer is over the stage: the layers open up a little to be looked into. */
const ENGAGE_SPREAD = 0.18
/** At full handoff the page turns this far toward the viewer. */
const FLAT_TURN = MathUtils.degToRad(18)
/** At full handoff the layers close to this share of their spread: one page, faintly layered. */
const FLAT_SPREAD = 0.12
/** Assembly on first render: each layer opens from the page plane, back to front, slightly staggered. */
const ASSEMBLY_SECONDS = 1.1
const ASSEMBLY_STAGGER = 0.09

/** Seconds until every layer has finished assembling. */
export const ASSEMBLY_TOTAL = ASSEMBLY_SECONDS + ASSEMBLY_STAGGER * (LAYERS.length - 1)

const clamp = (value: number) => MathUtils.clamp(value, -1, 1)
const easeOut = (t: number) => 1 - (1 - t) ** 3

const REST: PointerReport = { x: 0, y: 0, engage: 0, direct: false }

/**
 * Remembers where the mouse is on screen and reports it relative to `area` on demand.
 * Reading on demand keeps a still pointer correct while the page scrolls under it.
 * Touch and pen are ignored, and so is everything while reduced motion is requested.
 * `onChange` fires whenever a fresh read may differ.
 */
export function watchPointer(area: Element, onChange: () => void) {
  let client: { x: number; y: number } | null = null

  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    client = { x: event.clientX, y: event.clientY }
    onChange()
  }
  const leave = (event: PointerEvent) => {
    if (event.relatedTarget) return
    client = null
    onChange()
  }

  window.addEventListener('pointermove', move, { passive: true })
  document.addEventListener('pointerout', leave)
  reducedMotion.addEventListener('change', onChange)

  return {
    /** The pointer relative to `area` right now; at rest when it is away, off screen, or motion is reduced. */
    read(): PointerReport {
      if (!client || reducedMotion.matches) return REST
      const rect = area.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return REST
      const x = ((client.x - rect.left) / rect.width) * 2 - 1
      const y = ((client.y - rect.top) / rect.height) * 2 - 1
      const over = Math.abs(x) <= 1 && Math.abs(y) <= 1
      const direct = document.elementFromPoint(client.x, client.y) === area
      return { x: clamp(x), y: clamp(y), engage: over ? 1 : 0, direct }
    },
    stop() {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', leave)
      reducedMotion.removeEventListener('change', onChange)
    },
  }
}

type Rig = { root: Group; layers: Record<Layer, Group>; key: Light; camera: Camera }

/**
 * Poses the scene. Pure placement: call it, then render.
 *   pose     — damped pointer state
 *   handoff  — scroll handoff 0–1; it scales pointer influence to nothing and closes the layers into one page
 *   assembly — seconds since the scene first appeared; Infinity skips the assembly
 */
export function createParallax({ root, layers, key, camera }: Rig) {
  const keyRest = key.position.clone()
  const right = new Vector3()
  const up = new Vector3()

  return (pose: Pose, handoff: number, assembly: number) => {
    const live = 1 - handoff
    const spread = (1 + ENGAGE_SPREAD * pose.engage * live) * MathUtils.lerp(1, FLAT_SPREAD, handoff)
    right.set(1, 0, 0).applyQuaternion(camera.quaternion)
    up.set(0, 1, 0).applyQuaternion(camera.quaternion)

    LAYERS.forEach((layer, i) => {
      const depth = LAYER_DEPTH[layer]
      const assembled = easeOut(MathUtils.clamp((assembly - i * ASSEMBLY_STAGGER) / ASSEMBLY_SECONDS, 0, 1))
      const shift = depth * SHIFT_PER_DEPTH * live
      layers[layer].position
        .copy(right)
        .multiplyScalar(pose.x * shift)
        .addScaledVector(up, -pose.y * shift)
      layers[layer].position.z += depth * spread * assembled
    })

    root.rotation.set(pose.y * TILT * 0.6 * live, pose.x * TILT * live + handoff * FLAT_TURN, 0)
    const light = LIGHT_SHIFT * live
    key.position.set(keyRest.x + pose.x * light, keyRest.y - pose.y * light, keyRest.z)
  }
}
