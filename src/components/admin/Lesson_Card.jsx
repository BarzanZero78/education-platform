import React from "react";
import { Link } from "react-router-dom";

const Lesson_Card = ({ course, lesson }) => {
  return (
    <Link
      to={`/admin_panel/course/${course.courseName}/lesson/${lesson.lessonName}`}
      className="flex justify-between items-center border w-[300px] h-[150px] rounded-md cursor-pointer hover:shadow-md active:scale-95"
    >
      <p className="px-2">{lesson.lessonName}</p>
      <img
        src={lesson.lessonImage}
        alt=""
        className="w-[150px] h-[150px] object-cover"
      />
    </Link>
  );
};

export default Lesson_Card;
