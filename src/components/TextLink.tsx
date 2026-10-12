import type { ReactNode } from 'react'
import styles from './TextLink.module.css'

type TextLinkProps = {
  href: string
  children: ReactNode
  direction?: 'right' | 'down'
}

const GLYPH = { right: '→', down: '↘' } as const

/** Editorial text action: no button chrome, arrow nudges on hover and focus. */
export function TextLink({ href, children, direction = 'right' }: TextLinkProps) {
  return (
    <a className={styles.link} href={href}>
      {children}
      <span className={`${styles.arrow} ${styles[direction]}`} aria-hidden="true">
        {GLYPH[direction]}
      </span>
    </a>
  )
}
