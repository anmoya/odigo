import express, { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../../services/user";
import {
  deleteUserSchema,
  getUserSchema,
  pagedRequestSchema,
  updateUserSchema,
} from "./schemas";
import { validate } from "../../validators/zodvalidator";
import { ApiResponse } from "../../typings/response";
import { User } from "@prisma/client";
import { createUserBodySchema } from "./schemas";

const router = express.Router();

// export interface TypedResponse<ResBody> extends Express.Response {
//     json: Send<ApiResponse<ResBody>, this>;
//  }

export interface PagedResult<T> {
  totalItems: number;
  items: T[];
}

type UserPagedResponse = Response<ApiResponse<PagedResult<User>>>;
type UserResponse = Response<ApiResponse<User>>;
type CreateUserResponse = Response<ApiResponse<User>>;

router.get(
  "/",
  validate(pagedRequestSchema),
  async (req: Request, res: UserPagedResponse) => {
    const { page, pageSize } = req.query;

    const users: PagedResult<User> = await getAllUsers(
      parseInt(page as string),
      parseInt(pageSize as string)
    );

    return res.json({
      data: users,
      success: true,
      message: "",
    });
  }
);

router.get(
  "/:id",
  validate(getUserSchema),
  async (req: Request, res: UserResponse) => {
    const { id } = req.params;

    const user = await getUser(parseInt(id));

    if (user === null) return res.status(404).send();

    return res.json({
      data: user,
      message: "",
      success: true,
    });
  }
);

router.post(
  "/",
  validate(createUserBodySchema),
  async (req: Request, res: CreateUserResponse) => {
    const { body } = req;

    try {
      const user = await createUser(body.name, body.email);

      return res.json({
        data: user,
        success: true,
        message: "Usuario creado correctamente",
      });
    } catch (error) {
      return res.json({ error: error as string, success: false });
    }
  }
);

router.put(
  "/:id",
  validate(updateUserSchema),
  async (req: Request, res: CreateUserResponse) => {
    const { body, params } = req;

    try {
      const existingUser = await getUser(parseInt(params.id));

      if (existingUser === undefined) {
        return res
          .status(404)
          .json({
            success: false,
            message: `User ${params.id} doesn't exists`,
          });
      }

      const user = await updateUser(parseInt(params.id), body.name, body.email);

      return res.json({
        data: user,
        success: true,
        message: "User updated",
      });
    } catch (error) {
      return res.json({ error: error as string, success: false });
    }
  }
);

router.delete(
  "/:id",
  validate(deleteUserSchema),
  async (req: Request, res: Response<ApiResponse<User>>) => {
    try {
      const {
        params: { id },
      } = req;
      const removedUser = await deleteUser(parseInt(id));

      return res.status(204).json({
        success: true,
        message: `User ${removedUser.email} was deleted`,
      });
    } catch (error) {
      return res.json({ error: error as string, success: false });
    }
  }
);

export default router;
