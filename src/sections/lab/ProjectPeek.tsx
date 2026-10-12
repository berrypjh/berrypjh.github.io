import { PreviewStage } from '../../components/PreviewStage'
import { ProjectPreview } from './ProjectPreview'
import { imageOf } from './images'
import { ImageZoom } from './ImageZoom'
import { Screenshot } from '../../components/Screenshot'
import type { Project } from './projects'
import styles from './ProjectPeek.module.css'

/**
 * Wide-screen companion to the list: the screenshot of the row under the pointer
 * or keyboard focus. Decorative; every fact it shows is already in the row.
 * Its zoom is a pointer shortcut; keyboard users open the same image from the row's panel.
 */
export function ProjectPeek({ project }: { project: Project }) {
  const image = imageOf(project)
  const fullTitle = project.company ? `${project.company} ${project.title}` : project.title

  return (
    <div className={styles.peek}>
      <div className={styles.frame} key={project.id}>
        {image ? (
          <ImageZoom src={image} title={fullTitle} focusable={false}>
            <PreviewStage tone="dark" size="featured">
              <Screenshot src={image} frame={5 / 3} lazy={false} />
            </PreviewStage>
          </ImageZoom>
        ) : (
          <PreviewStage tone="dark" size="featured">
            <ProjectPreview project={project} />
          </PreviewStage>
        )}

        <p className={styles.caption} aria-hidden="true">
          <span className={styles.number}>{String(project.order).padStart(2, '0')}</span>
          <span>
            {project.company && <span className={styles.company}>{project.company}</span>}
            {project.title}
          </span>
        </p>
      </div>
    </div>
  )
}
