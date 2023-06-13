import React from "react";
import styled from "styled-components";

const Title = ({ title, secondary }) => {
  return (
    <Section>
      <div className="portfolio_box">
        <div className="portfolio_text">
          <h1>{title}</h1>
          {secondary && <h2>{secondary}</h2>}
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  .portfolio_box {
    align-items: center;
    text-align: center;
    width: 100%;
    margin-bottom: 60px;

    .portfolio_text {
      align-items: center;
      width: 100%;
      margin: 0 auto;
      display: inline-block;

      h1 {
        margin: 0 auto 20px auto;
        display: inline-block;
        width: 100%;
        font-size: 4.5rem;
        color: var(--secondary-font-color);
      }
      h2 {
        margin: 0 auto;
        font-size: 1.1rem;
        display: inline-block;
        width: 100%;
      }
    }
  }
`;

export default Title;
