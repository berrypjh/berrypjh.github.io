import { useId, useState } from 'react'
import { PreviewStage } from '../../components/PreviewStage'
import { ProjectPreview } from './ProjectPreview'
import { imageOf } from './images'
import { ImageZoom } from './ImageZoom'
import { Screenshot } from '../../components/Screenshot'
import { CalendarIcon, ChevronIcon, GitHubIcon, LockIcon, TeamIcon, TechIcon } from './icons'
import type { Project } from './projects'
import styles from './LabCard.module.css'

/** ISO date as shown on the card: 2022-05 → 2022.05. */
const displayDate = (iso: string) => iso.replaceAll('-', '.')

/** Month precision for the collapsed row, so every row's period has the same width. */
const displayMonth = (iso: string) => displayDate(iso.slice(0, 7))

/** How many stack logos the collapsed row previews; the panel lists them all. */
const ROW_LOGOS = 4

function teamLabel({ teamSize }: Project) {
  return teamSize === 'solo' ? '개인' : `${teamSize}명`
}

/**
 * One archive entry as a disclosure: a scannable row that opens into the details.
 * The row is the only control; the GitHub link lives in the panel, never inside it.
 */
export function LabCard({ project, onPeek }: { project: Project; onPeek: () => void }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const { period } = project
  const image = imageOf(project)
  const fullTitle = project.company ? `${project.company} ${project.title}` : project.title

  return (
    <article className={styles.card} data-open={open} onPointerEnter={onPeek} onFocus={onPeek}>
      <h4 className={styles.heading}>
        <button
          className={styles.toggle}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
        >
          <span className={styles.number}>{String(project.order).padStart(2, '0')}</span>
          <span className={styles.name}>
            {project.company && <span className={styles.company}>{project.company}</span>}
            {project.title}
          </span>
          <span className={styles.logos} aria-hidden="true">
            {project.stack.slice(0, ROW_LOGOS).map((tech) => (
              <TechIcon name={tech} className={styles.logo} key={tech} />
            ))}
          </span>
          <span className={styles.kind}>{project.context}</span>
          <span className={styles.when}>
            {displayMonth(period.start)} – {period.end ? displayMonth(period.end) : '진행 중'}
          </span>
          <ChevronIcon className={styles.chevron} />
        </button>
      </h4>

      <div className={styles.panel} id={panelId} inert={!open}>
        <div className={styles.panelInner}>
          <div className={styles.detail}>
            {image ? (
              <ImageZoom src={image} title={fullTitle}>
                <PreviewStage tone="dark" size="featured">
                  <Screenshot src={image} frame={5 / 3} />
                </PreviewStage>
              </ImageZoom>
            ) : (
              <PreviewStage tone="dark" size="featured">
                <ProjectPreview project={project} />
              </PreviewStage>
            )}

            <div className={styles.body}>
              <div className={styles.facts}>
                <p className={`${styles.fact} ${styles.meta}`}>
                  <CalendarIcon className={styles.icon} />
                  <span>
                    <time dateTime={period.start}>{displayDate(period.start)}</time>
                    {' – '}
                    {period.end ? <time dateTime={period.end}>{displayDate(period.end)}</time> : '진행 중'}
                  </span>
                </p>

                <p className={`${styles.fact} ${styles.meta}`}>
                  <TeamIcon className={styles.icon} />
                  {teamLabel(project)}
                </p>

                <p className={styles.domain}>{project.domain}</p>
              </div>

              <p className={styles.summary}>{project.summary}</p>

              {project.responsibilities && (
                <ul className={styles.duties} aria-label="담당 업무">
                  {project.responsibilities.map((duty) => (
                    <li key={duty}>{duty}</li>
                  ))}
                </ul>
              )}

              <div className={styles.foot}>
                <ul className={styles.stack} aria-label="기술 스택">
                  {project.stack.map((tech) => (
                    <li className={styles.fact} key={tech}>
                      <TechIcon name={tech} className={styles.icon} />
                      {tech}
                    </li>
                  ))}
                </ul>

                {project.visibility === 'public' ? (
                  <div className={styles.links}>
                    {project.links?.map(({ label, href }) => (
                      <a
                        className={styles.repo}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} ${label}, 새 탭에서 열림`}
                        key={label}
                      >
                        {label}
                        <span className={styles.repoArrow} aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ))}
                    <a
                      className={styles.repo}
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub 저장소, 새 탭에서 열림`}
                    >
                      <GitHubIcon className={styles.icon} />
                      GitHub
                      <span className={styles.repoArrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </div>
                ) : (
                  <p className={`${styles.fact} ${styles.private}`}>
                    <LockIcon className={styles.icon} />
                    Public repository 없음
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
