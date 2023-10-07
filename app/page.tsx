import Image from "next/image";
import SliderMain from "./(components)/SliderMain";
import getAllCourses from "./actions/getAllCourses";
import CourseComponent from "./(components)/CourseComponent";

const images = ["/a.jpg", "/b.jpg"];

// interface CourseProps {
//   id?: string;
// name?: string;
// createdAt?: string;
// imageSrc?: string;
// author?: string;
// price?: string;
// description?: string;
// user?: string;
// userId?: string;
// }

interface HomeProps {
  searchParams: string;
}

export default async function Home({ searchParams }: HomeProps) {
  const courses = await getAllCourses(searchParams);
  return (
    <main className="w-[100%]">
      <SliderMain images={images} />

      <div>
        <div className="flex flex-wrap px-8">
          {courses.map((item: any) => (
            <CourseComponent key={item.id} course={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
