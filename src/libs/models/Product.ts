// import { Schema, model, models } from "mongoose";

// const productSchema = new Schema({
//   imgSrc: {
//     type: String,
//     require: true,
//   },
//   fileKey: {
//     type: String,
//     require: true,
//   },
//   name: {
//     type: String,
//     require: true,
//   },
//   category: {
//     type: String,
//     require: true,
//   },
//   price: {
//     type: String,
//     require: true,
//   },
// });

// const Product = models.Product || model("Product", productSchema);

// export default Product;

import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    imgSrc: {
      type: String,
      required: true,
    },
    fileKey: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number, // Changed from String to Number
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Product = models.Product || model("Product", productSchema);

export default Product;
