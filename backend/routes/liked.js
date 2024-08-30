const express = require("express");
const router = express.Router();
const User = require("../models/user");
const foodDatas = require("../models/foodData");
const isAuth = require("../services/isAuth");

router.post("/like", isAuth, async (req, res, next) => {
  const userId = req.userId;
  console.log(userId);
  const userDetails = await User.findOne({ _id: userId });
  if (!userDetails) throw new Error({ message: "error in fetching user" });
  const favorites = userDetails.liked;
  const existingElementIndex = favorites.indexOf(req.body.foodId);
  if (existingElementIndex === -1) {
    favorites.push(req.body.foodId);
  } else {
    favorites.splice(existingElementIndex, 1);
  }

  const result = await User.findOneAndUpdate(
    { _id: userId },
    { liked: favorites },
    { new: true, useFindAndModify: false }
  );
  if (!result) throw new Error({ message: "error in updating" });
});

router.get("/likedData", isAuth, async (req, res, next) => {
  try {
    const userId = req.userId;
    const userData = await User.findOne({ _id: userId });
    res.status(200).json({ liked: userData.liked });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
router.post("/likedFoodData", async (req, res, next) => {
  const likedFood = req.body.likedData;
  try {
    const food_data = await foodDatas.find({ _id: { $in: likedFood } });
    res.status(200).json({ food_data: food_data });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

module.exports = router;
