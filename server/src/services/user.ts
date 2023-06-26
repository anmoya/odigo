import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAllUsers = async (page: number, pageSize: number) => {
    return await prisma.user.findMany({
        skip: page,
        take: pageSize,
    })
}