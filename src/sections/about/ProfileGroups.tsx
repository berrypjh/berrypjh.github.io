import { SectionLabel } from '../../components/SectionLabel'
import styles from './ProfileGroups.module.css'

const GROUPS = [
  { label: 'Focus', values: ['Mobile & Web', 'Component Library', 'Quality Gates'] },
  { label: 'Stack', values: ['Next.js', 'Expo', 'Go', 'Playwright'] },
  { label: 'Interest', values: ['Accessibility', 'Dev Experience', 'AI Tooling'] },
]

/** Work profile as a definition list: metadata label above the values it describes. */
export function ProfileGroups() {
  return (
    <dl className={styles.groups}>
      {GROUPS.map((group) => (
        <div className={`${styles.group} reveal reveal-on-scroll`} key={group.label}>
          <dt className={styles.head}>
            <SectionLabel>{group.label}</SectionLabel>
          </dt>
          <dd className={styles.values}>
            <ul>
              {group.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}
