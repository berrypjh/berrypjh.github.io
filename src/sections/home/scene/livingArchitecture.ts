import { Box3, MathUtils, Mesh, PerspectiveCamera, Scene, Vector3, WebGLRenderer, type Object3D } from 'three'
import { buildArchitecture } from './buildArchitecture'
import { createCursor } from './cursor'
import { createHover } from './hover'
import { coarsePointer, pixelRatio, reducedMotion } from './device'
import { handoffProgress, watchScroll } from './handoff'
import { createLights } from './lighting'
import { ASSEMBLY_TOTAL, createParallax, watchPointer, type PointerReport, type Pose } from './parallax'

export type SceneHandle = { dispose: () => void }

/** Narrow lens so the panels keep their proportions. */
const FOV = 26
/** Fixed viewing direction: from the front right, a little above, so the layer gaps read. */
const VIEW_DIR = new Vector3(0.75, 0.28, 1).normalize()
/** Breathing room around the silhouette, which also absorbs the parallax travel. */
const MARGIN = 1.08
/** How quickly the pose follows the pointer, per second. About a quarter-second settle. */
const DAMPING = 4
/** Pose distance below which the scene counts as settled and the loop stops. */
const SETTLED = 1e-4
/** Canvas opacity lost by the end of the handoff, so the scene steps back for the next section. */
const RETREAT = 0.5
/** Share of the handoff applied on touch devices: the same gesture, half the travel. */
const TOUCH_HANDOFF = 0.5
/** Seconds the canvas takes to fade in over the static fallback as the assembly begins. */
const FADE_IN = 0.35

/** Every mesh vertex in world space, so framing hugs the real silhouette rather than a bounding box. */
function worldVertices(root: Object3D) {
  root.updateMatrixWorld(true)
  const points: Vector3[] = []
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return
    const position = object.geometry.attributes.position
    for (let i = 0; i < position.count; i++) {
      points.push(new Vector3().fromBufferAttribute(position, i).applyMatrix4(object.matrixWorld))
    }
  })
  return points
}

/**
 * Places the camera along VIEW_DIR at the distance where every point fits,
 * with the object's silhouette, as seen from VIEW_DIR, centred at `centerX` (0–1) of the canvas width.
 */
function frame(camera: PerspectiveCamera, points: Vector3[], width: number, height: number, centerX: number) {
  const center = new Box3().setFromPoints(points).getCenter(new Vector3())
  const right = new Vector3().crossVectors(camera.up, VIEW_DIR).normalize()
  const up = new Vector3().crossVectors(VIEW_DIR, right)

  // an angled view makes the bounding-box centre sit off the silhouette's centre; recentre on screen axes
  const across = points.map((point) => point.clone().sub(center).dot(right))
  const along = points.map((point) => point.clone().sub(center).dot(up))
  center
    .addScaledVector(right, (Math.min(...across) + Math.max(...across)) / 2)
    .addScaledVector(up, (Math.min(...along) + Math.max(...along)) / 2)

  const tanV = Math.tan(MathUtils.degToRad(FOV / 2))
  const tanH = tanV * (width / height) * 2 * Math.min(centerX, 1 - centerX)

  let distance = 0
  for (const point of points) {
    const offset = point.clone().sub(center)
    const depth = offset.dot(VIEW_DIR)
    distance = Math.max(
      distance,
      depth + (Math.abs(offset.dot(right)) * MARGIN) / tanH,
      depth + (Math.abs(offset.dot(up)) * MARGIN) / tanV,
    )
  }

  camera.aspect = width / height
  camera.position.copy(center).addScaledVector(VIEW_DIR, distance)
  camera.lookAt(center)
  camera.setViewOffset(width, height, (0.5 - centerX) * width, 0, width, height)
}

