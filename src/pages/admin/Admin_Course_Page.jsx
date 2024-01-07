import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import Lesson_Card from "../../components/admin/Lesson_Card";
import { db } from "../../firebase/FirebaseConfig";

const Admin_Course_Page = () => {
  const { courseName } = useParams();
  const { getUserData } = useUserAuth();
  const { courses, fetchCoursesWithLessons } = useMainContext();
  const [userData, setUserData] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCoursesWithLessons();
  }, [fetchCoursesWithLessons]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);

  useEffect(() => {
    if (courses.length > 0) {
      const foundCourse = courses.find(
        (course) => course.courseName === courseName
      );
      setCourse(foundCourse || null);
    }
  }, [courses, courseName]);

  // Check if course is null or does not have necessary properties
  if (!course || !course.courseName || !course.courseLogoURL) {
    return <div>Loading...</div>;
  }

  const hanldeIsCoursePublished = async () => {
    if (course) {
      const courseRef = doc(db, "courses", course.id);
      const updatedData = {
        isCoursePublished: !course.isCoursePublished,
      };

      try {
        await updateDoc(courseRef, updatedData);
      } catch (error) {
        const errorMessage = error.message;
        const errorCode = error.code;
        console.log(errorMessage);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {userData ? (
        <>
          {userData.isAdmin === true ? (
            <>
              <header className="fixed top-0 left-0 w-full h-[50px] flex justify-around items-center bg-white shadow-md">
                <div className="flex justify-center items-center gap-1">
                  <h1>{course?.courseName}</h1>
                  <img
                    src={course?.courseLogoURL}
                    className="w-[30px] h-[30px] object-cover"
                    alt=""
                  />
                </div>

                <div>
                  <Link
                    to={`/admin_panel/course/${courseName}/add_lesson`}
                    className="flex justify-center items-center gap-0.5 hover:bg-[#c5c1c1] rounded p-0.5"
                  >
                    <span className="material-icons">add</span>
                    ADD LESSON
                  </Link>
                </div>
              </header>

              <div className="pt-20 flex flex-col justify-center items-center gap-3">
                <div className="flex justify-center items-center gap-1">
                  <p className="text-base font-semibold">{course.courseName}</p>
                  <img
                    src={course.courseLogoURL}
                    className="w-[30px] h-[30px] object-cover"
                    alt=""
                  />
                </div>

                <div>
                  <p>{course.courseDescription}</p>
                </div>

                <div className="flex justify-center items-center gap-6 p-1 border-b">
                  <label htmlFor="is_course_published">
                    Is Course Published
                  </label>
                  <input
                    id="is_course_published"
                    type="checkbox"
                    checked={course.isCoursePublished || false}
                    onChange={hanldeIsCoursePublished}
                  />
                </div>

                <div className="flex flex-col justify-center items-center gap-3 p-1">
                  <p className="text-base font-bold">Instructor</p>
                  <div className="flex justify-center items-center gap-6 p-1 border-b">
                    <p>{course.selectedInstructor.instructorName}</p>
                    <img
                      src={course.selectedInstructor.instructorImage}
                      className="w-[40px] h-[40px] object-cover rounded-full"
                      alt=""
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-3">
                  <div>
                    <h3 className="text-xl font-bold">Lessons</h3>
                  </div>

                  {course.lessons ? (
                    <>
                      {course.lessons.length > 0 ? (
                        <div className="flex flex-col justify-center items-center gap-5 overflow-y-auto h-[300px] p-6">
                          {course.lessons.map((lesson) => (
                            <Lesson_Card
                              key={lesson.id}
                              course={course}
                              lesson={lesson}
                            />
                          ))}

                          <br />
                        </div>
                      ) : (
                        <>No lessons yet!</>
                      )}
                    </>
                  ) : (
                    <>Loading...</>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>404 Not found</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Admin_Course_Page;
