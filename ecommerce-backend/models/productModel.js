import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
      required: [true, "Please enter brand name"],
    },
    productImages: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: [true, "please provide price"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "please provide selling price"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