/**
 * Imperative Three.js scene for the hero stage.
 * Draws on resize and on scroll while the stage is on screen, at most once per frame, and runs a
 * loop only while the layers assemble on first appearance or the pose catches up with the pointer.
 * Idle otherwise.
 * Scroll is read straight from layout, never damped, so the handoff tracks the page without lag.
 * Reduced motion holds the resting composition: no assembly, no pointer response, no scroll handoff.
 * Touch devices never get pointer response and see a gentler handoff at a lower pixel ratio.
 * Over the drawn page, the scene's cursor takes the place of the real one, and the page's
 * cards, button and menus answer it with hover responses.
 * Throws if WebGL is unavailable; the caller keeps the static layer in that case.
 * The object's horizontal position follows the stage's --assembly-x custom property.
 */
export function createLivingArchitecture(canvas: HTMLCanvasElement): SceneHandle {
  // decorative and mostly idle: never wake a discrete GPU for it
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100)
  const architecture = buildArchitecture()
  const lights = createLights()
  scene.add(architecture.group, ...lights.all)

  const applyPose = createParallax({ root: architecture.group, layers: architecture.layers, key: lights.key, camera })
  // frame the layers at their widest spread, so opening up under the pointer never clips
  applyPose({ x: 0, y: 0, engage: 1 }, 0, Infinity)
  const points = worldVertices(architecture.group)

  const cursor = createCursor(camera, architecture.layers)
  const hover = createHover(architecture.group)
  const pose: Pose = { x: 0, y: 0, engage: 0 }
  let target: PointerReport = { x: 0, y: 0, engage: 0, direct: false }
  let frameId = 0
  let last = 0
  let appeared = 0
  const assembly = () => (reducedMotion.matches ? Infinity : (performance.now() - appeared) / 1000)

  /** `follow` is how far eased values travel this frame; draws outside the loop settle at once. */
  const draw = (follow = 1) => {
    const scale = reducedMotion.matches ? 0 : coarsePointer.matches ? TOUCH_HANDOFF : 1
    const handoff = scale ? handoffProgress(canvas) * scale : 0
    const seconds = assembly()
    applyPose(pose, handoff, seconds)
    // the scene's cursor stands in for the real one wherever the pointer is over the object
    const tracking = cursor.update(target.x, target.y, target.direct, follow)
    canvas.style.cursor = tracking ? 'none' : ''
    hover.update(cursor.hovered, follow)
    canvas.style.opacity = String((1 - handoff * RETREAT) * Math.min(1, seconds / FADE_IN))
    renderer.render(scene, camera)
  }

  const tick = (now: number) => {
    const follow = 1 - Math.exp((-DAMPING * Math.min(now - last, 100)) / 1000)
    last = now
    target = pointer.read()
    pose.x += (target.x - pose.x) * follow
    pose.y += (target.y - pose.y) * follow
    pose.engage += (target.engage - pose.engage) * follow
    draw(follow)
    const gap = Math.abs(target.x - pose.x) + Math.abs(target.y - pose.y) + Math.abs(target.engage - pose.engage)
    const settled = gap < SETTLED && cursor.settled && hover.settled && assembly() >= ASSEMBLY_TOTAL
    frameId = settled ? 0 : requestAnimationFrame(tick)
  }
  const requestFrame = () => {
    if (frameId) return
    last = performance.now()
    frameId = requestAnimationFrame(tick)
  }

  const pointer = watchPointer(canvas, requestFrame)
  const stopScroll = watchScroll(canvas, requestFrame)
  reducedMotion.addEventListener('change', requestFrame)

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = canvas
    const centerX = parseFloat(getComputedStyle(canvas).getPropertyValue('--assembly-x')) / 100 || 0.5
    renderer.setPixelRatio(pixelRatio())
    renderer.setSize(width, height, false)
    frame(camera, points, width, height, centerX)
    cursor.measure(points)
    draw()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  appeared = performance.now()
  requestFrame()

  return {
    dispose() {
      cancelAnimationFrame(frameId)
      pointer.stop()
      stopScroll()
      reducedMotion.removeEventListener('change', requestFrame)
      observer.disconnect()
      architecture.dispose()
      renderer.dispose()
    },
  }
}
