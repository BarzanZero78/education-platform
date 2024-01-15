import React from "react";
import { useMainContext } from "../context/MainContext";

const Courses_Page = () => {
  const { courses } = useMainContext();

  return (
    <div className="flex flex-col justify-start items-start gap-7">
      <div className="p-4">
        <h1 className="text-xl font-bold">See our best courses</h1>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-7 px-4">
        {courses.map((course) => (
          <div
            className="flex justify-center items-center gap-7"
            key={course.id}
          >
            {course.isCoursePublished === true ? (
              <a
                href={`/course/${course.courseName}`}
                title={`${course.courseName} course`}
                className="flex flex-col justify-center items-center gap-3 bg-[#F7F7F7] w-[250px] h-[300px] rounded-xl p-3 cursor-pointer hover:bg-[#F2E6FE] hover:shadow-xl hover:drop-shadow-xl transform transition-shadow active:scale-95"
              >
                <div
                  className={`flex flex-col justify-center items-center bg-${course.courseBgColor} rounded-full w-[90px] h-[90px] p-2`}
                >
                  <p className="font-bold">{course.courseName}</p>
                  <img
                    src={course.courseLogoURL}
                    alt=""
                    className="w-[40px] h-[40px] object-contain"
                  />
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                  <h2 className="font-bold">{course.courseName}</h2>
                  <p className="text-xs px-1">{course.courseDescription}</p>
                </div>
              </a>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Courses_Page;
