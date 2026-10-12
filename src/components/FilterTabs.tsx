import { Fragment } from 'react'
import styles from './FilterTabs.module.css'

type FilterTabsProps<T extends string> = {
  options: readonly T[]
  active: T
  onChange: (value: T) => void
  label: string
  /** mono: compact uppercase tabs. text: larger sentence-case tabs split by slashes. */
  variant?: 'mono' | 'text'
  className?: string
}

/** Text filters shared by the portfolio galleries. Selected state is a rule, not a pill. */
export function FilterTabs<T extends string>({
  options,
  active,
  onChange,
  label,
  variant = 'mono',
  className,
}: FilterTabsProps<T>) {
  const classes = [styles.filters, styles[variant], className].filter(Boolean).join(' ')
  return (
    <div className={classes} role="group" aria-label={label}>
      {options.map((option, i) => (
        <Fragment key={option}>
          {variant === 'text' && i > 0 && (
            <span className={styles.divider} aria-hidden="true">
              /
            </span>
          )}
          <button
            className={styles.filter}
            type="button"
            aria-pressed={option === active}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
