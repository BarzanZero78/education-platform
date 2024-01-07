import React from "react";
import { useMainContext } from "../../context/MainContext";
import Course_Card from "./Course_Card";

const Admin_Navbar = () => {
  const { courses } = useMainContext();

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="relative top-0 right-0 w-full h-[45px] shadow-lg flex justify-between items-center p-1">
        <div>
          <p>Courses</p>
        </div>

        <div className="flex justify-center items-center gap-3">
          <a
            href="/admin_panel/admin_add_course"
            className="flex justify-center items-center gap-0.5 hover:bg-[#c5c1c1] rounded p-0.5"
          >
            <span className="material-icons">add</span>
            ADD COURSE
          </a>

          <a
            href="/admin_panel/admin_add_trusted_company"
            className="flex justify-center items-center gap-0.5 hover:bg-[#c5c1c1] rounded p-0.5"
          >
            <span className="material-icons">add</span>
            ADD TRUSTED COMPANY
          </a>

          <a
            href="/admin_panel/add_intstructor"
            className="flex justify-center items-center gap-0.5 hover:bg-[#c5c1c1] rounded p-0.5"
          >
            <span className="material-icons">add</span>
            ADD INSTRUCTOR
          </a>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {courses.map((course) => (
          <Course_Card key={course.id} course={course} />
        ))}
      </div>

      <br />
    </div>
  );
};

export default Admin_Navbar;
