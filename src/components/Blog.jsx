import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useScroll } from "./useScroll";
import { blogsAnimations } from "animations";
import Title from "./Title";

export default function Blog() {
  const [element, controls] = useScroll();
  const blogsData = [
    {
      link: "https://berrypjh.tistory.com/",
      title: "Tistory Blog",
      type: "블록체인 블로그",
      description:
        "Blockchain, solidity Linux 등 블록체인 관련 공부 내용을 정리해두는 블로그입니다.",
      imgNumber: 5,
    },
    {
      link: "https://quark-tangelo-d51.notion.site/eeb139e32de144789fab695fb162ea39?v=40b537c2fd00475085fd54ef008085f9",
      title: "Project Notion",
      type: "프로젝트 노션",
      description:
        "팀프로젝트에서 내가 맡은 파트, 느낀점 등 프로젝트에 대해 상세하게 정리해두는 노션입니다.",
      imgNumber: 6,
    },
    {
      link: "https://blog.naver.com/junhyegpark",
      title: "Naver Blog",
      type: "웹 블로그",
      description:
        "Next.js, React, Node.js, HTML/CSS 등 WEB 관련 공부 내용을 정리해두는 개인 블로그입니다.",
      imgNumber: 4,
    },
  ];

  return (
    <Section id="blog" ref={element}>
      <Title title="BLOG" secondary="클릭 시 해당 페이지로 이동합니다." />
      <div className="blogs">
        {blogsData.map(({ link, title, type, description, imgNumber }) => {
          /* 키 추가 예정 */
          return (
            <a className="blogs_link" href={link}>
              <motion.div
                className="blog"
                key={title}
                variants={blogsAnimations}
                animate={controls}
                transition={{
                  delay: 0.03,
                  type: "tween",
                  duration: 0.8,
                }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div
                  className="image"
                  style={{
                    backgroundImage: `url("/${imgNumber}.png")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="title">
                  <h3>{title}</h3>
                </div>
                <span className="type">{type}</span>
                <div className="description">
                  <p>{description}</p>
                </div>
              </motion.div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  min-height: 100vh;
  position: relative;
  .decoration {
    position: absolute;
    height: 20rem;
    width: 70vw;
    border: 0.5rem solid var(--secondary-color);
    left: 15%;
    top: -2rem;
  }
  .blogs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    margin: 5rem 20rem;
    .blogs_link {
      text-decoration: none;
    }
    .blog {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .image {
        height: 22rem;
        background-color: #a686f0af;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title {
        h3 {
          color: var(--secondary-font-color);
          font-size: 2rem;
        }
      }
      .type {
        color: rgba(136, 113, 91);
        font-weight: bolder;
        text-transform: uppercase;
      }
      .description {
        height: 10rem;
        color: var(--primary-color);
      }
      .more {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        span {
          letter-spacing: 0.1rem;
          text-transform: uppercase;
          color: rgba(136, 113, 91);
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 2rem 0;
    .decoration {
      display: none;
    }
    .blogs {
      padding: 0 2rem;
      grid-template-columns: 1fr;
      margin: 0 1rem;
    }
  }
`;
