import type { CSSProperties } from 'react'
import { PROJECTS, type Project } from './projects'
import styles from './ProjectPreview.module.css'

const year = (iso: string) => Number(iso.slice(0, 4))
const month = (iso: string) => year(iso) * 12 + Number(iso.slice(5, 7)) - 1

/** Ongoing projects run to the current month. */
const TODAY = new Date().toISOString().slice(0, 7)
const endOf = (p: Project) => p.period.end ?? TODAY

const FIRST_YEAR = year(PROJECTS[0].period.start)
const YEARS = Array.from(
  { length: Math.max(...PROJECTS.map((p) => year(endOf(p)))) - FIRST_YEAR + 1 },
  (_, i) => FIRST_YEAR + i,
)

/** Percent position of a month on the archive timeline. */
const at = (m: number) => ((m - FIRST_YEAR * 12) / (YEARS.length * 12)) * 100

/**
 * Decorative band built only from the project's period: the year it ended and
 * where it sits on the archive's timeline. Not a picture of the project.
 */
export function ProjectPreview({ project }: { project: Project }) {
  const { start } = project.period
  const range = {
    '--from': `${at(month(start))}%`,
    '--to': `${at(month(endOf(project)) + 1)}%`,
  } as CSSProperties

  return (
    <div className={styles.preview}>
      <span className={styles.year}>{year(endOf(project))}</span>

      <div className={styles.track} style={{ '--years': YEARS.length } as CSSProperties}>
        <span className={styles.range} style={range} />
        {YEARS.map((y) => (
          <span className={styles.tick} key={y}>
            {y}
          </span>
        ))}
      </div>
    </div>
  )
}
