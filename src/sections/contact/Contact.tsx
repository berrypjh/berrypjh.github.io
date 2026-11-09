import { Container } from '../../components/Container'
import { SectionLabel } from '../../components/SectionLabel'
import styles from './Contact.module.css'

type Topic = {
  number: string
  category: string
  count: string
  lines: readonly [string, string]
  /** The zone's published address. Leave empty until it is live; the link appears once filled. */
  href?: string
}

/** The tech blog's three zones; counts are the pages in berrypjh/it-tech-blog, or 준비 중 before a zone ships. */
const TOPICS: readonly Topic[] = [
  {
    number: '01',
    category: 'React Deep Dive',
    count: '136페이지',
    lines: ['Fiber · 렌더와 커밋 · Hooks · 이벤트,', 'React 소스로 내부 동작 읽기'],
    href: 'https://it-tech-blog-gj6u.vercel.app/react',
  },
  {
    number: '02',
    category: 'Web Accessibility',
    count: '준비 중',
    lines: ['장애 유형 · 보조 기술 ·', '키보드 · 명도 대비'],
    href: 'https://it-tech-blog-gj6u.vercel.app/accessibility',
  },
  {
    number: '03',
    category: 'Computer Architecture',
    count: '준비 중',
    lines: ['디지털 회로에서 CPU까지,', '직접 만져 보는 컴퓨터 구조'],
    href: 'https://it-tech-blog-gj6u.vercel.app/computer-architecture',
  },
]

/** Closing links. A channel with an href is a real link; until then it stays plain text with no arrow. */
const CHANNELS: readonly { label: string; href?: string }[] = [
  { label: 'GitHub', href: 'https://github.com/berrypjh' },
  { label: 'Blog', href: 'https://it-tech-blog-gj6u.vercel.app/' },
]

/** 05 WRITING / CONTACT — closure. Explaining is one more interface: what the tech blog covers, then how to get in touch. */
export function Contact() {
  return (
    <section className={styles.contact} id="writing" aria-labelledby="writing-heading">
      <Container>
        <SectionLabel mark tone="gold" anchor={{ id: 'writing', name: 'Writing' }} className="reveal reveal-on-scroll">
          05 / Writing
        </SectionLabel>

        <h2 className={styles.heading} id="writing-heading">
          <span className="reveal reveal-on-scroll">이해한 것을 다시 풀어,</span>
          <span className="reveal reveal-on-scroll">다음 사람이 덜 헤매도록 남겨 둡니다</span>
        </h2>

        <p className={`${styles.lede} reveal reveal-on-scroll`}>
          제품에서는 화면으로, 라이브러리에서는 API와 문서로,
          <br />
          배운 것은 글과 예제로 다시 설명하려 합니다.
          <br />
          읽는 화면에도 테마 · 언어 · 글자 크기 · 모션 설정과 건너뛰기 링크를 두었습니다.
        </p>

        <ol className={styles.activities}>
          {TOPICS.map(({ number, category, count, lines, href }) => (
            <li className={`${styles.col} reveal reveal-on-scroll`} key={number}>
              <span className={styles.number} aria-hidden="true">
                {number}
              </span>
              <div>
                <SectionLabel className={styles.category}>{category}</SectionLabel>
                <p className={styles.count}>{count}</p>
                <p className={styles.description}>
                  {lines[0]}
                  <br />
                  {lines[1]}
                </p>
                {href && (
                  <a
                    className={styles.more}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${category} 글 보기, 새 탭에서 열림`}
                  >
                    글 보기
                    <span className={styles.moreArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.closing}>
          <span className={`${styles.dash} reveal reveal-on-scroll`} aria-hidden="true" />
          <h3 className={`${styles.statement} reveal reveal-on-scroll`}>기록은 여기서 이어집니다</h3>

          <div className={styles.links}>
            {CHANNELS.map(({ label, href }) =>
              href ? (
                <a
                  className={`${styles.link} reveal reveal-on-scroll`}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label}, 새 탭에서 열림`}
                  key={label}
                >
                  {label}
                  <span className={styles.linkArrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : (
                <span className={`${styles.link} reveal reveal-on-scroll`} key={label}>
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
