import React, { useEffect, useState } from "react";
import { useMainContext } from "../../context/MainContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";
import { useUserAuth } from "../../context/UserAuthContext";

const Admin_Add_Trusted_Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyImage, setCompanyImage] = useState(null);
  const { addTrustedCompanies } = useMainContext();
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState(null);

  const hanldeUploadImage = async () => {
    if(!companyImage) return null;

    const storageRef = ref(storage, `trusted_companies/${companyImage.name}`);
    await uploadBytes(storageRef, companyImage);
    const mediaURL = await getDownloadURL(storageRef);
    return mediaURL;
  }

  const hanldeAddTrustedCompany = async (e) => {
    try {
        if(companyName.trim() != '' && companyImage) {
            let mediaURL = null;
            e.preventDefault();

            if(companyImage.type.includes("image")) {
                mediaURL = await hanldeUploadImage();
            } else {
                console.log("Unsupported media type");
                return;
            }

            await addTrustedCompanies(companyName, mediaURL);
            setCompanyName("");
            setCompanyImage(null);
            alert("The company added successfully");
        }

    } catch(error) {
        console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  }

  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[350px] drop-shadow-lg flex flex-col justify-center items-center gap-5">
      {userData ? (
        <form
        onSubmit={hanldeAddTrustedCompany}
      >
        <div>
          <h1>Add trusted company</h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-[300px] p-3"
          />
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => setCompanyImage(e.target.files[0])}
            className="w-[300px] p-3"
          />

          <button className="bg-[#111] text-white rounded w-[150px] p-2">Add</button>
        </div>
      </form>
      ) : <></>}
    </div>
  );
};

export default Admin_Add_Trusted_Company;
