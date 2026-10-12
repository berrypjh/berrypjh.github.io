import { Container } from './Container'
import { SectionLabel } from './SectionLabel'
import styles from './SiteHeader.module.css'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#engineering-ecosystem' },
  { label: 'Archive', href: '#archive' },
  { label: 'Writing', href: '#writing' },
]

/** Quiet site header: identity on the left, section anchors on the right. */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main">
        본문 바로가기
      </a>
      <Container className={styles.inner}>
        <a className={styles.identity} href="#home">
          <SectionLabel mark>Junhyuk Park · 2026</SectionLabel>
        </a>
        <nav aria-label="사이트 메뉴">
          <ul className={styles.links}>
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <a className={styles.link} href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
