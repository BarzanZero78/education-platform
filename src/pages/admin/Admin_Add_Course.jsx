import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useMainContext } from "../../context/MainContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";

const Admin_Add_Course = () => {
  const { getUserData } = useUserAuth();
  const { addCourse, instructors } = useMainContext();
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [userData, setUserData] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseBgColor, setCourseBgColor] = useState("");
  const [courseLogo, setCourseLogo] = useState(null);
  const [courseBgImage, setCourseBgImage] = useState(null);
  const [courseDescription, setCourseDiscription] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [isCoursePublished, setIsCoursePublished] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  const hanldeInstructorChange = (e) => {
    const selectedId = e.target.value;
    const instructor = instructors.find(
      (instructor) => instructor.id === selectedId
    );
    setSelectedInstructor(instructor);
  };

  const hanldeCourseLogoUpload = async () => {
    try {
      if (!courseLogo) return null;

      const storageRef = ref(storage, `course_logo/${courseLogo.name}`);
      await uploadBytes(storageRef, courseLogo);
      const courseLogoURL = await getDownloadURL(storageRef);
      return courseLogoURL;
    } catch (error) {
      console.error("Error uploading course logo:", error);
      return null;
    }
  };

  const handleCourseBgImageUpload = async () => {
    try {
      if (!courseBgImage) return null;

      const storageRef = ref(storage, `course_image/${courseBgImage.name}`);
      await uploadBytes(storageRef, courseBgImage);
      const courseBgImageURL = await getDownloadURL(storageRef);
      return courseBgImageURL;
    } catch (error) {
      console.error("Error uploading course background image:", error);
      return null;
    }
  };

  const hanldeAddCourse = async (e) => {
    e.preventDefault();

    try {
      if (
        courseName.trim() !== "" &&
        courseBgColor.trim() !== "" &&
        courseLogo &&
        courseBgImage &&
        courseDescription.trim() !== "" &&
        coursePrice.trim() !== ""
      ) {
        let courseLogoURL = null;
        let courseBgImageURL = null;

        if (courseLogo.type.includes("image")) {
          courseLogoURL = await hanldeCourseLogoUpload();
        } else {
          console.log("Unsupported browser");
          return;
        }

        if (courseBgImage) {
          courseBgImageURL = await handleCourseBgImageUpload();
          if (!courseBgImageURL) {
            console.error("No course background image URL obtained.");
            return;
          }
        }

        await addCourse(
          courseName,
          courseBgColor,
          courseLogoURL,
          courseBgImageURL,
          courseDescription,
          coursePrice,
          isCoursePublished,
          userData,
          selectedInstructor
        );

        setCourseName("");
        setCourseBgColor("");
        setCourseLogo(null);
        setCourseBgImage(null);
        setCourseDiscription("");
        setCoursePrice("");
        setIsCoursePublished(false);

        alert(`${courseName} course added successfully`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {userData ? (
        <>
          {userData.isAdmin === true || userData.isIntructor === true ? (
            <div className="absolute top-[50%] left-[50%] transform -translate-x-2/4 -translate-y-2/4 w-[400px] h-[400px] pt-56 overflow-y-auto drop-shadow-lg shadow-lg flex flex-col justify-center items-center gap-7 rounded-lg">
              <div className="flex flex-col justify-center items-center gap-2">
                <h3 className="text-xl font-bold">Add course</h3>
                <p>Add your own course</p>
              </div>

              <div className="flex flex-col justify-center items-center gap-6">
                <input
                  type="text"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-[350px] p-2 rounded border border-[#969696]"
                />

                <select
                  value={selectedInstructor ? selectedInstructor.id : ""}
                  onChange={hanldeInstructorChange}
                >
                  <option
                    value=""
                    className="w-[350px] p-2 rounded border border-[#969696]"
                  >
                    Select a instructor
                  </option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.instructorName}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Course Background Color"
                  value={courseBgColor}
                  onChange={(e) => setCourseBgColor(e.target.value)}
                  className="w-[350px] p-2 rounded border border-[#969696]"
                />

                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  id="course_logo"
                  onChange={(e) => setCourseLogo(e.target.files[0])}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="course_logo"
                  className="w-[350px] p-2 rounded border border-[#969696]"
                >
                  Add your course logo
                </label>

                {courseLogo && <img src={courseLogo} alt="Course logo" />}

                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  id="course_bg_image"
                  onChange={(e) => setCourseBgImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="course_bg_image"
                  className="w-[350px] p-2 rounded border border-[#969696]"
                >
                  Add your course image
                </label>

                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDiscription(e.target.value)}
                  placeholder="Course Description"
                  rows="1.5"
                  className="w-[350px] p-2 rounded border border-[#969696]"
                ></textarea>

                <input
                  type="number"
                  placeholder="Course Price"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  className="w-[350px] p-2 rounded border border-[#969696]"
                />

                <div className="flex flex-row-reverse w-full justify-between items-center">
                  <input
                    type="checkbox"
                    id="is_course_published"
                    checked={isCoursePublished}
                    onChange={(e) => setIsCoursePublished(e.target.checked)}
                  />
                  <label htmlFor="is_course_published">
                    Is Course Published
                  </label>
                </div>

                <button
                  onClick={hanldeAddCourse}
                  className="w-[120px] p-2 bg-[#020202] text-white rounded cursor-pointer active:scale-90"
                >
                  Add
                </button>
              </div>
            </div>
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

export default Admin_Add_Course;
