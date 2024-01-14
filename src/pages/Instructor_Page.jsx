import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import { useUserAuth } from "../context/UserAuthContext";

const Instructor_Page = () => {
  const { instructorName } = useParams();
  const { instructors, fetchCoursesByInstructor } = useMainContext();
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [instructorData, setInstructorData] = useState(null);
  const [instructorCourses, setInstructorCourses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);

  useEffect(() => {
    if (instructors.length > 0) {
      const foundInstructor = instructors.find(
        (instructor) => instructor.instructorName === instructorName
      );
      setInstructorData(foundInstructor);
    }
  }, [instructors, instructorName]);

  useEffect(() => {
    if (instructorData) {
      fetchCoursesForInstructor(instructorData.id);
    }
  }, [instructorData]);

  const fetchCoursesForInstructor = async (instructorId) => {
    const instructorCourses = await fetchCoursesByInstructor(instructorId);
    setInstructorCourses(instructorCourses);
  };

  return (
    <div>
      {userData ? (
        <>
          {instructorData ? (
            <div className="pt-11 flex flex-col justify-center items-center gap-7">
              <div
                title={`${instructorData.instructorName}'s ${instructorData.instructorWork} Instructor`}
                className="flex flex-row-reverse flex-wrap justify-center items-center gap-5"
              >
                <img
                  src={instructorData.instructorImage}
                  alt=""
                  className="w-[100px] h-[100px] object-cover rounded-full"
                />

                <div className="flex flex-col justify-center items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    {instructorData.instructorName}
                  </h3>
                  <p className="text-base text-gray-500">
                    {instructorData.instructorWork}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-3">
                <div className="">
                <h3 className="text-lg font-bold">My courses ({instructorCourses.length})</h3>
                </div>

                <div className="flex flex-wrap gap-3 justify-center items-center container max-w-[1200px] mx-auto">
                  {instructorCourses.map((instructorCourse) => (
                    <Link
                      to={`/course/${instructorCourse.courseName}`}
                      key={instructorCourse.id}
                      title={`${instructorCourse.courseName} course`}
                      className="relative flex justify-center items-center border border-gray-300 rounded-md w-[325px] p-1 active:scale-95 hover:drop-shadow-lg hover:shadow-lg"
                    >
                      <div className="flex flex-row-reverse justify-around items-center w-full h-[115px]">
                        <div>
                          <img
                            src={instructorCourse.courseLogoURL}
                            className="w-[80px] h-[80px] object-contain"
                            alt=""
                          />
                        </div>

                        <div className="flex flex-col justify-start items-start gap-1 px-0.5">
                          <h4 className="text-base font-semibold">
                            {instructorCourse.courseName}
                          </h4>
                          <p className="text-sm text-gray-300 w-[225px] truncate">
                            {instructorCourse.courseDescription}
                          </p>

                          <div className="pt-8">
                          <p className="text-sm font-semibold bg-[#49228C] text-white w-[50px] text-center p-1 rounded-full">
                            {instructorCourse.coursePrice}$
                          </p>
                        </div>
                        </div>

                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <br /> <br /> <br /> <br /> <br /> <br />
              <br /> <br /> <br /> <br /> <br /> <br />
              <br /> <br /> <br /> <br /> <br /> <br />
              <br /> <br /> <br /> <br /> <br /> <br />
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Instructor_Page;
