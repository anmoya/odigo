import express, { Request, Response } from "express";
import { getAllUsers } from "../../services/user";
import {pagedRequestSchema} from '../../schema/pagedQuey.schema'
import { validate } from "../../validators/zodvalidator";

const router = express.Router()

router.get('/', validate(pagedRequestSchema), async (req: Request, res: Response) => {
    const { page, pageSize } = req.query

    const users = await getAllUsers(parseInt(page as string), parseInt(pageSize as string));

    return res.json({
        data: users,
        success: true,
        message: ""
    })
})

export default router;