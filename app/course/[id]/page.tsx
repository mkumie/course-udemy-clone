import getCourseById from "@/app/actions/getCourseById";
import myUser from "@/app/actions/getUser";
import React from "react";
import IndividualCourse from "../IndividualCourse";

interface IParams {
  id?: string;
}

const Course = async ({ params }: { params: IParams }) => {
  const course = await getCourseById(params);
  const currentUser = await myUser();

  return (
    <div>
      <IndividualCourse
        courseId={course?.id}
        currentUser={currentUser}
        price={course?.price}
        imageSrc={course?.imageSrc}
        name={course?.name}
        author={course?.author}
        description={course?.description}
      />
    </div>
  );
};

export default Course;
