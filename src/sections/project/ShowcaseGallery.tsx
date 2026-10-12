import { PreviewStage } from '../../components/PreviewStage'
import { Screenshot } from '../../components/Screenshot'
import type { GalleryShowcase, Shot } from './showcase'
import styles from './ShowcaseGallery.module.css'

/** Screenshots in ./assets, picked up by file name: assets/<case id>-<shot id>.<ext>. */
const FILES = import.meta.glob<string>('./assets/*.{png,jpg,jpeg,webp,gif}', { eager: true, import: 'default' })

const BY_NAME = new Map(
  Object.entries(FILES).map(([path, url]) => [path.slice('./assets/'.length).replace(/\.\w+$/, ''), url]),
)

/** The real screenshot, or a quiet empty frame until it arrives; never an invented UI. */
function Shot({ src, frame }: { src?: string; frame: number }) {
  return src ? (
    <Screenshot src={src} frame={frame} />
  ) : (
    <span className={styles.empty} />
  )
}

/** One main card beside its text, then the sub cards in a row, as the portfolio's galleries do. */
export function ShowcaseGallery({ showcase }: { showcase: GalleryShowcase }) {
  const [main, ...subs] = showcase.shots
  const image = (shot: Shot) => BY_NAME.get(`${showcase.id}-${shot.id}`)

  return (
    <div className={styles.gallery}>
      <article className={`${styles.card} ${styles.featured} reveal reveal-on-scroll`}>
        <PreviewStage tone="dark" size="featured">
          <Shot src={image(main)} frame={5 / 3} />
        </PreviewStage>

        <div className={styles.featuredBody}>
          <span className={styles.featuredRule} />
          <h3 className={styles.featuredTitle}>{main.title}</h3>
          <p className={styles.featuredMeta}>{main.meta}</p>
        </div>
      </article>

      <ul className={styles.row}>
        {subs.map((shot) => (
          <li className={`${styles.card} reveal reveal-on-scroll`} key={shot.id}>
            <PreviewStage tone="dark">
              <Shot src={image(shot)} frame={6 / 5} />
            </PreviewStage>

            <span className={styles.rule} />

            <div className={styles.body}>
              <h3 className={styles.title}>{shot.title}</h3>
              <p className={styles.meta}>{shot.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
