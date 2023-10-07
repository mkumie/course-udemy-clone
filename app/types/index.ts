import { Course, User } from "@prisma/client";
import { type } from "os";

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeCourse = Omit<Course, "createdAt"> & {
  createdAt: string;
};
