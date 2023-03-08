import HotelModel from "../model/HotelModel.js";
import RoomModel from "../model/RoomModel.js";

export const createRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
    const newRoom = new RoomModel(req.body)
    const hotelIdExisted = await HotelModel.findById(hotelId)
    if (hotelIdExisted != null) {
        try {
            const saveRoom = await newRoom.save()
            const updatedRoom = await HotelModel.findByIdAndUpdate(hotelId, { $push: { rooms: saveRoom._id } }, { new: true })
            res.status(200).json(updatedRoom)
        } catch (error) {
            console.log("Error inserting new room" + error);
            res.status(500).json({ error: "Error inserting new room" })
        }
    }
}

export const getRoom = async (req, res) => {
    try {
        const getRoom = await RoomModel.findById(req.params.id)
        res.status(200).json(getRoom)
    } catch (error) {
        console.log("Error getting new room:" + error);
        res.status(500).json({ error: "Error getting new room" })
    }
}

export const getAllRooms = async (req, res) => {
    try {
        const getRooms = await RoomModel.find()
        res.status(200).json(getRooms)
    } catch (error) {
        console.log("Error getting all room:" + error);
        res.status(500).json({ error: "Error getting all room" })
    }
}

export const getHotelRooms = async (req, res) => {
    const hotelId = req.params.hotelid;
    const hotel = await HotelModel.findById(hotelId)
    if (hotel != null) {
        try {
            const roomsList = await Promise.all(hotel.rooms.map(roomId => {
                return RoomModel.findById(roomId)
            }))
            res.status(200).json(roomsList)
        } catch (error) {
            console.log("Error getting all room" + error);
            res.status(500).json({ error: "Error!" })
        }
    } else {
        res.status(500).json({ error: "hotel:Id not found" })
    }
}

export const updatedRoom = async (req, res) => {
    const roomId = req.params.id;
    try {
        const updatedRoom = await RoomModel.findByIdAndUpdate(roomId, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
    } catch (error) {
        console.log("Error updating room:" + error);
        res.status(500).json({ error: "Error updating room" })
    }
}

export const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
    const hotel = await HotelModel.findById(hotelId)
    const room = await RoomModel.findById(hotelId)
    console.log(hotel);

    if (hotel == null) res.status(500).json("hotel not found")
    else if (room == null) res.status(500).json("room not found")
    else {
        try {
            await RoomModel.findByIdAndDelete(req.params.id)
        } catch (error) {
            console.log("Error deleting room:" + error.Message);
            res.status(500).json({ error: "Error deleting room" })
        }
        res.status(200).json("成功刪除房間資訊")
    }
}