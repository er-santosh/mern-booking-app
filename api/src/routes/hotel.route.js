import express from "express";
import {
  getAllHotel,
  createHotel,
  updateHotel,
  getOneHotel,
  deleteHotel,
  addRoom,
  removeRoom,
  countByCity,
  countByType,
} from "../controllers/hotel.controller.js";
import { IsAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("", getAllHotel);
router.get("/:id", getOneHotel);
router.get("/count/by-city", countByCity);
router.get("/count/by-type", countByType);

router.use(IsAdmin);

router.post("", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

/* rooms */

router.post("/:hotelId/add-room", addRoom);
router.delete("/:hotelId/remove-room/:roomId", removeRoom);

export default router;
