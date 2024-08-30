const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  liked: { type: Array },
  // liked: { type: Array, ref: "foodDatas" },
});

module.exports = mongoose.model("users", userSchema);
