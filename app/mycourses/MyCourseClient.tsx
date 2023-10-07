"use client";

import React, { FormEvent } from "react";
import { SafeCourse, SafeUser } from "../types";
import Image from "next/image";
import Button from "../(components)/Buttons/Button";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CourseCardProps {
  data: SafeCourse;
  currentUser: SafeUser | null;
}

const MyCourseClient = ({ data, currentUser }: CourseCardProps) => {
  const router = useRouter();

  const onDelete = (e: FormEvent) => {
    e.preventDefault();

    axios
      .delete(`/api/course/${data.id}`)
      .then(() => {
        router.refresh();
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };
  return (
    <div className="w-[400px] h-[300px]">
      <div>
        <Image
          src={data.imageSrc}
          alt="Image"
          width={400}
          height={200}
          className="object-cover group-hover:scale-110 transition h-[200px] w-[400px]"
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <div className="font-light flex ima-controls-div gap-8">
          <span>{data.name}</span>
        </div>

        <div className="w-full gap-2 flex">
          <Button btnType="submit" title="Delete" handleClick={onDelete} />
          <Button
            title="View"
            handleClick={() => router.push(`mycourses/${data.id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCourseClient;
