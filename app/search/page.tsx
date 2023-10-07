import React from "react";
import getAllCourses from "../actions/getAllCourses";
import myUser from "../actions/getUser";
import CourseComponent from "../(components)/CourseComponent";

interface SearchProps {
  searchParams: string;
}

const Search = async ({ searchParams }: SearchProps) => {
  const courses = await getAllCourses(searchParams);
  const currentUser = await myUser();

  return (
    <div>
      <div className="p-12 flex gap-2 flex-wrap">
        {courses.map((item: any) => (
          <CourseComponent key={item.id} course={item} />
        ))}
      </div>
    </div>
  );
};

export default Search;
