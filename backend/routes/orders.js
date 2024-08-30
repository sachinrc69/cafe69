const express = require("express");
const Order = require("../models/order");
const foodData = require("../models/foodData");
const isAuth = require("../services/isAuth");
const router = express.Router();
const generateError = require("../generateError");
const { response } = require("express");
const stripe = require("stripe")(
  "sk_test_51Pdc6fRxo6YU27EOQvWo94B7qPHD6cEyPUxZcfpEfM0IUKTfws94RpJXDA9fue5V8CMrysmnL4h5ufH65rilDGuY00ZkgB43FW"
);

// router.post("/newOrder", isAuth, async (req, res, next) => {
//   try {
//     const response = await Order.create({
//       userId: req.userId,
//       foodList: req.body.foodList,
//       paymentMethod: req.body.paymentMethod,
//       totalAmount: req.body.totalAmount,
//     });

//     if (!response) {
//       throw generateError("Order placing failed", 404);
//     }

//     res
//       .status(200)
//       .json({ message: "succesfully placed order", response: response });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/allOrders", isAuth, async (req, res, next) => {
  const userId = req.userId;

  try {
    const orders = await Order.find({ userId: userId }).populate("foodList");
    if (!orders) {
      res.send([]);
    } else res.status(200).json({ orders: orders });
  } catch (error) {
    next(error);
  }
});
router.get("/foodNames", async (req, res, next) => {
  try {
    const foodNames = await foodData.find().select("name");
    if (!foodNames) {
      res.json({ success: "false" });
    } else res.status(200).json({ foodNames: foodNames });
  } catch (error) {
    next(error);
  }
});

router.post("/payment", isAuth, async (req, res, next) => {
  try {
    const items = req.body.cartItems;
    lineItems = items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name + " (" + item.size + ")",
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "https://localhost:3000/cancel",
    });

    const response = await Order.create({
      userId: req.userId,
      foodList: req.body.foodList,
      totalAmount: req.body.totalPrice,
    });

    if (!response) {
      throw generateError("Order placing failed", 404);
    }
    // res.json({});

    res.json({
      id: session.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
