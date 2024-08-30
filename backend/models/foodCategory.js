const mongoose = require("mongoose");

const food_category = new mongoose.Schema({
  CategoryName: { type: String, required: true },
});

module.exports = mongoose.model("food_category", food_category);
