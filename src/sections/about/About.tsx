import { Container } from '../../components/Container'
import { SectionLabel } from '../../components/SectionLabel'
import { ProfileGroups } from './ProfileGroups'
import portrait from './assets/portrait.png'
import portraitTablet from './assets/portrait-tablet.png'
import styles from './About.module.css'

/**
 * 02 ABOUT — the criterion behind the decisions. Identity column, work profile column, portrait, closing principle.
 * The graphic word comes first in the DOM so the portrait paints over it without z-index.
 */
export function About() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <Container>
        <span className={`${styles.mark} reveal reveal-on-scroll`} aria-hidden="true">
          BUILD
        </span>

        <div className={styles.spread}>
          <div className={styles.identity}>
            <SectionLabel mark tone="gold" anchor={{ id: 'about', name: 'About' }} className="reveal reveal-on-scroll">
              02 / About
            </SectionLabel>

            <h2 className={styles.heading} id="about-heading">
              <span className="reveal reveal-on-scroll">만든 사람의 맥락을</span>
              <span className="reveal reveal-on-scroll">몰라도 되게 합니다</span>
            </h2>

            <p className={`${styles.bio} reveal reveal-on-scroll`}>
              제품을 쓰는 사람도, 컴포넌트를 가져다 쓰는 개발자도,
              <br />
              글을 읽는 사람도 결국 같은 질문을 만나게 됩니다.
              <br />
              어디에서 한 번 더 망설이게 되는지 살피고,
              <br />
              그 고민을 인터페이스 안으로 옮겨 두려 합니다.
            </p>

            <hr className={`${styles.rule} reveal reveal-on-scroll`} />

            <div className={styles.principle}>
              <span className={`${styles.quoteMark} reveal reveal-on-scroll`} aria-hidden="true">
                &ldquo;
              </span>
              <p className={styles.quote}>
                <span className="reveal reveal-on-scroll">필요한 복잡함은 구현 안에 두고,</span>
                <span className="reveal reveal-on-scroll">쓰는 사람에게는 꼭 필요한 선택만 남깁니다</span>
              </p>
            </div>
          </div>

          <div className={styles.profile}>
            <ProfileGroups />
          </div>

          <picture className={styles.picture}>
            <source media="(max-width: 900px)" srcSet={portraitTablet} />
            <img
              className={`${styles.portrait} reveal reveal-on-scroll`}
              src={portrait}
              alt=""
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        <div className={`${styles.footer} reveal reveal-on-scroll`}>
          <SectionLabel mark className={styles.place}>
            Korea, Seoul
            <span className={styles.divider} aria-hidden="true">
              |
            </span>
            Based in Frontend
          </SectionLabel>
          <SectionLabel>만들고, 써 보고, 고칩니다</SectionLabel>
        </div>
      </Container>
    </section>
  )
}
