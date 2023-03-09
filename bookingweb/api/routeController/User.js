import UserModel from "../model/UserModel.js";

//更新使用者 跟hotel的CRUD一模一樣
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error updating user:" + error);
        res.status(500).json({ error: "Error updating user" })
    }
}
//刪除使用者
export const deletedUser = async (req, res) => {
    const id = req.params.id;
    try {
        await UserModel.findByIdAndDelete(id)
        res.status(200).json("用戶成功刪除")
    } catch (error) {
        console.log("Error deleting user:" + error);
        res.status(500).json({ error: "Error deleting user" })
    }
}
//讀取使用者資料
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const getUser = await UserModel.findById(id)
        res.status(200).json(getUser)
    } catch (error) {
        console.log("Error getting user:" + error);
        res.status(500).json({ error: "Error getting user" })
    }
}
//讀取全部使用者資料
export const getAllUsers = async (req, res) => {
    try {
        const getUsers = await UserModel.find()
        res.status(200).json(getUsers)
    } catch (error) {
        console.log("Error getting all users:" + error);
        res.status(500).json({ error: "Error getting all users" })
    }
}