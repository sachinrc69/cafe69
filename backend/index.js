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
require("dotenv").config();

app.use("/menu", menuRoutes);
app.use("/user", userRoutes);
app.use("/loggedinUser", userLikedRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});
console.log(process.env.MongoURL);

app.listen(5000);
mongoose
  .connect(process.env.MongoURL)
  .then(() => {
    console.log("connectd to mongo ");
  })
  .catch((err) => {
    console.log(err);
  });
