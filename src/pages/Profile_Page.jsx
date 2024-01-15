import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useMainContext } from "../context/MainContext";
import { useNavigate } from "react-router-dom";

const Profile_Page = () => {
  const { getUserData, signOutUser } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const { fetchActiveCoursesForUser, getUserEnrollmentsFromLocalStorage } =
    useMainContext();
  const [userEnrollment, setUserEnrollment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        const storedEnrollments = getUserEnrollmentsFromLocalStorage();

        if (storedEnrollments.length > 0) {
          setUserEnrollment(storedEnrollments);
        } else {
          await fetchEnrollmentsByUser(userData.userId);
        }
      }
    };

    fetchData();
  }, [userData]);

  const handleSignOutUser = async () => {
    try {
      localStorage.removeItem("userData");
      localStorage.removeItem("userEnrollments");

      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchEnrollmentsByUser = async (userId) => {
    const userEnrollments = await fetchActiveCoursesForUser(userId);
    setUserEnrollment(userEnrollments);
  };

  const hanldeFinCourse = () => {
    window.location.pathname = "/courses";
  };

  return (
    <div>
      {userData ? (
        <div className="pt-[50px]">
          <div className="w-[95%] h-[200px] flex flex-col justify-center items-center gap-3 bg-white drop-shadow-lg rounded-lg mx-auto">
            <div className="mr-0 ml-auto px-2">
              <button onClick={handleSignOutUser} title="Logout">
                <span className="material-icons active:scale-95 text-2xl bg-[#dfdada] flex justify-center items-center w-[40px] h-[40px] rounded-full">
                  logout
                </span>
              </button>
            </div>

            <div>
              {userData.userImage ? (
                <img
                  src={userData.userImage}
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  alt=""
                />
              ) : (
                <p className="text-2xl bg-[#dfdada] flex justify-center items-center w-[50px] h-[50px] rounded-full">
                  {userData.userName.charAt(0)}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
              <div className="flex justify-center items-center gap-1">
                <h3 className="text-lg font-semibold">{userData.userName}</h3>
                {userData.isAdmin === true ? (
                  <span className="material-icons text-blue-600">verified</span>
                ) : <></>}
              </div>
              <p className="text-base text-gray-500">{userData.email}</p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 py-6 px-10">
            <div className="">
              <h1 className="text-xl font-bold">
                My courses ({userEnrollment.length})
              </h1>
            </div>

            {userEnrollment ? (
              <>
                {userEnrollment.length > 0 ? (
                  <div className="flex flex-wrap gap-3 justify-center items-center container max-w-[1200px] mx-auto">
                    {userEnrollment.map((userEnroll, index) => (
                      <div className="" key={index}>
                        {userEnroll.courseData.isCourseActive === true ? (
                          <div className="">
                            <a
                              href={`/course/${userEnroll.courseData.courseDetails.courseName}`}
                              title={`${userEnroll.courseData.courseDetails.courseName} course`}
                              className="relative flex justify-center items-center border border-gray-300 rounded-md w-[325px] p-1 active:scale-95 hover:drop-shadow-lg hover:shadow-lg"
                            >
                              <div className="flex flex-row-reverse justify-around items-center w-full h-[115px]">
                                <div>
                                  <img
                                    src={
                                      userEnroll.courseData.courseDetails
                                        .courseLogoURL
                                    }
                                    className="w-[80px] h-[80px] object-contain"
                                    alt=""
                                  />
                                </div>

                                <div className="flex flex-col justify-start items-start gap-1 px-0.5">
                                  <h4 className="text-base font-semibold">
                                    {
                                      userEnroll.courseData.courseDetails
                                        .courseName
                                    }
                                  </h4>
                                  <p className="text-sm text-gray-300 w-[225px] truncate">
                                    {
                                      userEnroll.courseData.courseDetails
                                        .courseDescription
                                    }
                                  </p>

                                  <div className="pt-8">
                                    <p className="text-sm font-semibold bg-[#49228C] text-white w-[50px] text-center p-1 rounded-full">
                                      {
                                        userEnroll.courseData.courseDetails
                                          .coursePrice
                                      }
                                      $
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p>You don't have any courses</p>
                    <button
                      onClick={hanldeFinCourse}
                      className="bg-[#F67E59] text-white py-2 px-5 rounded-full hover:opacity-90 active:scale-95"
                    >
                      Find Your Course
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>Loading...</>
            )}
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Profile_Page;
