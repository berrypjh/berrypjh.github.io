import React, { Fragment } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useScroll } from "./useScroll";
import { pricingAnimations } from "animations";
import Title from "./Title";

export default function Skills() {
  const [element, controls] = useScroll();

  const plans = [
    {
      name: "Blockchain",
    },
    {
      name: "Server",
    },
    {
      name: "Client",
    },
    {
      name: "etc",
    },
  ];
  const data = [
    {
      value: "Web3.js",
      type: "Blockchain",
    },
    {
      value: "Hardhat",
      type: "Blockchain",
    },
    {
      value: "Ganache",
      type: "Blockchain",
    },
    {
      value: "Truffle",
      type: "Blockchain",
    },
    {
      value: "Nodejs",
      type: "Server",
    },
    {
      value: "Linux",
      type: "Server",
    },
    {
      value: "MySQL",
      type: "Server",
    },
    {
      value: "MongoDB",
      type: "Server",
    },
    {
      value: "Nextjs",
      type: "Client",
    },
    {
      value: "React",
      type: "Client",
    },
    {
      value: "Redux",
      type: "Client",
    },
    {
      value: "Redux-Saga",
      type: "Client",
    },
    {
      value: "HTML/CSS",
      type: "Client",
    },
    {
      value: "ESLint",
      type: "Client",
    },
    {
      value: "Javascript",
      type: "etc",
    },
    {
      value: "Go",
      type: "etc",
    },
    {
      value: "Typescript",
      type: "etc",
    },
    {
      value: "solidity",
      type: "etc",
    },
    {
      value: "EC2",
      type: "etc",
    },
    {
      value: "RDS",
      type: "etc",
    },
    {
      value: "S3",
      type: "etc",
    },
  ];

  return (
    <Section id="skills" ref={element}>
      <Title title="SKILLS" secondary="" />
      <div className="pricing">
        {plans.map(({ name }, index) => {
          return (
            <motion.div
              className="pricing__plan"
              key={index}
              variants={pricingAnimations}
              animate={controls}
              transition={{
                delay: 0.03,
                type: "tween",
                duration: 0.8,
              }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="pricing__plan__name">
                <h2>{name}</h2>
              </div>
              <div className="pricing__plan__content">
                <ul className={`pricing__plan__content__features ${name}`}>
                  {data.map(({ value, type }, index2) => {
                    return (
                      <Fragment key={index2}>
                        {name === type && <li>{value}</li>}
                      </Fragment>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  min-height: 100vh;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
  .background {
    .bg1 {
      position: absolute;
      top: -60%;
      left: -5%;
      z-index: -1;
    }
    .bg2 {
      position: absolute;
      right: 0;
      bottom: 5rem;
    }
  }
  .pricing__title {
    margin: 6rem 10rem;
    p {
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
    }
    h2 {
      color: #fff;
      font-size: 2rem;
      line-height: 0;
    }
  }
  .pricing__plan__name {
    h2 {
      color: var(--primary-background-color);
    }
  }
  .pricing {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0 10rem;
    &__plan {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      &__name {
        background-color: rgba(137, 113, 91);
        width: 15rem;
        height: 15rem;
        border-radius: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: var(--secondary-color);
        h2 {
          font-size: 2rem;
          line-height: 1.3rem;
          line-height: 0;
        }
      }
      &__content {
        &__features {
          list-style-type: none;
          text-align: center;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          .line {
            text-decoration: line-through;
          }
          margin-bottom: 2rem;
        }

        &__actions {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          gap: 0.5rem;
          span {
            text-transform: uppercase;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    padding: 1rem;
    background-color: var(137, 113, 91);
    .pricing__title {
      margin: 0;
      padding: 0 2rem;
      text-align: center;
      h2 {
        font-size: 1.3rem;
      }
    }
    .background {
      display: none;
    }
    .pricing {
      grid-template-columns: 1fr;
      padding: 1rem;
      gap: 4rem;
      &__plan {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        &__name {
          height: 10rem;
          width: 10rem;
          h2 {
            font-size: 1.5rem;
          }
          &__price {
            p {
              font-size: 3rem;
            }
          }
        }
        &:nth-child(2) {
          .pricing__plan__content {
            padding: 0rem;
            border: none;
          }
        }
      }
    }
  }
`;
