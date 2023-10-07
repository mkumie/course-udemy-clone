import myUser from "@/app/actions/getUser";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { useId } from "react";

interface IParams {
  userId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { userId } = params;

  const json = await request.json();

  const { name, email, password } = json;

  const currentUser = await myUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!useId || typeof userId !== "string") {
    throw new Error("Invalid Id");
  }

  const hashedPasswordUpdated = await bcrypt.hash(password, 12);

  const updated = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      hashedPassword: hashedPasswordUpdated,
    },
  });

  return NextResponse.json(updated);
}
