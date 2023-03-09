import express from "express"
const router = express.Router()

router.get("/:id",getUser)
router.get("/",getAllUsers)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)

export default router