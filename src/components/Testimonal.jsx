import React, { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";

const Testimonal = () => {
  const { courses, fetchCommentsWithCourse } = useMainContext();
  const [testimonals, setTestimonal] = useState([]);

  const publishedCourses = courses.filter(
    (course) => course.isCoursePublished === true
  );

  useEffect(() => {
    const fetchTestimonals = async () => {
      try {
        let allTestimonals = [];
        for (const course of publishedCourses) {
          const testimonals = await fetchCommentsWithCourse(course.id);
          allTestimonals = [...allTestimonals, ...testimonals];
        }
        setTestimonal(allTestimonals);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTestimonals();
  }, [fetchCommentsWithCourse, courses]);

  return (
    <div className="pt-[100px]">
      <div className="pb-[30px]">
        <h1 className="text-2xl font-bold text-center">
          What Our Students say <br /> about us
        </h1>
      </div>
      <div className="container max-w-[900px] mx-auto flex flex-row justify-center items-center gap-7">
        <div className="flex flex-wrap justify-center items-center gap-5">
          {testimonals.map(
            (testimonal, index) =>
              index < 3 && (
                <div
                  key={index}
                >
                  <div className="flex flex-col justify-center items-center gap-3 rounded w-[280px] h-[325px] border border-gray-300 drop-shadow-md hover:drop-shadow-2xl hover:shadow-lg cursor-text">
                    <div>
                      {testimonal.userData.userImage ? (
                        <img
                          src={testimonal.userData.userImage}
                          alt=""
                          className="w-[80px] h-[80px] object-cover rounded-full"
                        />
                      ) : (
                        <>
                          <p className="text-2xl bg-[#dfdada] flex justify-center items-center w-[80px] h-[80px] rounded-full">
                            {testimonal.userData.userName.charAt(0)}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                      <div className="flex flex-col justify-center items-center">
                        <h1 className="text-xl">
                          {testimonal.userData.userName}
                        </h1>
                        <a href={`/course/${testimonal.courseDetails.courseName}`}
                          className="text-blue-600"
                        >
                          {testimonal.courseDetails.courseName}
                        </a>
                      </div>

                      <div className="">
                        <p className="text-sm text-center px-2 text-gray-500">
                          {testimonal.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonal;
