import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const currentNavItem = (pathname) => {
    const currentPath = location.pathname === pathname;
    return currentPath;
  };

  return (
    <div className="sticky top-0 left-0 w-full h-screen flex flex-col p-2 gap-14">
      <div>
        <h3 className="text-xl font-bold">GLearner</h3>
        <p>www.glearner.web.app</p>
      </div>

      <div className="flex flex-col justify-start items-start gap-8">
        <Link
          to="/admin_panel"
          className={`flex justify-start items-center gap-1 hover:bg-[#c5c1c1] w-[300px] p-1.5 rounded active:scale-95 border-b border-b-gray-300 ${
            currentNavItem("/admin_panel") ? "font-bold" : ""
          }`}
        >
          <span className="material-icons">home</span>
          Home
        </Link>

        <Link
          to="/admin_panel/students"
          className={`flex justify-start items-center gap-1 hover:bg-[#c5c1c1] w-[300px] p-1.5 rounded active:scale-95 border-b border-b-gray-300 ${
            currentNavItem("/admin_panel/students") ? "font-bold" : ""
          }`}
        >
          <span className="material-icons">groups</span>
          Students
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
