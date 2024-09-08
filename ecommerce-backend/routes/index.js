import express from "express";
import { signUp, signIn, logout } from "../controllers/authCtrl.js";
import { userProfile } from "../controllers/userCtrl.js";
import { isAuthenticatedUser } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logout);

router.get("/profile", isAuthenticatedUser, userProfile);

export default router;
