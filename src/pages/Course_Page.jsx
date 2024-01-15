import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import { useUserAuth } from "../context/UserAuthContext";
import { isAndroid, isIOS, isWindows, isMacOs } from "react-device-detect";
import { serverTimestamp } from "firebase/firestore";

const Course_Page = () => {
  const { courseName } = useParams();
  const {
    courses,
    fetchCoursesWithLessons,
    enrollCourse,
    fetchEnrollmentsForUser,
    fetchCommentsWithCourse,
    createComment,
    removeComment,
  } = useMainContext();
  const [courseDetails, setCourseDetails] = useState(null);
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState({ userId: null });
  const [isLoading, setIsLoading] = useState(true);
  const [userEnrollment, setUserEnrollment] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

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
    if (courseDetails && userData) {
      fetchEnrollmentsByUser(courseDetails.id, userData.userId);
    }
  }, [courseDetails, userData]);

  const fetchEnrollmentsByUser = async (courseId, userId) => {
    const userEnrollments = await fetchEnrollmentsForUser(courseId, userId);
    setUserEnrollment(userEnrollments);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data || { userId: null });
    };

    fetchUserData();
  }, [getUserData]);

  useEffect(() => {
    setIsLoading(false);
  }, [courses, courseDetails, userData]);

  useEffect(() => {
    setIsLoading(false);
  }, [courses, courseDetails, userData]);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleEnrollment = async () => {
    try {
      const courseData = {
        courseDetails,
        userData,
        isCourseActive: false,
        timestamp: serverTimestamp(),
        devicePlatform: getDevicePlatform(),
      };

      await enrollCourse(courseDetails.id, courseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDevicePlatform = () => {
    if (isAndroid) {
      return "Android";
    } else if (isIOS) {
      return "iOS";
    } else if (isWindows) {
      return "Windows";
    } else if (isMacOs) {
      return "MacOS";
    } else {
      return "Unknown";
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (courseDetails) {
        const comments = await fetchCommentsWithCourse(courseDetails.id);
        setComments(comments);
      }
    };

    fetchComments();
  }, [fetchCommentsWithCourse, courseDetails]);

  const hanldeCreateComment = async () => {
    try {
      if (comment != "") {
        const commentData = {
          comment,
          courseDetails,
          userData,
          timestamp: serverTimestamp(),
        };

        await createComment(courseDetails.id, commentData);

        setComment("");
      } else {
        alert("Please write your comment");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveComment = async (commentUserId) => {
    try {
      await removeComment(courseDetails.id, commentUserId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeChangeComment = (e) => {
    const value = e.target.value;
    setComment(value);
  };
  const characterLimit = 150;

  return (
    <div>
      {userData ? (
        <>
          {courseDetails ? (
            <>
              {courseDetails.isCoursePublished === true ? (
                <div className="flex flex-col justify-center items-center gap-5">
                  <header
                    className={`fixed top-0 left-0 w-full h-[60px] bg-white shadow-md flex justify-between items-center ${
                      isIOS ? "backdrop-blur-lg" : ""
                    }`}
                  >
                    <button
                      onClick={() => history.back()}
                      className={`hover:bg-[#dfdada] rounded-full active:scale-95 cursor-pointer px-2 py-2 ${
                        isIOS || isMacOs
                          ? "active:text-[#dfdada]"
                          : ""
                      }`}
                    >
                      <span className="material-icons">arrow_back</span>
                    </button>

                    <div className="flex justify-center items-center gap-1">
                      <h1 className="text-base font-bold">
                        {courseDetails.courseName}
                      </h1>
                      <img
                        src={courseDetails.courseLogoURL}
                        className="w-[35px] h-[35px] object-contain drop-shadow-2xl"
                        alt=""
                      />
                    </div>

                    <a href=""></a>
                  </header>
                  <div className="pt-[50px] flex flex-col justify-center items-center gap-5">
                    <div>
                      {courseDetails.lessons ? (
                        <>
                          {courseDetails.lessons.length > 0 ? (
                            <>
                              {courseDetails.lessons.map((lesson, index) => (
                                <div key={index}>
                                  {lesson.isVideoIntro === true ? (
                                    <div className="w-[95%] h-[200px]">
                                      <video
                                        controls
                                        className="w-[700px] h-[200px]"
                                      >
                                        <source
                                          src={lesson.lessonVideo}
                                          type="video/mp4"
                                        />
                                      </video>
                                      <p>{lesson.lessonName}</p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              ))}
                            </>
                          ) : (
                            <>No lessons</>
                          )}
                        </>
                      ) : (
                        <>Loading...</>
                      )}
                    </div>

                    <div className="flex flex-row-reverse flex-wrap justify-center items-center w-full mx-auto gap-5">
                      <div>
                        <img
                          src={courseDetails.courseLogoURL}
                          className="w-[150px] h-[150px] object-contain drop-shadow-2xl"
                          alt=""
                        />
                      </div>

                      <div className="flex flex-col justify-center items-center gap-3">
                        <h3 className="text-lg font-bold">
                          {courseDetails.courseName}
                        </h3>
                        <p className="text-base text-gray-500 max-w-[300px]">
                          {courseDetails.courseDescription}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/instructor/${courseDetails.selectedInstructor.instructorName}`}
                      className="flex flex-row-reverse mr-0 ml-auto pt-8 px-9 gap-1"
                    >
                      <div>
                        <img
                          src={courseDetails.selectedInstructor.instructorImage}
                          className="w-[50px] h-[50px] object-cover rounded-full"
                          alt=""
                          title="Instructor"
                        />
                      </div>

                      <div className="flex flex-col mr-0 ml-auto px-9">
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
                    </Link>

                    <div className="flex flex-col justify-center items-center pt-7">
                      <div>
                        <h3 className="text-lg font-bold">Chapters</h3>
                      </div>

                      <div className="">
                        {!userEnrollment.length > 0 ? (
                          <div className="flex flex-col justify-center items-center gap-3 p-6 h-[250px] overflow-y-auto">
                            {courseDetails.lessons ? (
                              <div>
                                {courseDetails.lessons.length > 0 ? (
                                  <div className="flex flex-col justify-center items-center gap-3 pt-60">
                                    {courseDetails.lessons.map(
                                      (lesson, index) => (
                                        <div
                                          className="flex flex-row-reverse px-2 rounded-md cursor-pointer hover:bg-[#FBFBFB] active:scale-95 justify-between items-center w-[300px] h-[60px] border overflow-y-auto"
                                          key={index}
                                        >
                                          <p>{lesson.lessonName}</p>
                                          {lesson.isVideoIntro === true ? (
                                            <span class="material-icons">
                                              play_circle
                                            </span>
                                          ) : (
                                            <span class="material-icons">
                                              lock
                                            </span>
                                          )}
                                        </div>
                                      )
                                    )}

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
                        ) : (
                          <></>
                        )}

                        {userEnrollment && userEnrollment.length > 0 ? (
                          <div className="">
                            {userEnrollment.map((userEnroll, index) => (
                              <div key={index} className="">
                                {userEnroll.courseData.isCourseActive ===
                                true ? (
                                  <div className="">
                                    <div className="">
                                      {courseDetails.lessons ? (
                                        <div className="">
                                          {courseDetails.lessons.length > 0 ? (
                                            <div className="">
                                              {courseDetails.lessons.map(
                                                (lesson, index) => (
                                                  <div
                                                    key={index}
                                                    className="flex flex-col justify-center items-center gap-10 p-6"
                                                    onClick={() =>
                                                      handleLessonClick(lesson)
                                                    }
                                                  >
                                                    <div className="flex flex-col justify-center items-center gap-5">
                                                      {/* {activeLesson && (
                                                        <div className="flex flex-col justify-center items-center gap-10 p-6">
                                                          <div className="flex flex-col justify-start items-start gap-3">
                                                            <div className="w-[100%] h-[200px]">
                                                              <video
                                                                controls
                                                                className="w-[600px] h-[200px]"
                                                              >
                                                                <source
                                                                  src={
                                                                    activeLesson.lessonVideo
                                                                  }
                                                                  type="video/mp4"
                                                                />
                                                              </video>
                                                            </div>

                                                            <div>
                                                              <h1 className="text-lg font-bold">
                                                                {
                                                                  activeLesson.lessonName
                                                                }
                                                              </h1>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )} */}

                                                      <div className="flex flex-col justify-center items-center gap-5 h-[200px] overflow-y-auto">
                                                        <div className="flex flex-row-reverse px-2 rounded-md cursor-pointer hover:bg-[#FBFBFB] active:scale-95 justify-between items-center w-[300px] h-[60px] border">
                                                          <div>
                                                            <h1 className="text-lg font-[450]">
                                                              {
                                                                lesson.lessonName
                                                              }
                                                            </h1>
                                                          </div>
                                                          <div>
                                                            <span className="material-icons">
                                                              play_circle
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="">
                                                      <div>
                                                        {comments ? (
                                                          <>
                                                            {comments.length >
                                                            0 ? (
                                                              <div className="flex flex-col justify-center items-center gap-5 w-[500px] mx-auto h-[250px] overflow-y-auto p-3">
                                                                {comments.map(
                                                                  (comment) => (
                                                                    <div className="flex flex-col-reverse justify-start items-start gap-2 p-1 w-full border-b border-b-gray-300">
                                                                      <p className="text-base px-8">
                                                                        {
                                                                          comment.comment
                                                                        }
                                                                      </p>
                                                                      <div className="w-full">
                                                                        <div className="flex flex-row-reverse justify-between items-center">
                                                                          <div>
                                                                            {comment
                                                                              .userData
                                                                              .userId ===
                                                                            userData.userId ? (
                                                                              <div>
                                                                                <button
                                                                                  onClick={() =>
                                                                                    handleRemoveComment(
                                                                                      comment
                                                                                        .userData
                                                                                        .userId
                                                                                    )
                                                                                  }
                                                                                  className="hover:bg-gray-500 active:scale-95 rounded-full hover:text-white w-[30px] h-[30px] p-0.5"
                                                                                >
                                                                                  <span className="material-icons">
                                                                                    delete
                                                                                  </span>
                                                                                </button>
                                                                              </div>
                                                                            ) : (
                                                                              <>

                                                                              </>
                                                                            )}
                                                                          </div>

                                                                          <div className="flex flex-row justify-center items-center gap-0.5">
                                                                            {comment
                                                                              .userData
                                                                              .userImage ? (
                                                                              <img
                                                                                src={
                                                                                  comment
                                                                                    .userData
                                                                                    .userImage
                                                                                }
                                                                                className="w-[30px] h-[30px] object-cover rounded-full"
                                                                                alt=""
                                                                              />
                                                                            ) : (
                                                                              <>
                                                                                <p className="text-xl bg-[#dfdada] flex justify-center items-center w-[30px] h-[30px] rounded-full">
                                                                                  {comment.userData.userName.charAt(
                                                                                    0
                                                                                  )}
                                                                                </p>
                                                                              </>
                                                                            )}
                                                                            <p className="text-base">
                                                                              {
                                                                                comment
                                                                                  .userData
                                                                                  .userName
                                                                              }
                                                                            </p>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  )
                                                                )}
                                                              </div>
                                                            ) : (
                                                              <>No comments</>
                                                            )}
                                                          </>
                                                        ) : (
                                                          <>Loading...</>
                                                        )}
                                                      </div>

                                                      <div className="flex justify-center items-center gap-2">
                                                        <div className="relative">
                                                          <textarea
                                                            placeholder="Add Your Comment"
                                                            value={comment}
                                                            onChange={
                                                              hanldeChangeComment
                                                            }
                                                            maxLength={
                                                              characterLimit
                                                            }
                                                            className="w-[300px] p-1 border border-gray-500 rounded-md focus:outline-none"
                                                            required
                                                          ></textarea>
                                                          <p className="text-gray-500 text-sm absolute bottom-2 right-0 px-4">
                                                            {comment.length}/
                                                            {characterLimit}
                                                          </p>
                                                        </div>
                                                        <button
                                                          className="bg-[#4B1C82] w-[125px] p-2 rounded-lg text-white hover:opacity-90 active:scale-95"
                                                          onClick={
                                                            hanldeCreateComment
                                                          }
                                                        >
                                                          Add Comment
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          ) : (
                                            <>No lessons yet!</>
                                          )}
                                        </div>
                                      ) : (
                                        <>Loading...</>
                                      )}
                                    </div>

                                    <div className="fixed bottom-0 right-0 w-full h-[60px] bg-white drop-shadow-2xl shadow-2xl flex justify-around items-center">
                                      <p className="text-base font-bold">
                                        {courseDetails.coursePrice}$
                                      </p>
                                      <button className="bg-[#4B1C82] w-[125px] p-2 rounded-lg text-white hover:opacity-90 active:scale-95">
                                        Open Course
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex flex-col justify-center items-center gap-3 p-6 h-[250px] overflow-y-auto">
                                      {courseDetails.lessons ? (
                                        <div>
                                          {courseDetails.lessons.length > 0 ? (
                                            <div className="flex flex-col justify-center items-center gap-3 pt-60">
                                              {courseDetails.lessons.map(
                                                (lesson, index) => (
                                                  <div
                                                    className="flex flex-row-reverse px-2 rounded-md cursor-pointer hover:bg-[#FBFBFB] active:scale-95 justify-between items-center w-[300px] h-[60px] border overflow-y-auto"
                                                    key={index}
                                                  >
                                                    <p>{lesson.lessonName}</p>
                                                    {lesson.isVideoIntro ===
                                                    true ? (
                                                      <span className="material-icons">
                                                        play_circle
                                                      </span>
                                                    ) : (
                                                      <span className="material-icons">
                                                        lock
                                                      </span>
                                                    )}
                                                  </div>
                                                )
                                              )}

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
                                    <div className="fixed bottom-0 right-0 w-full h-[60px] bg-white drop-shadow-2xl shadow-2xl flex justify-around items-center">
                                      <p className="text-base font-bold">
                                        {courseDetails.coursePrice}$
                                      </p>
                                      <button
                                        onClick={handleEnrollment}
                                        className="bg-[#4B1C82] w-[125px] p-2 rounded-lg text-white hover:opacity-90 active:scale-95"
                                      >
                                        Enroll
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="fixed bottom-0 right-0 w-full h-[60px] bg-white drop-shadow-2xl shadow-2xl flex justify-around items-center">
                            <p className="text-base font-bold">
                              {courseDetails.coursePrice}$
                            </p>
                            <button
                              onClick={handleEnrollment}
                              className="bg-[#4B1C82] w-[125px] p-2 rounded-lg text-white hover:opacity-90 active:scale-95"
                            >
                              Enroll
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <br /> <br /> <br />
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
