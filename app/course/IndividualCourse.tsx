"use client";

import Image from "next/image";
import { SafeUser } from "../types";
import Button from "../(components)/Buttons/Button";
import useBasket from "../hooks/useBasket";

interface CourseProps {
  courseId: any;
  currentUser: SafeUser | null;
  price?: string;
  imageSrc?: string;
  name?: string;
  author?: string;
  description?: string | null;
}

const IndividualCourse = ({
  courseId,
  currentUser,
  price,
  imageSrc,
  name,
  author,
  description,
}: CourseProps) => {
  const { hasBasket, toggleBasket } = useBasket({ currentUser, courseId });
  return (
    <div>
      <div className="h-[90vh] bg-zinc-900 flex justify-between text-white px-14 items-center">
        <div>
          <h1 className="text-[4rem]">{name}</h1>
          <p>{author}</p>
          <p>{description}</p>
          <p>{price}</p>
        </div>

        <div className="w-[400px] bg-white p-1 text-black">
          <img
            src={`${imageSrc}`}
            width={200}
            height={200}
            className="w-full object-cover"
            alt="Course Image"
          />
          <div>
            <p>$ {price}</p>

            <div className="flex flex-col gap-1 mt-4">
              <Button
                handleClick={toggleBasket}
                title={`${
                  hasBasket ? "Remove from basket" : "Add to the basket"
                }`}
              />
              <Button title="Buy now" outline />
              <p className="text-[12px] text-gray-700 text-center border-t-2 py-2">
                30 day money back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualCourse;
