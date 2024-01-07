import React from "react";

const Sidebar = () => {
  return (
    <div className="relative top-0 left-0 w-full h-screen flex flex-col p-2 gap-14">
      <div>
        <h3 className="text-xl font-bold">GLearner</h3>
        <p>www.glearner.web.app</p>
      </div>

      <div>
        <a href="" className="flex justify-start items-center gap-1 hover:bg-[#c5c1c1] w-[300px] p-1 rounded">
          <span className="material-icons">groups</span>
          Users
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
