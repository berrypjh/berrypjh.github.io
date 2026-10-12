import { useRef, type ReactNode } from 'react'
import { CloseIcon, ZoomIcon } from './icons'
import styles from './ImageZoom.module.css'

type ImageZoomProps = {
  src: string
  /** The project title; names the button and the enlarged image. */
  title: string
  /** The thumbnail it opens from. */
  children: ReactNode
  /** false for a pointer-only duplicate, e.g. inside a decorative preview. */
  focusable?: boolean
}

/**
 * Wraps a thumbnail in a button that opens the full screenshot in a native modal dialog.
 * The dialog brings focus trapping, Escape and the backdrop; clicking the backdrop closes it.
 */
export function ImageZoom({ src, title, children, focusable = true }: ImageZoomProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        className={styles.trigger}
        type="button"
        aria-haspopup="dialog"
        aria-label={`${title} 이미지 크게 보기`}
        tabIndex={focusable ? undefined : -1}
        onClick={() => dialog.current?.showModal()}
      >
        {children}
        <span className={styles.badge} aria-hidden="true">
          <ZoomIcon className={styles.badgeIcon} />
        </span>
      </button>

      <dialog
        className={styles.dialog}
        ref={dialog}
        aria-label={`${title} 이미지`}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <div className={styles.bar}>
          <p className={styles.caption}>{title}</p>
          <button className={styles.close} type="button" onClick={() => dialog.current?.close()}>
            <CloseIcon className={styles.closeIcon} />
            닫기
          </button>
        </div>
        <img className={styles.full} src={src} alt={`${title} 화면`} decoding="async" />
      </dialog>
    </>
  )
}
