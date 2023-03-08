import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()
//connect to mongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}
//keep listening
mongoose.connection.on("connected", () => {
    console.log("MongoDB connecting!")
})
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!")
})

const port = 5000;
app.listen(port, () => {
    connect();
    console.log(`connected to ${port} backend`)
})

//Routes
import hotelsApiRoute from "./apiRoutes/Hotel.js"
import roomsApiRoute from "./apiRoutes/Room.js"
import usersApiRoute from "./apiRoutes/User.js"
import authApiRoute from "./apiRoutes/Auth.js"

app.use(express.json())

app.use("/api/v1/hotels", hotelsApiRoute)
app.use("/api/v1/rooms", roomsApiRoute)
app.use("/api/v1/users", usersApiRoute)
app.use("/api/v1/auth", authApiRoute)



//在package.json
//新增 type module 才可以用import的方法來取代require
//新增 start 指令 才可以用npm start啟動
//npm i nodemon => ctrl+s儲存後後端即可自動重啟
//npm i dotenv => 存帳密
//npm i mongoose => 自動連上資料庫

// {
//     "name": "api",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "type":"module",             <---
//     "scripts": {
//       "start" : "node index.js"  <---
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//       "express": "^4.18.2"
//     }
//   }

//  關於mongoDB密碼，有符號: / ? # [ ] @記得轉換
//  if your password in plain-text is
//  p@ssw0rd'9'!            , you need to encode your password as:
//  p%40ssw0rd%279%27%21