import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"

const app = express()
dotenv.config()
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log("disconnected to mongoDB")
    }
}

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!")
})
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!")
})

const port = 5000;
app.listen(port, () => {
    connect();
    console.log(`connected to ${port} backend`)
})

// app.get('/', (req, res) => {
//     res.send('測試1')
// })

import hotelsApiRoute from "./ApiRoutes/hotels.js"
import roomsApiRoute from "./ApiRoutes/rooms.js"
import usersApiRoute from "./ApiRoutes/users.js"
import authApiRoute from "./ApiRoutes/auth.js"

app.use("/api/v1/hotels",hotelsApiRoute)
app.use("/api/v1/rooms",roomsApiRoute)
app.use("/api/v1/users",usersApiRoute)
app.use("/api/v1/auth",authApiRoute)

//package.json
//新增 type module 才可以用import的方法
//新增 start 指令 才可以用npm start啟動
//npm i nodemon => ctrl+s儲存後後端即可自動重啟
//npm i dotenv => 存帳密
//npm i mongoose => 自動連上資料庫

// {
//     "name": "api",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "type":"module",  <<<<<==========
//     "scripts": {
//       "start" : "node index.js"  <<<<<==========
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//       "express": "^4.18.2"
//     }
//   }