import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useScroll } from "./useScroll";
import { portfolioAnimation } from "animations";
import Title from "./Title";
import Testimonial from "./Testimonial/Testimonial";

function Portfolio() {
  const [element, controls] = useScroll();

  return (
    <Section id="portfolio" ref={element}>
      <Title
        title="PORTFOLIO"
        secondary="사진에 마우스를 올려 더 자세한 정보를 확인할 수 있습니다."
      />
      <div className="grid">
        <motion.div
          className="child-three"
          variants={portfolioAnimation}
          animate={controls}
          transition={{
            delay: 0.03,
            type: "tween",
            duration: 0.8,
          }}
          viewport={{ once: true }}
        >
          <Testimonial />
        </motion.div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  min-height: 100vh;
  padding: 2rem 0;
  margin-top: 70px;
  margin-bottom: -100px;
  .background {
    position: relative;
    .design1 {
      position: absolute;
      z-index: 1;
      right: 8%;
      top: 0;
    }
    .design2 {
      position: absolute;
      z-index: 1;
      left: 0;
      top: 30rem;
      height: 40rem;
    }
  }

  .sideTitle {
    z-index: 2;
  }
  .grid {
    padding: 0 12rem;
    display: grid;
    margin-top: -40px;
    margin-bottom: 130px;
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .background {
      display: none;
    }
    .grid {
      margin-bottom: 200px;
      padding: 2rem 4rem;
      grid-template-columns: 1fr;
      grid-template-areas:
        "one"
        "two"
        "three"
        "four"
        "five"
        "six"
        "seven"
        "eight";
      .grid-box {
        height: 10rem !important;
      }
    }
  }
`;

export default Portfolio;
