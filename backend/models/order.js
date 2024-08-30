const mongoose = require("mongoose");
const Order = mongoose.Schema({
  userId: { type: String, required: true },
  foodList: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodDatas",
      },
      quantity: Number,
      price: Number,
      size: String,
    },
  ],

  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Orders", Order);
