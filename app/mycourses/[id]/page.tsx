import React from "react";
import UpdateCourseComponent from "./UpdateCourseComponent";
import getCourseById from "@/app/actions/getCourseById";

interface IParams {
  id: string;
}

const MyCourse = async ({ params }: { params: IParams }) => {
  const courses = await getCourseById(params);
  return (
    <div>
      <UpdateCourseComponent
        name={courses?.name}
        imageSrc={courses?.imageSrc}
        author={courses?.author}
        price={courses?.price}
        courseId={courses?.id}
        description={courses?.description}
      />
    </div>
  );
};

export default MyCourse;
