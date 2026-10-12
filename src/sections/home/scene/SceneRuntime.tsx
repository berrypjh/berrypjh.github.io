import { useEffect, useRef } from 'react'
import { createLivingArchitecture } from './livingArchitecture'
import styles from './SceneRuntime.module.css'

type SceneRuntimeProps = {
  /** true once the scene has rendered, false if the GPU context is lost, so the static layer returns. */
  onReady: (ready: boolean) => void
}

/** Canvas host for the hero scene. Default export so the stage can load it lazily. */
export default function SceneRuntime({ onReady }: SceneRuntimeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    let scene
    try {
      scene = createLivingArchitecture(canvas)
    } catch {
      // no WebGL: leave the static layer in place
      return
    }
    onReady(true)

    const lost = () => onReady(false)
    canvas.addEventListener('webglcontextlost', lost)
    return () => {
      canvas.removeEventListener('webglcontextlost', lost)
      scene.dispose()
    }
  }, [onReady])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
