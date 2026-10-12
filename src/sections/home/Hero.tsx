import { Container } from '../../components/Container'
import { SectionLabel } from '../../components/SectionLabel'
import { TextLink } from '../../components/TextLink'
import { HeroStage } from './HeroStage'
import styles from './Hero.module.css'

/**
 * 01 HOME — the stance. Editorial copy on the left, the signature stage on the right.
 * The stage comes first in the DOM so it leads on mobile; on desktop the grid places it.
 */
export function Hero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="home-headline">
      <Container className={styles.shell}>
        <div className={styles.grid}>
          <HeroStage className={`${styles.stage} reveal`} />

          <div className={styles.content}>
            <SectionLabel mark tone="gold" className="reveal">
              01 / Junhyuk Park · Frontend Developer
            </SectionLabel>

            <h1 className={styles.headline} id="home-headline">
              <span className="reveal">만들고 나면</span>
              <span className="reveal">쓰는 쪽에 서서</span>
              <span className="reveal">다시 살핍니다</span>
            </h1>

            <p className={`${styles.focus} reveal`}>
              화면과 컴포넌트, 그리고 글을 만드는 프론트엔드 개발자 박준혁입니다.
              <br />
              그것을 쓰는 사람, 가져다 쓰는 개발자, 읽는 사람이
              <br />
              어디서 막히는지를 먼저 살핍니다.
            </p>

            <div className={`${styles.action} reveal`}>
              <TextLink href="#about" direction="down">
                About
              </TextLink>
              <TextLink href="#engineering-ecosystem" direction="down">
                Selected Work
              </TextLink>
            </div>
          </div>
        </div>

        <span className={`${styles.handoff} reveal`} aria-hidden="true" />
      </Container>
    </section>
  )
}
