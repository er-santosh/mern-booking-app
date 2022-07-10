import express from "express";
import {
  getAllRoom,
  updateRoom,
  getOneRoom,
} from "../controllers/room.controller.js";
import { IsAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("", getAllRoom);
router.get("/:id", getOneRoom);

router.use(IsAdmin);

router.put("/:id", updateRoom);

export default router;
