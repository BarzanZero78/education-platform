import React, { useState } from "react";
import { useMainContext } from "../context/MainContext";

const Enroll_Alert = ({ enrollAlert, setEnrollAlert, courseDetails, userData }) => {
  const { enrollCourse } = useMainContext();
  const [enrolledCourse, setEnrolledCourse] = useState(false);

  const hanldeEnrollment = async () => {
    try {
      const courseData = {
        courseDetails,
        userData,
        isCourseActive: false,
      };

      await enrollCourse(courseDetails.id, courseData);
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  return (
    <div className="fixed top-[50%] left-[50%] transform -translate-x-2/4 -translate-y-2/4 w-full h-screen bg-black/40">
      <div className="absolute top-[50%] left-[50%] transform -translate-x-2/4 -translate-y-2/4 bg-white w-[425px] h-[170px] rounded-md flex flex-col justify-center items-center gap-10">
        <div>
          <h3 className="text-base font-semibold flex justify-center items-center">
            Do you want to enroll <p className="font-bold pl-0.5">{courseDetails.courseName}</p>
            <img
              src={courseDetails.courseLogoURL}
              className="w-[30px] h-[30px] object-cover px-1"
              alt=""
            />{" "}
            course with{" "}
            <p className="font-bold pl-1">{courseDetails.coursePrice}$</p>?
          </h3>
        </div>

        <div className="flex flex-row-reverse justify-around items-center w-full">
          <button
            onClick={hanldeEnrollment}
            className="bg-[#4B1C82] w-[125px] p-2 rounded-lg text-white hover:opacity-90 active:scale-95"
          >
            Enroll
          </button>
          <button
            className="text-red-500 active:scale-95 font-semibold"
            onClick={() => setEnrollAlert(!enrollAlert)}
          >
            Cancel
          </button>
        </div>

        {enrolledCourse && (
          <div className="absolute top-[50%] left-[50%] transform -translate-x-2/4 -translate-y-2/4 bg-white w-[300px] h-[150px] rounded-md flex flex-col justify-center items-center gap-2">
            <div className="flex justify-end items-end ml-auto mr-1">
            <button onClick={() => setEnrolledCourse(!enrolledCourse)}>
            <span className="material-icons">close</span>
            </button>
            </div>
            <div className="flex justify-center items-center">
              <p className="px-2">
                The {courseDetails.courseName} enrolled successfully, please
                wait to active course.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enroll_Alert;
