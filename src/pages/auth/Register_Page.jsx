import React, { useState } from "react";
import Logo from "../../assets/img/Logo.png";
import GoogleImg from "../../assets/img/google.png";
import FacebookImg from "../../assets/img/facebook.png";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const Register_Page = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, googleSignIn, facebookSignIn } = useUserAuth();

  const handleRegisterUser = async () => {
    try {
      await registerUser(userName, email, password);

      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-7 w-[450px] h-[570px] max-sm:w-[350px] rounded-md bg-white drop-shadow-xl">
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="flex flex-col justify-center items-center">
          <img src={Logo} alt="" width="180px" height="180px" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-lg font-bold">Register</h1>
          <p className="text-base font-semibold">Welcome to our website!</p>
          <p className="text-base font-semibold">
            To continue please create an account
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        {/* Login with Email & Password */}
        <div className="flex flex-col justify-center items-center gap-5">
          <input
            type="text"
            placeholder="Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-[400px] max-sm:w-[300px] p-2 border border-[#CECECE] rounded"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px] p-2 max-sm:w-[300px] border border-[#CECECE] rounded"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] p-2 max-sm:w-[300px] border border-[#CECECE] rounded"
          />

          <button
            onClick={handleRegisterUser}
            className="w-[300px] max-sm:w-[250px] active:scale-95 p-3 bg-blue-700 text-white cursor-pointer mx-auto rounded-lg hover:opacity-85"
          >
            Register
          </button>
          <Link to="/login" className="text-blue-600 active:scale-95">
            Already have an account?
          </Link>
        </div>

        {/* Sign in with social medias */}
        <div className="pt-3">
          <div className="flex justify-center items-center gap-2">
            <div className="w-[80px] border-t-2 border-[#cecece]"></div>
            <div>or</div>
            <div className="w-[80px] border-t-2 border-[#cecece]"></div>
          </div>

          <div className="flex justify-center items-center gap-4 p-5">
            <button
              onClick={hanldeGoogleSignIn}
              className="border border-[#CECECE] rounded p-1 active:scale-95"
            >
              <img src={GoogleImg} alt="" className="w-6 h-6" />
            </button>

            <button
              onClick={hanldeFacebookSignIn}
              className="border border-[#CECECE] rounded p-1 active:scale-95"
            >
              <img src={FacebookImg} alt="" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register_Page;
