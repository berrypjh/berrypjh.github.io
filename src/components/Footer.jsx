import React from "react";
import styled from "styled-components";
import { useScroll } from "./useScroll";

function Footer() {
  const [element, controls] = useScroll();
  return (
    <Foot ref={element}>
      <span className="Template">
        &copy; Template created with love by Kishan Sheth &nbsp;&nbsp;&nbsp; *
        해당 탬플릿을 변형하여 사용하였습니다.
      </span>
    </Foot>
  );
}

const Foot = styled.footer`
  background-color: var(--primary-font-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 0;
  font-size: 12px;
  padding: 2.5rem 5rem;
  .Template {
    background-color: transparent;
    color: white;
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

export default Footer;
