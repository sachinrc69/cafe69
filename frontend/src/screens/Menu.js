import React, { useEffect, useState, useRef } from "react";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import Loading from "../components/Loading";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { url } from "../url";

export default function Menu() {
  const menuRef = useRef(null);

  const scrollToPosition = () => {
    menuRef.current.scrollIntoView();
  };

  const [menuData, setMenuData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedData, setLikedData] = useState();
  const authToken = localStorage.getItem("authToken");
  const fetchLikedData = async () => {
    if (authToken) {
      const response = await fetch(`${url}/loggedinUser/likedData`, {
        headers: { Authorization: "Bearer " + authToken },
      });
      if (!response.ok) {
        console.log("Error in Liked fetching data");
      } else {
        const resData = await response.json();
        setLikedData(resData.liked);
      }
    }
  };

  useEffect(() => {
    fetchLikedData();
  }, []);

  const fetchMenuData = async () => {
    setLoading((prev) => !prev);
    const response = await fetch(`${url}/menu`);
    const menuData = await response.json();
    setMenuData(menuData);
    setLoading((prev) => !prev);
  };
  useEffect(() => {
    fetchMenuData();
  }, []);

  if (Object.keys(menuData).length === 0) {
    return <Loading classs={"menu"} />;
  }

  return (
    <div style={{ overflowY: "auto" }}>
      <div>
        <Carousel setSearchText={setSearchText} />
      </div>
      <div
        style={{
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={scrollToPosition}
          style={{
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "15px",
            display: "flex",
            gap: "10px",
            background: "rgb(148, 148, 245)",
            border: "none",
          }}
        >
          Explore menu <FaRegArrowAltCircleDown color="white" fontSize="25px" />
        </motion.button>
        <div ref={menuRef}></div>
      </div>
      {menuData.foodCategory.map((category) => {
        return (
          <Category
            key={category}
            category={category}
            menuData={menuData}
            searchText={searchText}
            likedData={likedData}
          />
        );
      })}
    </div>
  );
}
