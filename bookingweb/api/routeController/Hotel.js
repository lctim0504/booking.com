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
export const getAllHotel = async (req, res) => {
    const id = req.params.id;
    try {
        const getAllHotel = await HotelModel.find()
        res.status(200).json(getAllHotel)
    } catch (error) {
        console.log("getAllHotel error:" + error)
        res.status(500).json(error)
    }
}
//getAllHotels升級版，讓他能抓取全部資料也能依照query值去找想要的資料
export const getAllHotels = async (req, res, next) => {
    const withQuery = req.query; 
    try {
        const hotelsList = await Hotel.find(
            {
                ...withQuery //...只找有相關欄位且符合的
            }
        ).limit(7) //讓他回傳資料最多就七個
        res.status(200).json(hotelsList)
    } catch (error) {
        console.log("getAllHotels error:" + error)
        res.status(500).json(error)
    }
}
export const getHotelCount = async (req, res, next) => {
    const type = req.query.type?.split(",") || []
    const city = req.query.city?.split(",") || []
    try {
        let list = [];
        if (type.length > 0) {
            list = await Promise.all(type.map(type => {
                return HotelModel.countDocuments({ type })
            }))
        } else if (city.length > 0) {
            list = await Promise.all(city.map(city => {
                return HotelModel.countDocuments({ city })
            }))
        }
        res.status(200).json(list)
    } catch (error) {
        console.log("getHotelCount error:" + error)
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
