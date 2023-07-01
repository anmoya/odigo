import { PrismaClient } from '@prisma/client';

type ModelName = keyof PrismaClient;

export class GenericRepository<T> {
  private prisma: PrismaClient;
  private modelName: ModelName;

  constructor(prisma: PrismaClient, modelName: ModelName) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  async findAll(): Promise<T[]> {
    return this.prisma[this.modelName].findMany();
  }

  async findById(id: number): Promise<T | null> {
    return this.prisma[this.modelName].findUnique({
      where: { id },
    });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.prisma[this.modelName].create({ data });
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    return this.prisma[this.modelName].update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<T | null> {
    return this.prisma[this.modelName].delete({
      where: { id },
    });
  }
}
