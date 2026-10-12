import { Plane, Raycaster, Vector2, Vector3, type Camera, type Group, type Object3D } from 'three'
import { LAYERS, type Hover, type Layer } from './composition'

/** Distance below which the returning cursor counts as home. */
const HOME = 1e-4
/** Extra room around the object's on-screen box, in normalised screen units, so its edge is forgiving. */
const EDGE = 0.04

/**
 * The scene's own cursor. While the real pointer is over the object's on-screen box, the cursor
 * sits exactly under it, on the overlay layer's plane, so it reads as the pointer itself.
 * The box, not the drawn faces, decides this: the layers are pulled apart, so the drawing is
 * full of gaps, and falling back home over every gap would make the cursor drop out from under
 * the pointer. Outside the box it eases back to its resting place by the button.
 * The same ray names the hover group under the cursor: the front-most part that has one.
 */
export function createCursor(camera: Camera, layers: Record<Layer, Group>) {
  const overlay = layers.overlay
  const cursor = overlay.getObjectByName('cursor') as Object3D
  const page = LAYERS.filter((layer) => layer !== 'overlay').map((layer) => layers[layer])
  const rest = cursor.position.clone()
  const goal = rest.clone()
  const box = { left: 0, right: 0, top: 0, bottom: 0 }
  let hovered: string | null = null

  const raycaster = new Raycaster()
  // only faces count for hover; by default a ray within a whole unit of an outline would hit it
  raycaster.params.Line.threshold = 0
  const pointer = new Vector2()
  const plane = new Plane()
  const normal = new Vector3()
  const origin = new Vector3()
  const hit = new Vector3()
  const projected = new Vector3()

  /** Where the ray under the pointer crosses the overlay plane, in overlay coordinates; also finds the hover group. */
  function aim(x: number, y: number) {
    camera.updateMatrixWorld()
    overlay.parent!.updateMatrixWorld()
    raycaster.setFromCamera(pointer.set(x, -y), camera)
    const hits = raycaster.intersectObjects(page, true)
    hovered = (hits.find((each) => each.object.userData.hover)?.object.userData.hover as Hover | undefined)?.group ?? null

    normal.set(0, 0, 1).transformDirection(overlay.matrixWorld)
    plane.setFromNormalAndCoplanarPoint(normal, overlay.getWorldPosition(origin))
    return raycaster.ray.intersectPlane(plane, hit) && overlay.worldToLocal(hit)
  }

  return {
    /** Recomputes the object's on-screen box from its world points; call after the camera is framed. */
    measure(points: Vector3[]) {
      camera.updateMatrixWorld()
      box.left = box.top = Infinity
      box.right = box.bottom = -Infinity
      for (const point of points) {
        projected.copy(point).project(camera)
        box.left = Math.min(box.left, projected.x)
        box.right = Math.max(box.right, projected.x)
        box.top = Math.min(box.top, -projected.y)
        box.bottom = Math.max(box.bottom, -projected.y)
      }
    },
    /**
     * Places the cursor for this frame from the pointer (-1..1, y down), when `direct` says it is on
     * the canvas itself. `follow` is the share of the way home it travels when not tracking.
     * Returns whether it is tracking the pointer, so the real cursor can be hidden.
     */
    update(x: number, y: number, direct: boolean, follow: number) {
      hovered = null
      const inside = x >= box.left - EDGE && x <= box.right + EDGE && y >= box.top - EDGE && y <= box.bottom + EDGE
      const target = direct && inside ? aim(x, y) : null
      goal.copy(target ?? rest)
      cursor.position.lerp(goal, target ? 1 : follow)
      return target !== null
    },
    /** Hover group under the cursor this frame, if it is tracking over one. */
    get hovered() {
      return hovered
    },
    /** True once the cursor has nothing left to move toward. */
    get settled() {
      return cursor.position.distanceTo(goal) < HOME
    },
  }
}
