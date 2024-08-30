import React, { useState } from "react";
import "./Home.css";
import CafeBranches from "../components/CafeBranches";
import Reviews from "../components/Reviews";
import { motion } from "framer-motion";
function Home({ newReview }) {
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <div className="homeCont">
      <div className="homeWelcomeImageCont">
        <img
          className="d-block w-100 homeWelcomeImage"
          src="https://www.urbanbelly.com/perch/resources/headers/locations-header-desktop.jpg"
          alt="entrees with sides - Desktop"
        ></img>
      </div>
      <div style={{ backgroundColor: "white", padding: "20px" }}>
        <div className="branchesInfo">
          <div className="brachHeader">
            <h1>BRANCHES</h1>
          </div>

          <CafeBranches />
        </div>
        <div>
          <div className="ratingsSection">
            <div className="brachHeader">
              <h1>Ratings:</h1>
              <div class="star-wrapper">
                <motion.p
                  class="fas fa-star s1"
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  custom={1}
                ></motion.p>
                <motion.p
                  class="fas fa-star s2"
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  custom={2}
                ></motion.p>
                <motion.p
                  class="fas fa-star s3"
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  custom={3}
                >
                  {" "}
                </motion.p>
                <motion.p
                  class="fas fa-star s4"
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  custom={4}
                ></motion.p>
                <motion.p
                  class="fas fa-star s5 "
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  custom={5}
                ></motion.p>
              </div>
            </div>
          </div>

          <div className="ratingsSection">
            <div className="brachHeader">
              <h1>Reviews : </h1>
              <Reviews newReview={newReview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
