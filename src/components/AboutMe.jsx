import React from "react";
import styled from "styled-components";
import Title from "./Title";
import { skillsBarAnimations } from "animations";
import { motion } from "framer-motion";
import { useScroll } from "./useScroll";
function AboutMe() {
  const [element, controls] = useScroll();
  const skillsData = [
    {
      name: "creativity",
      amount: 75,
    },
    {
      name: "coding",
      amount: 50,
    },
    {
      name: "react",
      amount: 90,
    },
    {
      name: "marketing",
      amount: 70,
    },
    {
      name: "design",
      amount: 30,
    },
  ];
  return (
    <Section id="aboutme" ref={element}>
      <div className="portfolio__title">
        <hr />
      </div>
      <Title title="ABOUT ME" secondary="" />
      <div className="skills">
        <img src="/1.png" alt="" />
        <div className="skills__content">
          <p className="title">
            Lorem ipsum dolor, sit amet consectetur impedit?
          </p>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eius
            cupiditate incidunt distinctio velit quos dolore, ut, tempore
            suscipit impedit reiciendis voluptas, illo expedita! Necessitatibus!
          </p>
        </div>
      </div>
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
    padding: 0 20rem;
    gap: 10rem;
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
      gap: 2rem;
      color: white;
      z-index: 2;
      .title {
        font-weight: bolder;
        letter-spacing: 0.1rem;
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
