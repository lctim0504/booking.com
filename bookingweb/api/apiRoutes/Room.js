import express from "express"
import { isAdmin } from "../JWT_token.js";
import { createRoom, deleteRoom, getAllRooms, getHotelRooms, getRoom, updatedRoom } from "../routeController/Room.js";

const router = express.Router()

router.post("/:hotelid", isAdmin, createRoom);
router.put("/:id", isAdmin, updatedRoom)
router.delete("/:hotelid/:id", isAdmin, deleteRoom)

router.get("/:id", getRoom)
router.get("/", getAllRooms)
router.get("/findHotel/:hotelid", getHotelRooms)//hotel的rooms

export default router