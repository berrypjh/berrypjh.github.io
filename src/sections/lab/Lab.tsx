import { useState } from 'react'
import { Container } from '../../components/Container'
import { SectionLabel } from '../../components/SectionLabel'
import { FilterTabs } from '../../components/FilterTabs'
import { LabCard } from './LabCard'
import { ProjectPeek } from './ProjectPeek'
import { PROJECT_FILTERS, projectsIn, type Project, type ProjectFilter } from './projects'
import styles from './Lab.module.css'

/** The year a project wrapped up; ongoing work counts as this year. */
const endYear = (project: Project) => (project.period.end ?? new Date().toISOString()).slice(0, 4)

/** Groups an already newest-first list under the years the projects ended, newest year first. */
function byYear(projects: readonly Project[]) {
  const groups = new Map<string, Project[]>()
  for (const project of projects) {
    const year = endYear(project)
    groups.set(year, [...(groups.get(year) ?? []), project])
  }
  return [...groups]
}

/** 04 ARCHIVE — breadth. Every project, newest first, grouped by year, filtered by context. */
export function Lab() {
  const [active, setActive] = useState<ProjectFilter>('All')
  const [peekId, setPeekId] = useState<string>()
  const shown = projectsIn(active)
  const peek = shown.find((p) => p.id === peekId) ?? shown[0]

  return (
    <section className={styles.lab} id="archive" aria-labelledby="archive-heading">
      <Container>
        <div className={styles.head}>
          <div>
            <SectionLabel mark tone="gold" anchor={{ id: 'archive', name: 'Project Archive' }} className="reveal reveal-on-scroll">
              04 / Project Archive
            </SectionLabel>

            <h2 className={styles.heading} id="archive-heading">
              <span className="reveal reveal-on-scroll">참여한 프로젝트를</span>
              <span className="reveal reveal-on-scroll">최근 작업부터 모았습니다</span>
            </h2>

            <p className={`${styles.description} reveal reveal-on-scroll`}>
              개인 · 팀 · 해커톤 · 실무 프로젝트, 2021년부터 지금까지.
              <br />
              지금의 기준은 이 작업들을 지나오며 조금씩 생겼습니다.
            </p>
          </div>

          <FilterTabs
            options={PROJECT_FILTERS}
            active={active}
            onChange={setActive}
            label="프로젝트 유형 필터"
            variant="text"
            className="reveal reveal-on-scroll"
          />
        </div>

        {/* announces the result of a filter change; the cards themselves carry no count */}
        <p className={styles.status} role="status">
          {active === 'All' ? '' : `${active} `}프로젝트 {shown.length}개
        </p>

        {shown.length > 0 ? (
          <div className={styles.archive}>
            <div className={styles.years}>
              {byYear(shown).map(([year, projects]) => (
                <div className={styles.year} key={year}>
                  <h3 className={`${styles.yearLabel} reveal reveal-on-scroll`}>{year}</h3>
                  <ul className={styles.grid}>
                    {projects.map((project) => (
                      <li className="reveal reveal-on-scroll" key={project.id}>
                        <LabCard project={project} onPeek={() => setPeekId(project.id)} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {peek && <ProjectPeek project={peek} />}
          </div>
        ) : (
          <p className={styles.empty}>이 유형의 프로젝트가 없습니다.</p>
        )}
      </Container>
    </section>
  )
}
