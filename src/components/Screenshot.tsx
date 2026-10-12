import { useState } from 'react'
import styles from './Screenshot.module.css'

type Fit = 'fill' | 'wide' | 'portrait'

type ScreenshotProps = {
  src: string
  /** Width / height of the frame the image sits in, e.g. 5 / 3. */
  frame: number
  lazy?: boolean
}

/**
 * A project screenshot that always keeps its full width.
 * Wider than the frame: shown whole with bands above and below.
 * Taller than the frame: fills it, cropped from the bottom.
 * Portrait (an extension popup, a phone screen): shown whole in the centre.
 */
export function Screenshot({ src, frame, lazy = true }: ScreenshotProps) {
  const [fit, setFit] = useState<Fit>('fill')

  function measure(image: HTMLImageElement) {
    const ratio = image.naturalWidth / image.naturalHeight
    setFit(ratio < 1 ? 'portrait' : ratio > frame ? 'wide' : 'fill')
  }

  return (
    <img
      className={`${styles.shot} ${styles[fit]}`}
      src={src}
      alt=""
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      onLoad={(e) => measure(e.currentTarget)}
    />
  )
}
