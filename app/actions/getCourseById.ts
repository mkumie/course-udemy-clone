import prisma from "../lib/prismadb";

interface IParams {
  id?: string;
}

export default async function getCourseById(params: IParams) {
  try {
    const { id } = params;

    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!id) {
      return null;
    }

    return {
      ...course,
      createdAt: course?.createdAt.toString(),
      user: {
        ...course?.user,
        createdAt: course?.user.createdAt.toString(),
        updatedAt: course?.user.updatedAt.toString(),
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
