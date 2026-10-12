import type { ReactNode } from 'react'
import styles from './PreviewStage.module.css'

type PreviewStageProps = {
  children: ReactNode
  /** Native look of the miniature UI. The card around it stays neutral either way. */
  tone: 'light' | 'dark'
  size?: 'featured' | 'card' | 'wide'
}

/** Framed panel holding a miniature project UI. Decorative: hidden from assistive tech. */
export function PreviewStage({ children, tone, size = 'card' }: PreviewStageProps) {
  return (
    <div className={`${styles.stage} ${styles[size]} ${styles[tone]}`} aria-hidden="true">
      {children}
    </div>
  )
}
