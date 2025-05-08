import { prisma, PrismaTypes } from "@/config/prisma.conf";

const findOne = async (condition: PrismaTypes.UserWhereUniqueInput) => {
  return await prisma.user.findFirst({ where: condition });
};

const createOne = async (user: PrismaTypes.UserCreateInput) => {
  return await prisma.user.create({ data: user });
};

export default { createOne, findOne };
