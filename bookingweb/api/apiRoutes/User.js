import express from "express"
import { deletedUser, getAllUsers, getUser, updateUser } from "../routeController/User.js"

const router = express.Router()

router.get("/:id", getUser)
router.get("/", getAllUsers)
router.put("/:id", updateUser)
router.delete("/:id", deletedUser)

export default router