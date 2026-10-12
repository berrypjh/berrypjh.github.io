import type { ReactNode } from 'react'
import { SectionLabel } from '../../components/SectionLabel'
import type { Ecosystem, RepositoryNode } from './showcase'
import styles from './EngineeringEcosystem.module.css'

type RepositoryProps = { node: RepositoryNode; className?: string; children?: ReactNode }

/** One repository as type and a border: role, name, what it holds. */
function Repository({ node, className, children }: RepositoryProps) {
  return (
    <article className={className ? `${styles.node} ${className}` : styles.node}>
      <SectionLabel>{node.role}</SectionLabel>
      <h4 className={styles.name}>{node.name}</h4>
      <ul className={styles.lines}>
        {node.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {children}
    </article>
  )
}

/**
 * The repositories as two sibling panels, never one box.
 * Above: the foundation and the products that consume it, joined by solid rules.
 * Below: the review product outside that graph, reached only across a dashed PR boundary.
 * Every relationship is also written as text; the lines are decoration.
 */
export function EngineeringEcosystem({ ecosystem }: { ecosystem: Ecosystem }) {
  const { foundation, products, review } = ecosystem

  return (
    <div className={styles.ecosystem}>
      <section className={`${styles.panel} reveal reveal-on-scroll`} aria-labelledby="ecosystem-products-heading">
        <h3 className={styles.panelHeading} id="ecosystem-products-heading">
          <SectionLabel>Product ecosystem</SectionLabel>
        </h3>

        <Repository node={foundation} className={styles.foundation} />

        <p className={styles.branch}>
          <span className={styles.branchLabel}>Shared foundation</span>
        </p>

        <ul className={styles.products}>
          {products.map((product) => (
            <li key={product.name}>
              <Repository node={product} />
            </li>
          ))}
        </ul>
      </section>

      <div className={`${styles.boundary} reveal reveal-on-scroll`}>
        <p className={styles.boundaryLabel}>External PR review</p>
        <span className={styles.boundaryLine} aria-hidden="true" />
      </div>

      <section className={`${styles.panel} ${styles.review} reveal reveal-on-scroll`} aria-labelledby="ecosystem-review-heading">
        <h3 className={styles.panelHeading} id="ecosystem-review-heading">
          <SectionLabel>Independent review</SectionLabel>
        </h3>

        <div className={styles.reviewBody}>
          <Repository node={review}>
            <ol className={styles.flow} aria-label="검사 흐름">
              {review.flow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Repository>

          <div className={styles.coverage}>
            <SectionLabel>Current coverage</SectionLabel>
            <dl className={styles.coverageList}>
              {review.coverage.map(([repository, state]) => (
                <div className={styles.coverageRow} key={repository}>
                  <dt>{repository}</dt>
                  <dd>{state}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}
