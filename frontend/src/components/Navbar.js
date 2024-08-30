import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaHome } from "react-icons/fa";
import "./Navbar.css";
import userContext from "../store/userInfo";
import { motion } from "framer-motion";

export default function Navbar() {
  const [navToggle, setNavToggle] = useState(false);

  const { user } = useContext(userContext);
  const variants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 * Number(index) },
    }),
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        zIndex: "100",
      }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-white text-black "
        style={{ height: "11vh" }}
      >
        <div
          className="container-fluid"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            whileTap={{ scale: 0.85 }}
          >
            <Link
              className="navbar-brand fs-1 fst-italic text-primary"
              to="/"
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                marginLeft: "6px",
              }}
            >
              Cafe69
            </Link>
          </motion.div>

          <button
            className="navbar-toggler bg-primary"
            type="button"
            data-bs-togggle=".navbar-expand"
            // data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              setNavToggle((prev) => !prev);
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse fs-5 ${
              navToggle ? "show" : "hide"
            }`}
            id="navbarNav"
            style={{
              zIndex: "10",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: navToggle ? "column" : "row",
                gap: "50px",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
              }}
            >
              <ul
                className="navbar-nav"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "50px",
                  textDecoration: "none",
                }}
              >
                <motion.li
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                  whileTap={{ scale: 0.85 }}
                  className="nav-item"
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active navOption" : "navOption"
                    }
                    aria-current="page"
                    to="/"
                    onClick={() => {
                      setNavToggle(false);
                    }}
                  >
                    <FaHome />
                    Home
                  </NavLink>
                </motion.li>
                <motion.li
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={3}
                  whileTap={{ scale: 0.85 }}
                  className="nav-item"
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active navOption" : "navOption"
                    }
                    aria-current="page"
                    to="/menu"
                    onClick={() => {
                      setNavToggle(false);
                    }}
                  >
                    Menu
                  </NavLink>
                </motion.li>
                <motion.li
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={4}
                  whileTap={{ scale: 0.85 }}
                  className="nav-item"
                >
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? "active navOption" : "navOption"
                    }
                    onClick={() => {
                      setNavToggle(false);
                    }}
                  >
                    <TiShoppingCart />
                    CART
                  </NavLink>
                </motion.li>
              </ul>
              {Object.keys(user).length !== 0 ? (
                <div
                  className="d-flex  "
                  // style={{
                  //   display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  //   // gap: "30px",
                  //   textDecoration: "none",
                  // }}
                >
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      isActive ? "active navOption" : "navOption"
                    }
                    onClick={() => {
                      setNavToggle(false);
                    }}
                  >
                    <FaUser />
                    {user.name.toUpperCase()}
                  </NavLink>
                </div>
              ) : (
                <div
                  className="d-flex "
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "30px",
                    textDecoration: "none",
                  }}
                >
                  <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={5}
                    whileTap={{ scale: 0.85 }}
                  >
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "active navOption" : "navOption"
                      }
                    >
                      Login
                    </NavLink>
                  </motion.div>

                  {/* <NavLink

                    to="/signup"
                      className={({ isActive }) =>
                      isActive ? "active navOption" : "navOption"
                    }
                  >
                    SignUp
                  </NavLink> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
