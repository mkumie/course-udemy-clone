import React from "react";
import myUser from "../actions/getUser";
import getCurrUsersCourse from "../actions/getCurrUsersCourse";
import MyCourseClient from "./MyCourseClient";

interface IParams {
  courseId: string;
}

const MyCourses = async ({ params }: { params: IParams }) => {
  const currentUser = await myUser();

  if (!currentUser) {
    return "Not Authorised for this page";
  }

  const courses = await getCurrUsersCourse();

  if (courses.length === 0) {
    return "No courses found to delete or update";
  }

  return (
    <div className="flex gap-6 px-12 py-8">
      {courses.map((item) => (
        <MyCourseClient data={item} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default MyCourses;
