import HotelModel from "../model/HotelModel.js" //js記得打

export const getHotel = async (req, res) => {
    const id = req.params.id;
    try {
        const getHotel = await HotelModel.findById(id)
        res.status(200).json(getHotel)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const createHotel = async (req, res) => {
    const newHotel = new HotelModel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const updatedHotel = async (req, res) => {
    const id = req.params.id;
    const body = req.body
    try {
        const updatedHotel = await HotelModel.findByIdAndUpdate(id, { $set: body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const deleteHotel = async (req, res) => {
    const id = req.params.id;
    try {
        await HotelModel.findByIdAndDelete(id)
        res.status(200).json("刪除資料成功")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
