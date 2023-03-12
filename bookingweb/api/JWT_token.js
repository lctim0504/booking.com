import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

const JWT_token = (req, res, next, callBackFunction) => {
    //console.log(req.cookies)
    const token = req.cookies.JWT_token;//在index.js 使用app.use(cookieParser()) 來抓取

    if (!token) return res.status(401).json({ error: "pls login first" })
    jwt.verify(token, process.env.JWT, (err, payload) => {//cookie解碼
        if (err) return res.status(403).json({ error: "invalid token" })
        req.userData = payload;//解碼後應該是我們一開始sign的user.id與user.isadmin
        callBackFunction()//調用回調函數，傳遞用戶數據給 isUser 和 isAdmin 函數
    })
}
export const isUser = (req, res, next) => {
    JWT_token(req, res, next, () => {
        const apiUserId = req.params.isAdmin
        if (req.userData.id == apiUserId || req.userData.isAdmin) next()
        else res.status(403).json({ error: "no rights" })
    })
}
export const isAdmin = (req, res, next) => {
    JWT_token(req, res, next, () => {
        if (req.userData.isAdmin) next() //next()表示繼續執行下個步驟 router.post("/", isAdmin, createHotel)<= 
        else res.status(403).json({ error: "you are not admin" })
    })
}

