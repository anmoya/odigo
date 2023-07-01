import { PrismaClient, User } from "@prisma/client";
import { PagedResult } from "../routes/user";

const prisma = new PrismaClient();

export const getAllUsers = async (
  page: number,
  pageSize: number
): Promise<PagedResult<User>> => {
  const elements = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      skip: page,
      take: pageSize,
    }),
  ]);

  return { totalItems: elements[0], items: elements[1] };
};

export const getUser = async (userId: number) => {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  return user;
};

export const createUser = async (name: string, email: string) => {
  const createdUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return createdUser;
};

export const updateUser = async (id: number, name: string, email: string) => {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      name,
    },
  });

  return updatedUser;
};

export const deleteUser = async (id: number) => {
    const removedUser = await prisma.user.delete({
        where: {
            id
        }
    })

    return removedUser
}
