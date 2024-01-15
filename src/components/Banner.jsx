import React from "react";
import BannerImg from "../assets/img/Banner.png";
import "./Shape.css";

const Banner = () => {
  const hanldeFinCourse = () => {
    window.location.pathname = "/courses";
  };

  return (
    <div className="relative w-full max-lg:h-[800px] h-[550px] px-1 mx-auto bg-[#49228C] flex flex-row-reverse flex-wrap justify-around items-center">
      <div>
        <img src={BannerImg} alt="" width="500px" height="500px" />
      </div>

      <div className="absolute bottom-0 left-0 w-full custom-shape-divider-bottom-1705293755">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="flex flex-col justify-start items-start gap-3 px-1 pb-10 text-white w-[400px]">
        <h1 className="text-2xl font-bold">
          Learn Web Development
          <br />
          through Live Online
          <br />
          Classrooms
        </h1>

        <p className="text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam in
          aliquid possimus aliquam.
        </p>

        <div className="pt-3">
          <button
            onClick={hanldeFinCourse}
            className="bg-[#F67E59] py-2 px-5 rounded-full hover:opacity-90 active:scale-95"
          >
            Find Your Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
