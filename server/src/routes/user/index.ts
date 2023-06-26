import express, { Request, Response } from "express";
import { getAllUsers } from "../../services/user";

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const { page, pageSize } = req.query

    const users = await getAllUsers(parseInt(page as string), parseInt(pageSize as string));

    return res.json({
        data: users,
        success: true,
        message: ""
    })
})

export default router;