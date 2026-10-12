import type { ReactNode } from 'react'
import { TECH_LOGOS } from './techLogos'

type IconProps = { className?: string }

/** Line icon frame: inherits the text colour, always decorative. */
function Line({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export const CalendarIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Line>
)

export const TeamIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M15.5 4.6a3.5 3.5 0 0 1 0 6.8M17.5 14.3c2.3.6 4 2.8 4 5.7" />
  </Line>
)

/** A tech's monochrome logo, or a quiet ring where no official logo exists. */
export function TechIcon({ name, className }: IconProps & { name: string }) {
  const logo = TECH_LOGOS[name]
  if (!logo) {
    return (
      <Line className={className}>
        <circle cx="12" cy="12" r="4" />
      </Line>
    )
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={logo} />
    </svg>
  )
}

export const ChevronIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="m6 9 6 6 6-6" />
  </Line>
)

export const ZoomIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4M11 8.5v5M8.5 11h5" />
  </Line>
)

export const CloseIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Line>
)

export const LockIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
  </Line>
)

/** GitHub's octicon mark. */
export const GitHubIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
)
