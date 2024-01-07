import React, { useState } from "react";
import { useMainContext } from "../../context/MainContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";

const Admin_Add_Instructor = () => {
  const { addInstructor } = useMainContext();
  const [instructorName, setInstructorName] = useState("");
  const [instructorWork, setInstructorWork] = useState("");
  const [instructorImage, setInstructorImage] = useState(null);

  const hanldeUploadImage = async () => {
    try {
      if (!instructorImage) return null;

      const storageRef = ref(
        storage,
        `instructor_images/${instructorImage.name}`
      );
      await uploadBytes(storageRef, instructorImage);
      const instructorImageURL = await getDownloadURL(storageRef);
      return instructorImageURL;
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
      return null;
    }
  };

  const hanldeAddInstructor = async (e) => {
    e.preventDefault();

    try {
      if (instructorImage != "" && instructorWork != '' && instructorImage) {
        let instructorImageURL = null;

        if (instructorImage.type.includes("image")) {
          instructorImageURL = await hanldeUploadImage();
        }

        const instructorData = {
          instructorName: instructorName,
          instructorWork: instructorWork,
          instructorImage: instructorImageURL,
        };

        await addInstructor(instructorData);
        alert(`${instructorName} instructor added successfully`);
      }
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-2/4 -translate-y-2/4 w-[400px] h-[300px] shadow-md rounded-md flex flex-col justify-center items-center gap-5">
      <div>
        <h3 className="text-xl font-bold">Add Instructor</h3>
      </div>

      <form
        onSubmit={hanldeAddInstructor}
        className="flex flex-col justify-center items-center gap-5"
      >
        <input
          type="text"
          placeholder="Instructor Name"
          value={instructorName}
          onChange={(e) => setInstructorName(e.target.value)}
          className="w-[350px] border border-[#c7c5c5] rounded p-2"
        />

        <input
          type="text"
          placeholder="Instructor Work"
          value={instructorWork}
          onChange={(e) => setInstructorWork(e.target.value)}
          className="w-[350px] border border-[#c7c5c5] rounded p-2"
        />

        <input
          type="file"
          id="instructor_image"
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => setInstructorImage(e.target.files[0])}
          style={{ display: "none" }}
        />
        <label
          htmlFor="instructor_image"
          className="w-[350px] border border-[#c7c5c5] rounded p-2"
        >
          Add Instructor Image
        </label>

        <button className="w-[120px] p-2 bg-[#020202] text-white rounded cursor-pointer active:scale-90">
          Add
        </button>
      </form>
    </div>
  );
};

export default Admin_Add_Instructor;
