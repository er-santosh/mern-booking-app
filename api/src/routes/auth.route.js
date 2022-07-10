import express from "express";
import {
  login,
  register,
  profile,
  logout,
} from "../controllers/auth.controller.js";
import { IsAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);

router.use(IsAuthenticated);

router.get("/profile", profile);
router.post("/signout", logout);

export default router;
