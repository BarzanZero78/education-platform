import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useParams } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";

const Admin_Add_Lesson = () => {
  const { courseName } = useParams();
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const { courses, addLessonForCourse } = useMainContext();
  const [course, setCourse] = useState(null);
  const [lessonName, setLessonName] = useState("");
  const [lessonImage, setLessonImage] = useState(null);
  const [lessonVideo, setLessonVideo] = useState(null);
  const [isVideoIntro, setIsVideoIntro] = useState(false);

  useEffect(() => {
    if (courses.length > 0) {
      const foundCourse = courses.find(
        (course) => course.courseName == courseName
      );
      setCourse(foundCourse || null);
    }
  }, [courses, courseName]);

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const hanldeUploadImage = async () => {
    try {
      if (!lessonImage) return null;

      const storageRef = ref(storage, `chapter_image/${lessonImage.name}`);
      await uploadBytes(storageRef, lessonImage);
      const lessonImageURL = await getDownloadURL(storageRef);
      return lessonImageURL;
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      return null;
    }
  };

  const hanldeUploadVideo = async () => {
    try {
      if (!lessonVideo) return null;

      const storageRef = ref(storage, `lesson_video/${lessonVideo.name}`);
      await uploadBytes(storageRef, lessonVideo);
      const lessonVideoURL = await getDownloadURL(storageRef);
      return lessonVideoURL;
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      return null;
    }
  };

  const handleCheckboxChange = (e) => {
    setIsVideoIntro(e.target.checked);
  }

  const hanldeAddChapter = async (e) => {
    e.preventDefault();

    try {
      if (lessonName !== "" && lessonImage) {
        let lessonImageURL = null;
        let lessonVideoURL = null;

        if (lessonImage.type.includes("image")) {
          lessonImageURL = await hanldeUploadImage();
        }

        if (lessonVideo.type.includes("video")) {
          lessonVideoURL = await hanldeUploadVideo();
        }

        const lessonData = {
          lessonName: lessonName,
          lessonImage: lessonImageURL,
          lessonVideo: lessonVideoURL,
          isVideoIntro: isVideoIntro,
        };

        await addLessonForCourse(course.id, lessonData);

        alert(`${lessonName} lesson added successfully`);
      }
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <div>
      {userData ? (
        <>
          {userData.isAdmin === true ? (
            <>
              <div className="absolute top-[50%] left-[50%] transform -translate-x-2/4 -translate-y-2/4 w-[350px] h-[300px] flex flex-col justify-center items-center gap-5 drop-shadow-md shadow-md rounded-md">
                <div>
                  <p className="text-lg font-semibold">
                    Add lesson for {course.courseName} course
                  </p>
                </div>

                <form
                  onSubmit={hanldeAddChapter}
                  className="flex flex-col justify-center items-center gap-3"
                >
                  <input
                    type="text"
                    placeholder="Lesson Name"
                    value={lessonName}
                    onChange={(e) => setLessonName(e.target.value)}
                    required
                    className="w-[300px] border border-[#c7c5c5] rounded p-2"
                  />

                  <input
                    type="file"
                    onChange={(e) => setLessonImage(e.target.files[0])}
                    required
                    id="lesson_image"
                    accept="image/png, image/jpg, image/jpeg"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="lesson_image"
                    className="w-[300px] border border-[#c7c5c5] rounded p-2"
                  >
                    Lesson Image
                  </label>

                  <input
                    type="file"
                    onChange={(e) => setLessonVideo(e.target.files[0])}
                    required
                    id="lesson_video"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="lesson_video"
                    className="w-[300px] border border-[#c7c5c5] rounded p-2"
                  >
                    Lesson Video
                  </label>

                  <div className="flex justify-between items-center w-full px-2">
                    <label
                      htmlFor="is_intro"
                    >
                      Is Intro
                    </label>
                    <input type="checkbox" id="is_intro" checked={isVideoIntro} onChange={handleCheckboxChange} />
                  </div>

                  <button className="w-[120px] p-2 bg-[#020202] text-white rounded cursor-pointer active:scale-90">
                    Add
                  </button>
                </form>
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

export default Admin_Add_Lesson;
