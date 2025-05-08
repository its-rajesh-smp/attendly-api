import { prisma, PrismaTypes } from "@/config/prisma.conf";

const findOne = async (condition: PrismaTypes.EventRsvpWhereInput) => {
  return await prisma.eventRsvp.findFirst({ where: condition });
};

const createOne = async (data: PrismaTypes.EventRsvpUncheckedCreateInput) => {
  return await prisma.eventRsvp.create({ data });
};

const deleteOne = async (condition: PrismaTypes.EventRsvpWhereUniqueInput) =>
  await prisma.eventRsvp.delete({ where: condition });

const findOneAndDelete = async (condition: PrismaTypes.EventRsvpWhereInput) => {
  const eventParticipation = await findOne(condition);

  if (!eventParticipation) {
    return false;
  }

  if (eventParticipation) {
    await deleteOne({
      id: eventParticipation.id,
    });
  }

  return true;
};

export default {
  findOne,
  createOne,
  deleteOne,
  findOneAndDelete,
};
