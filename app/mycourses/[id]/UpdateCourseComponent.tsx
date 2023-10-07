"use client";

import Button from "@/app/(components)/Buttons/Button";
import ImageUpload from "@/app/(components)/Inputs/ImageUpload";
import { Input } from "@/app/(components)/Inputs/Input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface CourseProps {
  name?: string;
  imageSrc?: string;
  author?: string;
  price?: string | number;
  courseId?: string;
  description?: string | null;
}

const initialValue: CourseProps = {
  name: "",
  imageSrc: "",
  author: "",
  description: "",
  price: 0,
};

const UpdateCourseComponent = ({
  name,
  imageSrc,
  author,
  price,
  courseId,
  description,
}: CourseProps) => {
  const [state, setState] = useState(initialValue);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const setCustomValue = (id: any, value: any) => {
    setState((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const onUpdate = (e: FormEvent) => {
    e.preventDefault();

    axios
      .put(`/api/course/${courseId}`, state)
      .then(() => {
        router.refresh();
      })
      .catch((error: any) => {
        throw new Error(error);
      })
      .finally(() => {
        router.push("/");
      });
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center py-4">
        <div className="p-4">
          <Image
            src={`${imageSrc}`}
            alt="Image"
            className="max-w-[900px] bg-gray-50 p-4 border-4 border-black"
            width={300}
            height={400}
          />
        </div>
      </div>

      <form onSubmit={onUpdate} className="w-[600px] h-[700px] mx-auto p-12">
        <div>
          <ImageUpload
            value={`${state.imageSrc}`}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>

        <div className="flex flex-col gap-2 py-4">
          <Input
            big
            placeholder="Course name"
            id="name"
            type="text"
            value={state.name}
            name="name"
            onChange={handleChange}
          />
          <Input
            big
            placeholder="Authors"
            id="author"
            type="text"
            value={state.author}
            name="author"
            onChange={handleChange}
          />
          <Input
            big
            placeholder="Description"
            id="description"
            type="text"
            value={`${state.description}`}
            name="description"
            onChange={handleChange}
          />
          <Input
            big
            placeholder="Price"
            id="price"
            type="text"
            value={state.price}
            name="price"
            onChange={handleChange}
          />
        </div>
        <Button
          title="Submit"
          btnType="submit"
          containerStyles="relative rounded-lg hover:opacity-80 transition disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
};

export default UpdateCourseComponent;
