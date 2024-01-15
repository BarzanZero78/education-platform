import React from "react";
import { useMainContext } from "../context/MainContext";

const Trusted = () => {
  const { trustedComapnies } = useMainContext();

  return (
    <div className="flex flex-col justify-center items-center gap-5 pt-10 bg-[#FBFBFB] w-full">
      <div>
        <h1 className="text-xl font-bold">Trusted By Awesome Partners</h1>
      </div>

      <div className="flex justify-center items-center gap-10 overflow-x-auto p-3">
        {trustedComapnies.map((trustedCompany) => (
          <div key={trustedCompany.id}>
            <div className="flex justify-center items-center gap-1 hover:shadow-2xl  rounded-lg cursor-pointer p-2 bg-transparent">
              <img
                src={trustedCompany.companyImage}
                alt=""
                width="30px"
                height="30px"
              />
              <p>{trustedCompany.companyName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trusted;
