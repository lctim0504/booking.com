import express from "express"
import { createRoom, deleteRoom, getAllRooms, getHotelRooms, getRoom, updatedRoom } from "../routeController/Room.js";

const router = express.Router()

router.post("/:hotelid",createRoom);
router.put("/:id",updatedRoom)
router.delete("/:hotelid/:id",deleteRoom)

router.get("/:id",getRoom)
router.get("/",getAllRooms)
router.get("/findHotel/:hotelid",getHotelRooms)//hotel的rooms

export default router