import myUser from "@/app/actions/getUser";
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;
  console.log(id);

  if (!id || typeof id !== "string") {
    throw new Error(" Invalid Id");
  }

  const course = await prisma.course.deleteMany({
    where: {
      id: id,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(course);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const json = await request.json();

  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error(" Invalid Id");
  }

  const updated = await prisma.course.update({
    where: {
      id: id,
    },
    data: json,
  });

  return NextResponse.json(updated);
}
