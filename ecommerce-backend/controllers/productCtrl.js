import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message.js";
import Product from "../models/productModel.js";

export const createProduct = async (req, res, next) => {
  try {
    const productPayload = req.body;
    const product = new Product(productPayload);
    const newProduct = await product.save();

    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.PRODUCT_CREATED,
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.PRODUCTS_FETCHED,
      products,
    });
  } catch (error) {
    next(error);
  }
};
