const mongoose = require("mongoose");
const foodDataSchema = new mongoose.Schema({
  CategoryName: { type: String },
  name: { type: String },
  img: { type: String },
  option: { type: Array },
  description: { type: String },
});

module.exports = mongoose.model("foodDatas", foodDataSchema);
