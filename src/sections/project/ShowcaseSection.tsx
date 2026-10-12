import { Container } from '../../components/Container'
import { SectionLabel } from '../../components/SectionLabel'
import { EngineeringEcosystem } from './EngineeringEcosystem'
import { ProjectSummary } from './ProjectSummary'
import { ShowcaseGallery } from './ShowcaseGallery'
import type { Showcase } from './showcase'
import styles from './ShowcaseSection.module.css'

type ShowcaseSectionProps = {
  showcase: Showcase
  /** The "NN" of the section eyebrow. */
  number: number
  /** Which side the ambient light sits on; sections alternate down the page. */
  glow: 'left' | 'right'
}

/** A selected project as its own section: summary on the left, its work on the right. */
export function ShowcaseSection({ showcase, number, glow }: ShowcaseSectionProps) {
  return (
    <section
      className={`${styles.showcase} ${styles[glow]}`}
      id={showcase.id}
      aria-labelledby={`${showcase.id}-heading`}
    >
      <Container>
        <SectionLabel
          mark
          tone="gold"
          anchor={{ id: showcase.id, name: showcase.title.join(' ') }}
          className={`${styles.head} reveal reveal-on-scroll`}
        >
          {String(number).padStart(2, '0')} / {showcase.title.join(' ')}
        </SectionLabel>

        <div className={styles.spread}>
          <div className={styles.summary}>
            <ProjectSummary summary={showcase} />
          </div>

          {showcase.kind === 'ecosystem' ? (
            <EngineeringEcosystem ecosystem={showcase.ecosystem} />
          ) : (
            <ShowcaseGallery showcase={showcase} />
          )}
        </div>
      </Container>
    </section>
  )
}
