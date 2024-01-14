import React, { useEffect, useState } from "react";
import AboutImg from "../assets/img/about_image.jpg";
import { useMainContext } from "../context/MainContext";

const About = () => {
  const { courses, fetchAllActiveCourses } = useMainContext();
  const [activeCoursesCount, setActiveCoursesCount] = useState(0);

  const publishedCourses = courses.filter(
    (course) => course.isCoursePublished === true
  );

  useEffect(() => {
    const fetchActiveCoursesCount = async () => {
      try {
        let totalActiveCourses = 0;

        for (const course of publishedCourses) {
          const activeCourses = await fetchAllActiveCourses(course.id);
          totalActiveCourses += activeCourses.length;
        }

        setActiveCoursesCount(totalActiveCourses);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchActiveCoursesCount();
  }, [fetchAllActiveCourses, publishedCourses]);

  return (
    <div className="flex flex-row-reverse flex-wrap justify-around items-center gap-5 pt-[70px] bg-[#FBFBFB] w-full h-[98%] p-2">
      <div className="flex justify-center items-center w-[280px] h-[280px] bg-[#e7e6e6] drop-shadow-2xl rounded-full">
        <img
          src={AboutImg}
          alt=""
          className="w-[270px] h-[270px] rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-start items-start gap-3 w-[500px]">
        <h1 className="text-2xl font-bold">
          Know about elearner <br /> Learning Platform
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
          praesentium veritatis dicta assumenda! Placeat cumque unde beatae
          nobis numquam laborum cupiditate impedit facere rem.
        </p>

        <div className="flex justify-center items-center gap-8 px-2">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center bg-[#E0F0FF] w-[100px] h-[70px] rounded-xl text-[#1454A9] font-bold">
              {activeCoursesCount}
            </div>
            <div>
              <p className="text-[#1454A9] font-semibold text-xs">
                Students Learning
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center bg-[#FEE0E0] w-[100px] h-[70px] rounded-xl text-[#742627] font-bold">
              {publishedCourses.length}
            </div>
            <div>
              <p className="text-[#742627] font-semibold text-xs">
                Active Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
