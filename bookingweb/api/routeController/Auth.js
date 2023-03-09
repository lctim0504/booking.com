import bcrypt from "bcryptjs"
import UserModel from "../model/UserModel.js";

export const register = async (req, res) => {
    const registerData = req.body
    const registerExisted = await UserModel.findOne({ username: registerData.username }) || await UserModel.findOne({ email: registerData.email })
    if (registerExisted) {
        return res.status(500).json({ error: "registerData Existed" })
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(registerData.password, salt);
        const newUser = new UserModel({
            username: registerData.username,
            email: registerData.email,
            password: hash,
        }
        )
        const saveUser = await newUser.save();
        //但這邊要分離處理來保護我們的使用者資料 
        res.status(200).json(saveUser)
    } catch (error) {
        console.log("Error registering user:" + error);
        res.status(500).json({ error: "Error registering user" })
    }
}

export const login = async (req, res) => {
    const loginData = req.body
    try {
        const userData = await UserModel.findOne({ username: loginData.username }) || await UserModel.findOne({ email: loginData.username });
        if (!userData) {
            return res.status(500).json({ error: "loginData Existed" })
        }
        const isPasswordCorrect = await bcrypt.compare(loginData.password, userData.password)
        if (!isPasswordCorrect) {
            return res.status(404).json({ error: "password Incorrect" })
        }
        res.status(200).json(`${userData.username}登入成功`)
    } catch (error) {
        console.log("Login fail:" + error);
        res.status(500).json({ error: "Login fail. Something went wrong!" })
    }
}