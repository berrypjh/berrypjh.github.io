import Blog from "components/Blog";
import Footer from "components/Footer";
import Home from "components/Home";
import Portfolio from "components/Portfolio";
import Skills from "components/Skills";
import ScrollToTop from "components/ScrollToTop";
import AboutMe from "components/AboutMe";
import React from "react";
import { motion } from "framer-motion";

export default function App() {
  return (
    <motion.div initial="hidden" animate="show">
      <ScrollToTop />
      <Home />

      {/* 자기소개 */}
      <AboutMe />

      {/* 스킬 */}
      <Skills />

      {/* 포트폴리오 */}
      <Portfolio />

      {/* 블로그 */}
      {/* <Blog /> */}

      <Footer />
    </motion.div>
  );
}
