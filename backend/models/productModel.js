const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter the name of the product"],
    trim: true, // remove white spaces from both end i.e "  hello " = "hello"
  },
  description: {
    type: String,
    required: [true, "please enter the description of the product"],
  },
  price: {
    type: Number,
    required: [true, "please enter the price of the product"],
    maxLength: [8, "sorry price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  //TODO category , stock(defaulut 0),numofreviews,reviews(name,rating,comment),createdAT
  category: {
    type: String,
    required: [true, "please enter the category of the product"],
  },
  stock: {
    type: Number,
    maxLength: [4, "stock cannot exceed 4 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", productSchema);
