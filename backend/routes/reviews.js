const express = require("express");
const router = express.Router();
const reviews = require("../models/review");
const generateError = require("../generateError");
const isAuth = require("../services/isAuth");

router.post("/addReview", isAuth, async (req, res, next) => {
  try {
    const review = await reviews.create({
      review: req.body.review,
      userId: req.userId,
    });
    if (!review) throw generateError("Error in adding review", 500);
    res.status(200).json({ review: req.body.review, userId: req.userId });
  } catch (error) {
    next(error);
  }
});
router.get("/getAllReviews", async (req, res, next) => {
  try {
    const review = await reviews.find().populate("userId");
    if (!review) generateError("Error in finding review's", 500);
    res.status(200).json({ result: true, review: review });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
