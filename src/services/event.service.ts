import { PrismaTypes, prisma } from "@/config/prisma.conf";

const fineOne = async (condition: PrismaTypes.EventWhereInput) => {
  return await prisma.event.findFirst({ where: condition });
};

const findAll = async (options: PrismaTypes.EventFindManyArgs = {}) => {
  return await prisma.event.findMany({ ...options });
};

const createOne = async (data: PrismaTypes.EventUncheckedCreateInput) => {
  return await prisma.event.create({ data });
};

export default { findAll, fineOne, createOne };
