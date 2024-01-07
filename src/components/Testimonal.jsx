import React from "react";
import Arman from "../assets/img/html_css.jpg";

const Testimonal = () => {
  return (
    <div className="pt-[100px]">
      <div className="pb-[30px]">
        <h1 className="text-2xl font-bold text-center">
          What Our Students say <br /> about us
        </h1>
      </div>
      <div className="container max-w-[600px] mx-auto overflow-y-auto flex flex-col justify-center items-center gap-7">
        <div className="flex justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center gap-3 rounded w-[280px] h-[325px] border border-gray-300 drop-shadow-md">
            <div>
              <img
                src={Arman}
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-full"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl">Arman Hadi</h1>
                <p className="text-blue-600">Web Master and Blogger</p>
              </div>

              <div className="">
                <p className="text-sm text-center text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate nisi dolores, laborum necessitatibus voluptatum
                  delectus possimus odit!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 rounded w-[280px] h-[325px] border border-gray-300 drop-shadow-md">
            <div>
              <img
                src={Arman}
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-full"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl">Arman Hadi</h1>
                <p className="text-blue-600">Web Master and Blogger</p>
              </div>

              <div className="">
                <p className="text-sm text-center text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate nisi dolores, laborum necessitatibus voluptatum
                  delectus possimus odit!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 rounded w-[280px] h-[325px] border border-gray-300 drop-shadow-md">
            <div>
              <img
                src={Arman}
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-full"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl">Arman Hadi</h1>
                <p className="text-blue-600">Web Master and Blogger</p>
              </div>

              <div className="">
                <p className="text-sm text-center text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate nisi dolores, laborum necessitatibus voluptatum
                  delectus possimus odit!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonal;
