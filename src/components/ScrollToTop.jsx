import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronUp } from "react-icons/fa";
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  window.addEventListener("scroll", () => {
    window.pageYOffset > 100 ? setVisible(true) : setVisible(false);
  });
  return (
    <>
      <ImgGitHub>
        <a
          href="https://github.com/berrypjh"
          className={`${visible ? "block" : "none"}`}
        >
          <img src="/stack_icons/GitHub.png" alt="" />
        </a>
      </ImgGitHub>
      <ImgTistory>
        <a
          href="https://berrypjh.tistory.com"
          className={`${visible ? "block" : "none"}`}
        >
          <img src="/stack_icons/Tistory.png" alt="" />
        </a>
      </ImgTistory>
      <Div>
        <a href="#" className={`${visible ? "block" : "none"}`}>
          <FaChevronUp />
        </a>
      </Div>
    </>
  );
}

const ImgGitHub = styled.div`
  max-width: 100vw;
  .none {
    opacity: 0;
    visibility: hidden;
  }
  a {
    position: fixed;
    bottom: 25px;
    right: 85px;
    padding: 1rem;
    border-radius: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s ease-in-out;
    z-index: 99;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    svg {
      background-color: var(--secondary-font-color);
      font-size: 1.3rem;
      path {
        color: var(--primary-background-color);
      }
    }
    @media screen and (min-width: 280px) and (max-width: 1080px) {
      left: 75vw;
      right: initial;
    }
  }
`;
const ImgTistory = styled.div`
  max-width: 100vw;
  .none {
    opacity: 0;
    visibility: hidden;
  }
  a {
    position: fixed;
    bottom: 25px;
    right: 145px;
    background-color: transparent;
    padding: 1rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s ease-in-out;
    z-index: 99;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    svg {
      background-color: var(--secondary-font-color);
      font-size: 1.3rem;
      path {
        color: var(--primary-background-color);
      }
    }
    @media screen and (min-width: 280px) and (max-width: 1080px) {
      left: 75vw;
      right: initial;
    }
  }
`;

const Div = styled.div`
  max-width: 100vw;
  .none {
    opacity: 0;
    visibility: hidden;
  }
  a {
    position: fixed;
    bottom: 40px;
    right: 40px;
    background-color: var(--secondary-font-color);
    padding: 1rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s ease-in-out;
    z-index: 99;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    svg {
      background-color: var(--secondary-font-color);
      font-size: 1.3rem;
      path {
        color: var(--primary-background-color);
      }
    }
    @media screen and (min-width: 280px) and (max-width: 1080px) {
      left: 75vw;
      right: initial;
    }
  }
`;

export default ScrollToTop;
