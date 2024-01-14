import React from "react";
import BannerImg from "../assets/img/Banner.png";

const Banner = () => {
  const hanldeFinCourse = () => {
    window.location.pathname = '/courses';
  }

  return (
    <div className="w-full max-lg:h-[600px] h-[400px] px-1 mx-auto bg-[#49228C] flex flex-row-reverse flex-wrap justify-around items-center">
      <div>
        <img src={BannerImg} alt="" width='500px' height='500px' />
      </div>

      <div className="flex flex-col justify-start items-start gap-3 px-1 text-white w-[400px]">
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
          <button onClick={hanldeFinCourse} className="bg-[#F67E59] py-2 px-5 rounded-full hover:opacity-90 active:scale-95">
            Find Your Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
