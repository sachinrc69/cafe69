import React, { useState, useEffect, useContext } from "react";
import { cartActions } from "../store/cart";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import "../index.css";
import { FaHeart } from "react-icons/fa";
import userContext from "../store/userInfo";
import { url } from "../url";

export default function Card({ data, likedData }) {
  const { user } = useContext(userContext);

  const authToken = localStorage.getItem("authToken");

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likedData) {
      const tof = likedData.includes(data._id) ? true : false;
      setLiked(tof);
    }
  }, likedData);

  const dispatch = useDispatch();

  let options = data.options[0];
  let optionKeys = Object.keys(options);
  let optionValues = Object.values(options);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(optionKeys[0]);
  const [totalPirce, setTotalPrice] = useState(
    Number(quantity) * Number(optionValues[1])
  );

  useEffect(() => {
    const indexValue = optionKeys.indexOf(size);
    setTotalPrice(Number(quantity) * Number(optionValues[indexValue]));
  }, [quantity, size]);

  const likedHandler = () => {
    setLiked((prev) => !prev);
    fetch(`${url}/loggedinUser/like`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodId: data._id,
        email: user.email,
      }),
    });
  };

  function addToCartHandler() {
    dispatch(
      cartActions.add({
        id: data._id,
        name: data.name,
        img: data.img,
        quantity: quantity,
        size: size,
        price: totalPirce,
      })
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: { delay: 0.2, duration: 0.5 },
      }}
      viewport={{ once: true }}
      // whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
    >
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <div>
          <img
            loading="lazy"
            src={data.img}
            className="card-img-top"
            alt="..."
            style={{
              height: "200px",
              objectFit: "fill",
              position: "relative",
              boxShadow: "inset 0px 0px 20px 10px rgba(0,0,0,0.6)",
            }}
          ></img>
          {likedData && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "white",
              }}
            >
              <FaHeart
                className={liked ? "heart-liked" : ""}
                style={{
                  textShadow: "0px 0px 0px 5px black",
                  fontSize: "30px",
                  fill: liked ? "red" : "",
                  cursor: "pointer",
                }}
                onClick={likedHandler}
              />
            </div>
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          {/* <p className="card-text"> {data.description}</p> */}
          <div
            className="container w-100"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <select
              className="m2 h-100  bg-primary rounded"
              style={{ padding: "3px" }}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              {Array.from(Array(5), (e, i) => {
                return (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m2 h-100  bg-primary rounded"
              style={{ padding: "3px" }}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {optionKeys.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
            <div
              className="h-100 d-inline fs-5"
              style={{ fontWeight: "bolder" }}
            >
              Rs: {totalPirce}
            </div>
          </div>
          <hr></hr>
          <motion.button
            className="m1  w-100  bg-primary rounded"
            style={{ padding: "5px" }}
            onClick={addToCartHandler}
            whileTap={{ scale: 0.85 }}
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
