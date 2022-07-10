import express from "express";
import {
  getAllUser,
  updateUser,
  getOneUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { IsAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(IsAdmin);

router.get("", getAllUser);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
