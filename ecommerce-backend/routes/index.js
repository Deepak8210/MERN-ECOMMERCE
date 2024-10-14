import express from "express";
import { signUp, signIn, logout } from "../controllers/authCtrl.js";
import {
  fetchUsers,
  updateUser,
  userProfile,
} from "../controllers/userCtrl.js";
import { isAuthenticatedUser } from "../middlewares/isAuthenticated.js";
import {
  createProduct,
  fetchProducts,
  updateProduct,
} from "../controllers/productCtrl.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logout);

router.get("/profile", isAuthenticatedUser, userProfile);

router.get("/users", isAuthenticatedUser, fetchUsers);
router.put("/users/:userId", isAuthenticatedUser, updateUser);

router.post("/products", isAuthenticatedUser, createProduct);
router.get("/products", isAuthenticatedUser, fetchProducts);
router.put("/products/:productId", isAuthenticatedUser, updateProduct);

export default router;
