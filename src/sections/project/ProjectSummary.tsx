import { SectionLabel } from '../../components/SectionLabel'
import type { CaseSummary } from './showcase'
import styles from './ProjectSummary.module.css'

/** Calm left-hand project summary: title, statement, plain facts, and the public repositories. */
export function ProjectSummary({ summary }: { summary: CaseSummary }) {
  return (
    <div>
      <h2 className={styles.heading} id={`${summary.id}-heading`}>
        <span className="reveal reveal-on-scroll">{summary.title[0]}</span>
        <span className="reveal reveal-on-scroll">{summary.title[1]}</span>
      </h2>

      <p className={`${styles.statement} reveal reveal-on-scroll`}>
        {summary.statement[0]}
        <br />
        {summary.statement[1]}
      </p>

      <dl className={styles.facts}>
        {summary.facts.map(([label, value]) => (
          <div className={`${styles.fact} reveal reveal-on-scroll`} key={label}>
            <dt>
              <SectionLabel>{label}</SectionLabel>
            </dt>
            <dd className={styles.value}>{value}</dd>
          </div>
        ))}
      </dl>

      {summary.repositories && (
        <nav className={`${styles.repos} reveal reveal-on-scroll`} aria-label={`${summary.title.join(' ')} 저장소`}>
          <SectionLabel>Repositories</SectionLabel>
          <ul className={styles.repoList}>
            {summary.repositories.map((repo) => (
              <li key={repo.href}>
                <a
                  className={styles.repo}
                  href={repo.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${repo.name} GitHub 저장소, 새 탭에서 열림`}
                >
                  {repo.name}
                  <span className={styles.repoArrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
