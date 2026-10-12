import { Container } from '../../components/Container'
import { SectionLabel } from '../../components/SectionLabel'
import styles from './SiteFooter.module.css'

/** Closing metadata line. No navigation, no forms — just the last quiet rule. */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={`${styles.inner} reveal reveal-on-scroll`}>
          <SectionLabel mark>Junhyuk Park · Frontend Developer</SectionLabel>
          <div className={styles.trailing}>
            <SectionLabel>Designed &amp; Built with care</SectionLabel>
            <SectionLabel>© 2026</SectionLabel>
          </div>
        </div>
      </Container>
    </footer>
  )
}
