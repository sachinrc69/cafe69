const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/createUser");
const userLikedRoutes = require("./routes/liked");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const cors = require("cors");
const reviewRoutes = require("./routes/reviews");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/menu", menuRoutes);
app.use("/user", userRoutes);
app.use("/loggedinUser", userLikedRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

app.listen(5000);
mongoose
  .connect(
    "mongodb+srv://foodie:foodie69@cluster0.qg3g4yf.mongodb.net/foodie?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connectd to mongo ");
  })
  .catch((err) => {
    console.log(err);
  });
