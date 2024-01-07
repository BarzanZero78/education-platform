import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import { useUserAuth } from "../context/UserAuthContext";
import Enroll_Alert from "../components/Enroll_Alert";

const Course_Page = () => {
  const { courseName } = useParams();
  const {
    courses,
    fetchCoursesWithLessons,
    fetchEnrollesForUser,
    fetchEnrollmentsWithCourse,
  } = useMainContext();
  const [courseDetails, setCourseDetails] = useState(null);
  const [enrollAlert, setEnrollAlert] = useState(false);
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState({ userId: null });
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (courses.length > 0) {
      const foundCourse = courses.find(
        (course) => course.courseName === courseName
      );
      setCourseDetails(foundCourse);
    }
  }, [courses, courseName]);

  useEffect(() => {
    fetchCoursesWithLessons();
  }, [fetchCoursesWithLessons]);

  useEffect(() => {
    fetchEnrollmentsWithCourse();
  }, fetchEnrollmentsWithCourse);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data || { userId: null });
    };

    fetchUserData();
  }, [getUserData]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (userData.userId && courseDetails?.id) {
        const userEnrollments = await fetchEnrollesForUser(
          userData.userId,
          courseDetails.id
        );
        const isEnrolled = userEnrollments.length > 0;
        setIsEnrolled(isEnrolled);

        if (isEnrolled && courseDetails.isCoursePublished) {
          setEnrollAlert(false);
        }
      }
    };

    checkEnrollment();
  }, [
    userData.userId,
    courseDetails?.id,
    courseDetails?.isCoursePublished,
    fetchEnrollesForUser,
  ]);

  const handleGoBack = () => {
    history.goBack();
  };

  if (!userData || !courseDetails) {
    return <>Loading...</>;
  }

  return (
    <div>
      {userData ? (
        <>
          {courseDetails ? (
            <>
              {courseDetails.isCoursePublished === true ? (
                <div className="flex flex-col justify-center items-center gap-5">
                  <header className="fixed top-0 left-0 w-full h-[60px] bg-white shadow-md flex justify-between items-center">
                    <button
                      onClick={handleGoBack}
                      className="hover:bg-[#dfdada] rounded-full active:scale-95 cursor-pointer px-2 py-2"
                    >
                      <span className="material-icons">arrow_back</span>
                    </button>

                    <div className="flex justify-center items-center gap-1">
                      <h1 className="text-base font-bold">
                        {courseDetails.courseName}
                      </h1>
                      <img
                        src={courseDetails.courseLogoURL}
                        className="w-[35px] h-[35px] object-cover"
                        alt=""
                      />
                    </div>

                    <a href=""></a>
                  </header>
                  <div className="pt-[50px]">
                    <div className="flex flex-row-reverse flex-wrap justify-center items-center w-full gap-16">
                      <div>
                        <img
                          src={courseDetails.courseLogoURL}
                          className="w-[150px] h-[150px] object-cover drop-shadow-md"
                          alt=""
                        />
                      </div>

                      <div className="flex flex-col justify-center items-center gap-3">
                        <h3 className="text-lg font-bold">
                          {courseDetails.courseName}
                        </h3>
                        <p>{courseDetails.courseDescription}</p>
                      </div>
                    </div>

                    <div className="flex flex-row-reverse justify-start items-start pt-8 gap-3">
                      <div>
                        <img
                          src={courseDetails.selectedInstructor.instructorImage}
                          className="w-[50px] h-[50px] object-cover rounded-full"
                          alt=""
                          title="Instructor"
                        />
                      </div>

                      <div className="flex flex-col justify-end items-end">
                        <p
                          className="text-base font-semibold"
                          title="Instructor"
                        >
                          {courseDetails.selectedInstructor.instructorName}
                        </p>
                        <p className="text-sm text-gray-500" title="Instructor">
                          {courseDetails.selectedInstructor.instructorWork}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center pt-7">
                      <div>
                        <h3 className="text-lg font-bold">Chapters</h3>
                      </div>

                      <div className="flex flex-col justify-center items-center gap-3 p-6 h-[250px] overflow-y-auto">
                        {courseDetails.lessons ? (
                          <div>
                            {courseDetails.lessons.length > 0 ? (
                              <div className="flex flex-col justify-center items-center gap-3 pt-60">
                                {courseDetails.lessons.map((lesson, index) => (
                                  <div
                                    className="flex flex-row-reverse px-2 rounded-md cursor-pointer hover:bg-[#FBFBFB] active:scale-95 justify-between items-center w-[300px] h-[60px] border overflow-y-auto"
                                    key={index}
                                  >
                                    <p>{lesson.lessonName}</p>
                                    <span className="material-icons">lock</span>
                                  </div>
                                ))}

                                <br />
                              </div>
                            ) : (
                              <>No lessons yet!</>
                            )}
                          </div>
                        ) : (
                          <>Loading...</>
                        )}
                      </div>
                    </div>

                    {courseDetails.enrollment &&
                    courseDetails.enrollment.length > 0 ? (
                      <div>
                        {courseDetails.enrollment.map((enrollment, index) => (
                          <div key={index}>
                            {enrollment.isCourseActive === true ? (
                              <p
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform,
                                }}
                              >
                                Open {enrollment.courseDetails.courseName}
                                course
                                {console.log(
                                  `Dear ${enrollment.userData.userName} now you can open ${enrollment.courseDetails.courseName} course!`
                                )}
                              </p>
                            ) : (
                              <>
                                <div className="fixed bottom-0 right-0 w-full h-[60px] bg-white drop-shadow-2xl shadow-2xl flex justify-around items-center">
                                  <p className="text-base font-bold">
                                    {courseDetails.coursePrice}$
                                  </p>
                                  <button
                                    onClick={() => setEnrollAlert(!enrollAlert)}
                                    className="bg-[#4B1C82] w-[125px] p-2 rounded-lg text-white hover:opacity-90 active:scale-95"
                                  >
                                    Enroll
                                  </button>
                                </div>

                                {enrollAlert && (
                                  <>
                                    <Enroll_Alert
                                      enrollAlert={enrollAlert}
                                      setEnrollAlert={setEnrollAlert}
                                      courseDetails={courseDetails}
                                      userData={userData}
                                    />
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <br /> <br /> <br /> <br />
                </div>
              ) : (
                <>No course found</>
              )}
            </>
          ) : (
            <>Loading...</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Course_Page;
