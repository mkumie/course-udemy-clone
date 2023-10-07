import myUser from "@/app/actions/getUser";
import second from "../../../lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  courseId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { courseId } = params;

  if (!courseId || typeof courseId !== "string") {
    throw new Error("Invalid ID");
  }

  let basketIds = [...(currentUser.basketIds || [])];

  basketIds.push(courseId);

  const user = await prisma?.user.update({
    where: { id: currentUser.id },
    data: {
      basketIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { courseId } = params;

  if (!courseId || typeof courseId !== "string") {
    throw new Error("Invalid ID");
  }

  let basketIds = [...(currentUser.basketIds || [])];

  basketIds = basketIds.filter((id) => id !== courseId);

  const user = await prisma?.user.update({
    where: { id: currentUser.id },
    data: {
      basketIds,
    },
  });

  return NextResponse.json(user);
}
