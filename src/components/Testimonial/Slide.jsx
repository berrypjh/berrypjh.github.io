import React from "react";
import TestimonialApi from "./TestimonialApi";

const Slide = ({ id, image, items, name, explanation, term, mission, valueIndex, index, GiHubLink, BlogLink }) => {
  let position = "nextSlide";
  if (valueIndex === index) {
    position = "activeSlide";
  }
  if (valueIndex === index - 1 || (index === 0 && valueIndex === TestimonialApi.length - 1)) {
    position = "lastSlide";
  }

  return (
    <>
      <article className={`d_flex ${position}`} key={id}>
        <div className="left box_shodow">
          <div className="img">
            <img src={image} alt="" width="100vw" />
            <div className="details_button">
              <span className="details_btn">
                <a href={BlogLink}>
                  {(id === 1 || id === 2) && <img src="/stack_icons/H.png" alt="" />}
                  {id === 7 && <img src="/stack_icons/Tistory.png" alt="" />}
                  {!(id === 1 || id === 2 || id === 7) && <img src="/stack_icons/Notion.png" alt="" />}
                  <div className="btn_text">상세 정보</div>
                </a>
              </span>
              <span className="details_btn">
                <a href={GiHubLink}>
                  <img src="/stack_icons/GitHub.png" alt="" />
                  <div className="btn_text">GITHUB</div>
                </a>
              </span>
            </div>
          </div>
          <div className="details mtop">
            <h2>{name}</h2>
            <div className="explanation details_contents">{explanation}</div>
            <div className="details_contents">
              <span className="contents_title">제작 기간 :</span> {term}
            </div>
            <span className="primary_color details_contents">
              <span className="contents_title">나의 임무 :</span> {mission}
            </span>
            <span className="primary_color details_contents contents_tool">
              {items &&
                items.map((item, index) => {
                  return (
                    <span key={item}>
                      <img className="imgItem" src={`/stack_icons/${item}.png`} alt={item} />
                    </span>
                  );
                })}
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default Slide;
