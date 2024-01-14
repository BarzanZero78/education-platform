import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";

const Reset_Password_Page = () => {
  const { resetPassword } = useUserAuth();
  const [email, setEmail] = useState("");

  const hanldeResetPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(email);
      alert("Check your email inbox to reset your password")
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.log(errorMessage);
    }
  };

  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-7 w-[450px] h-[250px] max-sm:w-[350px] rounded-md bg-white drop-shadow-xl">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-lg font-bold">Reset Password</h1>
        <p className="font-semibold">
          Enter your email to reset your password.
        </p>
      </div>

      <form
        onSubmit={hanldeResetPassword}
        className="flex flex-col justify-center items-center gap-6"
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-[400px] max-sm:w-[300px] p-2 border border-[#CECECE] rounded"
        />

        <button className="w-[300px] max-sm:w-[250px] active:scale-95 p-3 bg-blue-700 text-white cursor-pointer mx-auto rounded-lg hover:opacity-85">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default Reset_Password_Page;
