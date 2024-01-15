import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useMainContext } from "../context/MainContext";
import "./Spinner.css";

const Contact_Page = () => {
  const { getUserData } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [contractorName, setContractorName] = useState("");
  const [contractorEmail, setContractorEmail] = useState("");
  const [contractorMessage, setContractorMessage] = useState("");
  const { contactForm } = useMainContext();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        contractorName != "" &&
        contractorEmail != "" &&
        contractorMessage != ""
      ) {
        const contactData = {
          userData,
          contractorName,
          contractorEmail,
          contractorMessage,
        };

        await contactForm(contactData);

        setContractorName("");
        setContractorEmail("");
        setContractorMessage("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {userData ? (
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[300px] bg-white shadow-xl drop-shadow-xl rounded-lg flex flex-col justify-center items-center">
          <form
            onSubmit={hanldeSubmit}
            className="flex flex-col justify-center items-center gap-3 p-4"
          >
            <div className="">
              <h3 className="text-lg font-bold">Contact US</h3>
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
              <input
                type="text"
                placeholder="Name"
                value={contractorName}
                onChange={(e) => setContractorName(e.target.value)}
                required
                className="w-[300px] border border-gray-300 focus:outline-none p-2 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={contractorEmail}
                onChange={(e) => setContractorEmail(e.target.value)}
                required
                className="w-[300px] border border-gray-300 focus:outline-none p-2 rounded-md"
              />
              <textarea
                placeholder="Message"
                value={contractorMessage}
                onChange={(e) => setContractorMessage(e.target.value)}
                required
                className="w-[300px] border border-gray-300 focus:outline-none p-2 rounded-md"
              ></textarea>

              <button className="w-[300px] active:scale-95 p-2 bg-blue-700 text-white cursor-pointer mx-auto rounded-lg hover:opacity-85">
                Submit
              </button>
            </div>
          </form>
          
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Contact_Page;
