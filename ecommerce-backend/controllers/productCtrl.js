import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message.js";
import Product from "../models/productModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";

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
    if (!products) throw new ErrorHandler(500, ERROR_MESSAGE.NO_RESOURCE_FOUND);

    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.PRODUCTS_FETCHED,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatePayload = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatePayload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      throw new ErrorHandler(400, ERROR_MESSAGE.UPDATION_FAILED);
    }
    res.json({
      status: "success",
      message: SUCCESS_MESSAGE.PRODUCT_UPDATED,
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
