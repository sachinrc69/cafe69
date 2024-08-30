import React, { useState, useEffect } from "react";
import Card from "./Card";
import { motion } from "framer-motion";

export default function Category({
  category,
  menuData,
  searchText,
  likedData,
}) {
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, staggerChildren: 0.2 }}
    >
      <div style={{ paddingLeft: "40px" }}>
        <h4>{category.CategoryName}</h4>
        <hr></hr>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "30px",
        }}
      >
        {menuData.foodData
          .filter((data) => {
            return category.CategoryName === data.CategoryName;
          })
          .filter((x) => {
            return x.name.toLowerCase().includes(searchText);
          })
          .map((data) => {
            return (
              <div
                key={data._id}
                className="m-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Card
                  data={data}
                  searchText={searchText}
                  likedData={likedData}
                />
              </div>
            );
          })}
      </div>
    </motion.div>
  );
}
