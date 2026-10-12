import { DirectionalLight, HemisphereLight } from 'three'
import { PALETTE } from './palette'

/**
 * Soft studio rig, no shadow maps.
 * Key from the upper front left, so the tops read brightest and the camera-facing sides fall off.
 * Fill from the right, kept low so the shadow side never goes flat black.
 * Warm rim from behind, catching back edges to lift the silhouette.
 * Hemisphere ambient: warm from above, background colour from below.
 */
export function createLights() {
  const key = new DirectionalLight(PALETTE.light, 2.4)
  key.position.set(-4, 8, 5)

  const fill = new DirectionalLight(PALETTE.smoke, 0.5)
  fill.position.set(6, 2, 4)

  const rim = new DirectionalLight(PALETTE.goldSoft, 1)
  rim.position.set(-2, 3, -7)

  const ambient = new HemisphereLight(PALETTE.light, PALETTE.background, 0.6)

  return { key, all: [key, fill, rim, ambient] }
}
