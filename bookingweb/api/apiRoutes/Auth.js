import express from "express"
import { register } from "../routeController/User.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)

export default router