import React, { useState } from "react";
import { useMainContext } from "../context/MainContext";

const Search = ({ showSearchBar, setShowSearchBar }) => {
  const [search, setSearch] = useState("");
  const { courses } = useMainContext();

  const hanldeSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchCourses = courses.filter(
    (course) =>
      course.isCoursePublished &&
      course.courseName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="absolute top-[10%] right-[0.5%] bg-white shadow-md w-[400px] h-[150px] rounded-md overflow-y-auto">
      <div className="sticky top-0 left-0 flex justify-center items-center gap-1 p-2 bg-white">
        <input
          type="text"
          placeholder="Search For Courses..."
          className="border rounded-md w-[370px] p-1"
          value={search}
          onChange={hanldeSearch}
        />
        <button
          onClick={() => setShowSearchBar(!showSearchBar)}
          className="hover:text-[#ff0000] rounded-full active:scale-95"
        >
          <span className="material-icons">close</span>
        </button>
      </div>

      {searchCourses.map((searchCourse) => (
        <a
          href={`/course/${searchCourse.courseName}`}
          key={searchCourse.id}
          className="flex justify-between items-center cursor-pointer p-2 hover:bg-[#dfdada] w-[97%] mx-auto rounded-md active:scale-95"
        >
          <div>
            <img
              src={searchCourse.courseLogoURL}
              alt=""
              className="w-[30px] h-[30px] object-cover"
            />
          </div>

          <div>
            <p>{searchCourse.courseName}</p>
          </div>

          <div>
            <p>{searchCourse.coursePrice}$</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Search;