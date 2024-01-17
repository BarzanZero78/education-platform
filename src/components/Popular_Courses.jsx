import React, { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";

const Popular_Courses = () => {
  const { courses, fetchCoursesWithLessons, fetchAllActiveCourses } =
    useMainContext();
  const [activeCoursesCount, setActiveCoursesCount] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");

    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      fetchCoursesWithLessons(parsedCourses); // Use the courses from local storage
    } else {
      fetchCoursesWithLessons(); // Fetch from Firestore if not available in local storage
    }
  }, [fetchCoursesWithLessons]);

  useEffect(() => {
    const fetchActiveCoursesCount = async () => {
      try {
        const counts = [];

        for (const course of courses.slice(currentIndex, currentIndex + 3)) {
          const activeCourses = await fetchAllActiveCourses(course.id);
          counts.push({
            courseId: course.id,
            count: activeCourses.length,
          });
        }

        setActiveCoursesCount(counts);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchActiveCoursesCount();
  }, [fetchAllActiveCourses, currentIndex, courses]);

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < courses.length ? prevIndex + 1 : 0
    );
  };

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : courses.length - 1
    );
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 bg-[#FBFBFB]">
      <div>
        <h1 className="text-2xl font-bold">
          See Our top quality Popular Courses
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-14 pt-[80px] px-10 w-full mx-auto overflow-x-hidden overflow-y-hidden">
        <div className="flex justify-center items-center gap-5 p-2">
          {courses
            .slice(currentIndex, currentIndex + 3)
            .map((course, index) => (
              <div key={index} className="">
                {course.isCoursePublished === true ? (
                  <a
                    href={`/course/${course.courseName}`}
                    className="relative flex flex-col justify-start items-start bg-transparent w-[270px] h-[280px] drop-shadow-xl shadow-xl rounded-xl hover:bg-[#FBFBFB] active:scale-95"
                    key={index}
                  >
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
                          <span className="material-icons text-sm">
                            visibility
                          </span>
                          <span className="text-sm">
                            {activeCoursesCount.find(
                              (count) => count.courseId === course.id
                            )?.count || 0}
                          </span>
                        </div>

                        <div className="flex justify-center items-center">
                          <span className="material-icons text-sm">
                            play_arrow
                          </span>
                          <span className="text-sm">
                            {course.lessons
                              ? `${course.lessons.length} Lectures`
                              : ""}
                          </span>
                        </div>

                        <div className="flex justify-center items-center">
                          <span className="material-icons text-sm">
                            schedule
                          </span>

                          <span className="text-sm">2h 40min</span>
                        </div>
                      </div>

                      <div className="flex p-3">
                        <p className="text-sm font-bold">
                          {course.coursePrice}$
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>

        <div className="flex justify-end items-center gap-3 mr-0 ml-auto">
          <button
            className="bg-[#4B1C82] rounded-full w-[40px] h-[40px] active:scale-95 hover:opacity-85"
            onClick={handleLeftClick}
          >
            <span className="material-icons text-4xl text-white">
              chevron_left
            </span>
          </button>

          <button
            className="bg-[#4B1C82] rounded-full w-[40px] h-[40px] active:scale-95 hover:opacity-85"
            onClick={handleRightClick}
          >
            <span className="material-icons text-4xl text-white">
              navigate_next
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  function getTotalVideoDuration(lessons) {
    const totalMinutes = lessons.reduce(
      (acc, lesson) => acc + lesson.videoDuration,
      0
    );

    const pluralizedMinutes = totalMinutes !== 1 ? "minutes" : "minute";
    return `${totalMinutes} ${pluralizedMinutes}`;
  }
};

export default Popular_Courses;
