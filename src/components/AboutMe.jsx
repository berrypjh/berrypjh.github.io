import React from "react";
import styled from "styled-components";
import Title from "./Title";
import { skillsBarAnimations } from "animations";
import { motion } from "framer-motion";
import { useScroll } from "./useScroll";
function AboutMe() {
  const [element, controls] = useScroll();

  return (
    <Section id="aboutme" ref={element}>
      <div className="portfolio__title">
        <hr />
      </div>
      <Title title="ABOUT ME" secondary="" />
      <motion.div
        className="testimonials"
        variants={skillsBarAnimations}
        animate={controls}
        transition={{
          delay: 0.03,
          type: "tween",
          duration: 0.8,
        }}
        whileInView={{ opacity: 1 }}
      >
        <div className="skills">
          <div className="skills__content">
            <img src="/Profile/Park.png" alt="" />
            <span className="info">
              <h3 className="title">박준혁 (Junhyuk Park)</h3>
              <p className="description">- 서울특별시 관악구</p>
              <p className="description">- junhyeg08@gmail.com</p>
            </span>
          </div>
          <div className="skills__content">
            <h1 className="skills__content__main">
              정리와 관리에 능하며 꾸준히 공부하고 성장하는 신입
              프로그래머입니다.
            </h1>
            <h3 className="skills__content__main">
              한 번의 기능 구현을 위해 따라 하는 것이 아니라 구현하고 필요할 때
              언제든지 참조할 수 있도록 나만의 블로그에 정리를 해두는 습관을
              가지고 있습니다.
            </h3>
            <div className="career">
              <h4 className="description">
                <img src="/favicon.png" alt="star" />
                2021.08 ~ 2022.05 블록체인 기반 핀테크 및 응용 SW개발자 양성과정
                수료
              </h4>
              <h4 className="description">
                <img src="/favicon.png" alt="star" />
                2019.03 ~ 2020.02 학점은행제 전기과 4년 졸업
              </h4>
              <h4 className="description">
                <img src="/favicon.png" alt="star" />
                2015.03 ~ 2019.02 국제대학교 전기과 졸업
              </h4>
            </div>
            <h3 className="skills__content__main">
              비트코인을 이해하기 위해 간단한 비트코인 코어도 구현하고 web3,
              truffle, ganache 을 이용한 DApp 투표 앱, 스트리밍 사이트
              프로젝트를 진행해보았습니다.
            </h3>
            <h3 className="skills__content__main">
              또한, Nodejs 와 React 를 사용하여 Redux-saga로 상태 관리와 Nextjs
              의 pre-rendering을 사용해 프로젝트를 진행해보았습니다.
            </h3>
            <h3 className="skills__content__main">
              탈중앙화 시스템에 관한 정보를 꾸준히 습득하고 남들이 생각하지 못한
              부분을 구현하는 특별한 프로그래머가 되고 싶습니다.
            </h3>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

const Section = styled.section`
  min-height: 100vh;
  .portfolio__title {
    width: 100%;
    background-color: gray;
    margin-bottom: 50px;
    hr {
      border: solid 1px var(--secondary-font-color);
    }
  }
  .background {
    position: relative;
    .design1 {
      position: absolute;
      right: 0;
      z-index: 1;
    }
    .design2 {
      position: absolute;
      left: 0;
      z-index: 1;
      top: 20rem;
    }
  }
  .sideTitle {
    h1 {
      color: white;
      font-size: 9rem;
      z-index: 2;
    }
  }
  .skills__title {
    padding: 6rem 10rem;
    p {
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      color: var(--primary-color);
    }
    h2 {
      color: white;
      font-size: 2rem;
    }
  }
  .skills {
    display: flex;
    padding: 0 14rem;
    margin-top: -25px;
    gap: 3rem;
    img {
      border-radius: 50%;
      width: 400px;
      height: 400px;
    }
    .skills__content {
      h1 {
        color: var(--secondary-font-color);
      }
    }
    .career {
      margin-bottom: 20px;
    }
    .description {
      img {
        width: 20px;
        height: 20px;
        vertical-align: bottom;
        margin-right: 4px;
      }
    }
    &__bars {
      transform: rotate(-90deg);
      width: max-content;
      height: max-content;
      display: flex;
      flex-direction: column;
      gap: 4rem;
      &__bar {
        display: flex;
        flex-direction: row-reverse;

        gap: 1rem;

        .container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          span {
            text-transform: uppercase;
            letter-spacing: 0.2rem;
            color: var(--primary-color);
          }
          progress {
            width: 30rem;
            -webkit-appearance: none;
            appearance: none;
            &::-webkit-progress-bar {
              height: 3rem;
              background-color: white;
            }
            &::-webkit-progress-value {
              background-color: var(--primary-color);
            }
          }
        }
        h3 {
          transform: rotate(90deg);
          color: white;
          font-size: 2rem;
        }
      }
    }
    &__content {
      display: flex;
      flex-direction: column;
      gap: 2px;
      color: white;
      z-index: 2;
      .info {
        margin: 0 auto;
        .title {
          font-weight: bolder;
          letter-spacing: 0.1rem;
          margin-top: 20px;
        }
      }
      &__main {
        margin-bottom: 20px;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    overflow-x: hidden;
    padding: 2rem 0;
    .background {
      display: none;
    }
    .skills__title {
      padding: 2rem;
      text-align: center;
      h2 {
        font-size: 1.5rem;
      }
    }
    .skills {
      padding: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      &__bars {
        padding: 0.2rem;
        gap: 0rem;
        align-items: center;
        justify-content: center;
        &__bar {
          .container {
            gap: 1rem;
            progress {
              width: 12rem;
              height: 0.5rem;
              &::-webkit-progress-bar {
                height: 0.3rem;
              }
            }
          }
          h3 {
            font-size: 1rem;
          }
        }
      }
      &__content {
        padding: 0 2rem;
      }
    }
  }
`;

export default AboutMe;
