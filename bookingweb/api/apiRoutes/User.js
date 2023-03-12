import express from "express"
import { isAdmin, isUser } from "../JWT_token.js"
import { deletedUser, getAllUsers, getUser, updateUser } from "../routeController/User.js"

const router = express.Router()

router.get("/:id", isUser, getUser)
router.get("/", isAdmin, getAllUsers)
router.put("/:id", isUser, updateUser)
router.delete("/:id", isUser, deletedUser)

export default router