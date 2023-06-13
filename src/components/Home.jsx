import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import { motion } from "framer-motion";
import { homeAnimation } from "animations";

export default function Home() {
  return (
    <Section id="home">
      <Navbar />
      <motion.div
        variants={homeAnimation}
        transition={{ delay: 0.3, duration: 0.6, type: "tween" }}
        className="home"
      >
        <div className="content">
          <div className="title">
            <h1>I AM BLOCKCHAIN DEVELOPER</h1>
          </div>
          <div className="subTitle">
            <p>#블록체인 #웹 #블로그 #정리 #신입</p>
            <a href="https://github.com/berrypjh">
              <img src="/stack_icons/GitHub.png" alt="" />
            </a>
            <a href="https://berrypjh.tistory.com">
              <img src="/stack_icons/Tistory.png" alt="" />
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

const Section = styled.section`
  background-size: cover;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  .home {
    height: 100%;
    .content {
      height: 100%;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.2rem;
      padding-left: 10rem;
      margin-top: 10rem;
      width: 60%;
      .title {
        h1 {
          font-size: 5rem;
          line-height: 5.3rem;
        }
      }
      .subTitle {
        p {
          width: 100%;
          margin-bottom: 2rem;
        }

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .home {
      .content {
        padding-left: 2rem;
        width: 100%;
        margin-bottom: 2rem;
        .title {
          h1 {
            font-size: 4rem;
            line-height: 4rem;
          }
        }
      }
    }
    .info {
      position: initial;
      .grid {
        grid-template-columns: 1fr;
      }
    }
  }
`;
