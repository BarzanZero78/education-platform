import { collection, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase/FirebaseConfig";

const Student_Card = ({ enrollment, publishedCourses }) => {
  const handleIsCourseActive = async () => {
    if (publishedCourses && enrollment.courseData) {
      const courseDetails = enrollment.courseData.courseDetails;
      if (courseDetails) {
        const instructor = courseDetails.selectedInstructor;
        if (instructor) {
          console.log("Updating enrollment:", enrollment.id);

          const enrollmentRef = collection(
            db,
            "courses",
            publishedCourses.id,
            "enrollments",
            enrollment.id
          );

          // Check if enrollment.courseData.isCourseActive exists before toggling
          const updatedData = {
            isCourseActive: !enrollment.courseData.isCourseActive,
          };

          try {
            await updateDoc(enrollmentRef, updatedData);
            console.log("Enrollment updated successfully");
          } catch (error) {
            console.log("Error updating enrollment:", error.message);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-xl w-[400px] h-[260px] gap-2 px-4 rounded-md">
      <div className="flex flex-row-reverse w-full justify-between items-center px-2 border-b border-b-gray-300">
        <div className="flex flex-col justify-end items-end p-1">
          <div>
            <img
              src={enrollment.courseData.courseDetails.courseLogoURL}
              className="w-[100px] h-[150px] rounded-md object-contain"
              alt=""
            />
          </div>

          <div>
            <p className="font-semibold">
              {enrollment.courseData.courseDetails.coursePrice}$
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-lg font-bold">
            {enrollment.courseData.courseDetails.courseName}
          </h3>
          <p className="text-base text-gray-500 truncate w-[200px]">
            {enrollment.courseData.courseDetails.courseDescription}
          </p>

          <div className="flex justify-start items-center gap-1 pt-2">
            <img
              src={
                enrollment.courseData.courseDetails.selectedInstructor
                  .instructorImage
              }
              alt=""
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p className="text-sm font-semibold">
              {
                enrollment.courseData.courseDetails.selectedInstructor
                  .instructorName
              }
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-1 w-full">
        <div className="flex justify-between items-center px-3 w-full">
          <div className="flex justify-center items-center gap-1">
            {enrollment.courseData.userData.userImage ? (
              <img
                src={enrollment.courseData.userData.userImage}
                className="flex justify-center items-center w-[30px] h-[30px] rounded-full"
                alt=""
              />
            ) : (
              <p className="text-xl bg-[#dfdada] flex justify-center items-center w-[30px] h-[30px] rounded-full">
                {enrollment.courseData.userData.userName.charAt(0)}
              </p>
            )}
            <p className="text-base font-semibold">
              {enrollment.courseData.userData.userName}
            </p>
          </div>

          <div>
            <div className="text-base font-semibold">
              {enrollment.courseData.devicePlatform === "Windows" ||
              enrollment.courseData.devicePlatform === "MacOS" ? (
                <div className="flex flex-row-reverse justify-center items-center">
                  <p>{enrollment.courseData.devicePlatform}</p>
                  <span className="material-icons">computer</span>
                </div>
              ) : (
                <></>
              )}

              {enrollment.courseData.devicePlatform === "iOS" ? (
                <div className="flex flex-row-reverse justify-center items-center">
                  <p>{enrollment.courseData.devicePlatform}</p>
                  <span className="material-icons">phone_iphone</span>
                </div>
              ) : (
                <></>
              )}

              {enrollment.courseData.devicePlatform === "Android" ? (
                <div className="flex flex-row-reverse justify-center items-center">
                  <p>{enrollment.courseData.devicePlatform}</p>
                  <span className="material-icons">phone_android</span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full px-5">
          <p>Is Course Active</p>
          <input
            type="checkbox"
            checked={enrollment.courseData.isCourseActive || false}
            onChange={handleIsCourseActive}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Student_Card;
