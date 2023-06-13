import React, { useState, useEffect } from "react";
import "./Testimonial.css";
import Slide from "./Slide";
import TestimonialApi from "./TestimonialApi";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { FaVoteYea, FaHeadphones, FaBitcoin, FaUserFriends, FaMountain, FaCoffee, FaWallet, FaRegWindowMaximize, FaDonate } from "react-icons/fa";

const Testimonial = () => {
  const [data, setdata] = useState(TestimonialApi);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = data.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, data]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 50000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <>
      <section className="Testimonial" id="clients">
        <div className="container">
          <div className="slide">
            {data.map((value, valueIndex) => {
              return <Slide key={value.id} {...value} valueIndex={valueIndex} index={index} />;
            })}

            <div className="slide_button">
              <button className="btn_shadow prev_btn" onClick={() => setIndex(index - 1)}>
                <BsFillCaretLeftFill />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(0)}>
                <FaDonate />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(1)}>
                <FaRegWindowMaximize />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(2)}>
                <FaWallet />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(3)}>
                <FaHeadphones />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(4)}>
                <FaVoteYea />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(5)}>
                <FaBitcoin />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(6)}>
                <FaUserFriends />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(7)}>
                <FaMountain />
              </button>
              <button className="btn_shadow prev_btn" onClick={() => setIndex(8)}>
                <FaCoffee />
              </button>
              <button className="btn_shadow next_btn" onClick={() => setIndex(index + 1)}>
                <BsFillCaretRightFill />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
