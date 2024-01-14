import React, { useEffect, useState } from "react";
import { useMainContext } from "../../context/MainContext";
import Sidebar from "../../components/admin/Sidebar";
import Student_Card from "../../components/admin/Student_Card";
import { useUserAuth } from "../../context/UserAuthContext";

const Admin_Students_Page = () => {
  const { courses, fetchEnrollments } = useMainContext();
  const [enrollments, setEnrollments] = useState([]);
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);

  const publishedCourses = courses.filter(
    (course) => course.isCoursePublished === true
  );

  useEffect(() => {
    const fetchAllEnrollments = async () => {
      try {
        let allEnrollments = [];
        for (const course of publishedCourses) {
          const enrollments = await fetchEnrollments(course.id);
          allEnrollments = [...allEnrollments, ...enrollments];
        }

        setEnrollments(allEnrollments);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAllEnrollments();
  }, []);

  return (
    <div className="flex">
      {userData ? (
        <>
          {userData.isAdmin === true ? (
            <>
              <div className="flex-1">
                <Sidebar />
              </div>

              <div className="flex-1">
                <div className="flex flex-col justify-center items-center gap-5">
                  <header className="sticky top-0 right-0 w-full h-[45px] shadow-lg flex justify-between items-center p-1 bg-white">
                    <div>
                      <p>Students</p>
                    </div>
                  </header>

                  <div className="flex flex-col justify-center items-center gap-5 p-4">
                    {enrollments.map((enrollment, index) => (
                      <div key={index} className="">
                        <Student_Card
                          enrollment={enrollment}
                          publishedCourses={publishedCourses}
                        />
                      </div>
                    ))}
                  </div>
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

export default Admin_Students_Page;
