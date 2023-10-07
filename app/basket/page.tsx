import React from "react";
import getBasketItems from "../actions/getBasketItems";
import myUser from "../actions/getUser";
import CourseComponent from "../(components)/CourseComponent";

const Basket = async () => {
  const courses = await getBasketItems();
  const currentUser = await myUser();

  return (
    <div>
      <div className="p-12 flex gap-2 flex-wrap">
        {courses.map((item) => (
          <CourseComponent
            key={item.id}
            course={item}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Basket;
