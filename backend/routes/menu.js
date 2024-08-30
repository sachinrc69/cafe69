const express = require("express");
const router = express.Router();
const food_category = require("../models/foodCategory");
const food_data = require("../models/foodData");

router.get("/", async (req, res, next) => {
  try {
    const foodCategory = await food_category.find();
    const foodData = await food_data.find();
    res.json({ foodCategory: foodCategory, foodData: foodData });
  } catch (error) {
    new Error({ error: error, message: "error in fetching food categories" });
  }
});

module.exports = router;
