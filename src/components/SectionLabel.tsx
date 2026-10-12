import type { ReactNode } from 'react'
import styles from './SectionLabel.module.css'

type SectionLabelProps = {
  children: ReactNode
  /** Prefix the label with the small gold square used across the portfolio. */
  mark?: boolean
  /** gold is reserved for the "NN / SECTION" eyebrows; metadata stays muted. */
  tone?: 'muted' | 'gold'
  /** A shareable `#` link to the section: `id` it points at, `name` it is read as. */
  anchor?: { id: string; name: string }
  className?: string
}

/**
 * Small uppercase mono label used as the eyebrow of each portfolio section.
 * With `anchor`, a `#` link follows it; it appears on hover and on keyboard focus.
 */
export function SectionLabel({
  children,
  mark = false,
  tone = 'muted',
  anchor,
  className,
}: SectionLabelProps) {
  const classes = [styles.label, mark && styles.marked, tone === 'gold' && styles.gold, className]
  return (
    <span className={classes.filter(Boolean).join(' ')}>
      {children}
      {anchor && (
        <a className={styles.anchor} href={`#${anchor.id}`} aria-label={`${anchor.name} 섹션 링크`}>
          #
        </a>
      )}
    </span>
  )
}
