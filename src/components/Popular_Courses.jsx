import React from "react";
import IMAGE from "../assets/img/0.png";
import Arman from "../assets/img/html_css.jpg";
import { useMainContext } from "../context/MainContext";

const Popular_Courses = () => {
  const { courses } = useMainContext();

  return (
    <div className="flex flex-col justify-center items-center p-2 bg-[#FBFBFB]">
      <div>
        <h1 className="text-2xl font-bold">
          See Our top quality Popular Courses
        </h1>
      </div>
      <div className="container max-w-[600px] overflow-y-auto mx-auto flex flex-col justify-center items-center gap-14 pt-[80px] px-8">
        <div className="flex justify-center items-center gap-5 p-2">
          {courses.map((course, index) => (
            <>
            {course.isCoursePublished === true ? (
              <a href={`/course/${course.courseName}`} className="relative flex flex-col justify-start items-start bg-transparent w-[270px] h-[280px] drop-shadow-xl shadow-xl rounded-xl hover:bg-[#FBFBFB] active:scale-95" key={index}>
              <div className="absolute -top-7 right-5">
                <img
                  src={course.courseBgImageURL}
                  alt={course.courseName}
                  className="w-[230px] h-[150px] object-cover rounded-tl-[25px] rounded-tr-[10px]"
                />
              </div>

              <div className="flex flex-col justify-start items-start pt-[140px]">
                <div className="px-3">
                  <h1 className="font-bold">{course.courseName}</h1>
                </div>

                <div className="flex justify-center items-center gap-1 px-3">
                  <div>
                    <img
                      src={course.selectedInstructor.instructorImage}
                      alt=""
                      className="w-[25px] h-[25px] object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p>{course.selectedInstructor.instructorName}</p>
                  </div>
                </div>

                <div className="flex justify-around items-center w-full pt-3 gap-2 px-3">
                  <div className="flex justify-center items-center">
                    <span class="material-icons text-sm">visibility</span>
                    <span className="text-sm">285000</span>
                  </div>

                  <div className="flex justify-center items-center">
                    <span class="material-icons text-sm">play_arrow</span>
                    <span className="text-sm">
                    {course.lessons ? `${course.lessons.length} Lectures` : ''}
                    </span>
                  </div>

                  <div className="flex justify-center items-center">
                    <span class="material-icons text-sm">schedule</span>
                    <span className="text-sm">2h 40min</span>
                  </div>
                </div>

                <div className="flex px-3 gap-5">
                  <p className="text-sm font-bold">{course.coursePrice}$</p>
                  {/* <p className="text-sm text-gray-300">99.50$</p> */}
                </div>
              </div>
            </a>
            ) : <></>}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular_Courses;
