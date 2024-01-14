import React from "react";
import HTMLLOGO from "../assets/img/html-5.png";
import { useMainContext } from "../context/MainContext";

const Top_Courses = () => {
  const { courses } = useMainContext();

  const specificCourses = courses.filter((course) => {
    return ["HTML - 5", "CSS", "JavaScript"].includes(course.courseName);
  });

  const handleSeeAllCourses = () => {
    window.location.pathname = '/courses'
  }

  return (
    <div className="flex flex-col justify-center items-center gap-7 pt-[20px]">
      <div>
        <h1 className="text-2xl font-bold">
          Choose Favourite Courses From Top Categories
        </h1>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-7">
        {specificCourses.map((specificCourse) => (
          <div className="flex justify-center items-center gap-7" key={specificCourse.id}>
            {specificCourse.isCoursePublished === true ? (
              <a href={`/course/${specificCourse.courseName}`} className="flex flex-col justify-center items-center gap-3 bg-[#F7F7F7] w-[250px] h-[300px] rounded-xl p-3 cursor-pointer hover:bg-[#F2E6FE] hover:shadow-xl hover:drop-shadow-xl transform transition-shadow active:scale-95">
                <div
                  className={`flex flex-col justify-center items-center bg-[#${specificCourse.courseBgColor}] rounded-full w-[90px] h-[90px] p-2`}
                >
                  <p className="font-bold">{specificCourse.courseName}</p>
                  <img
                    src={specificCourse.courseLogoURL}
                    alt=""
                    className="w-[40px] h-[40px]"
                  />
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                  <h2 className="font-bold">{specificCourse.courseName}</h2>
                  <p className="text-xs px-1">
                    {specificCourse.courseDescription}
                  </p>
                </div>
              </a>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleSeeAllCourses} className="bg-[#4B1C82] text-white rounded-full py-2 px-5 cursor-pointer hover:opacity-90 active:scale-95">
          See All Courses
        </button>
      </div>
      <br />
    </div>
  );
};

export default Top_Courses;
