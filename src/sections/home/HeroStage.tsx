import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react'
import styles from './HeroStage.module.css'

/** If the scene chunk fails to load, render nothing and keep the static layers. */
const SceneRuntime = lazy<ComponentType<{ onReady: (ready: boolean) => void }>>(() =>
  import('./scene/SceneRuntime').catch(() => ({ default: () => null })),
)

/** Runs `task` once the browser is idle after the first paint; Safari lacks idle callbacks, so it waits briefly instead. */
function whenIdle(task: () => void) {
  if ('requestIdleCallback' in window) {
    const id = requestIdleCallback(task, { timeout: 2000 })
    return () => cancelIdleCallback(id)
  }
  const id = setTimeout(task, 300)
  return () => clearTimeout(id)
}

/**
 * Reserved field for the Living Frontend Architecture scene.
 * Fixed dimensions come from CSS, so the lazy canvas fills it without layout shift.
 * The static layers are the fallback: they show until the scene has rendered, and return if
 * WebGL, the scene chunk or the GPU context fails. Decorative only: hidden from assistive tech.
 * The scene chunk is requested only when the browser is idle, so it never competes with the Hero text.
 */
export function HeroStage({ className }: { className?: string }) {
  const [sceneWanted, setSceneWanted] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => whenIdle(() => setSceneWanted(true)), [])

  return (
    <div className={className ? `${styles.stage} ${className}` : styles.stage} aria-hidden="true">
      <div className={styles.assembly} hidden={sceneReady}>
        <span className={styles.window} />
        <span className={styles.layout} />
        <span className={styles.card} />
      </div>
      {sceneWanted && (
        <Suspense fallback={null}>
          <SceneRuntime onReady={setSceneReady} />
        </Suspense>
      )}
    </div>
  )
}
