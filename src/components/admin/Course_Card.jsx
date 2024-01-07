import React from 'react'

const Course_Card = ({ course }) => {
  return (
    <a href={`/admin_panel/course/${course.courseName}`} className='flex flex-col justify-start items-start w-[200px] h-[250px] shadow-md rounded gap-5 hover:bg-[#FBFBFB] active:scale-95'>
        <img src={course.courseBgImageURL} alt="" className='w-full h-[170px] object-cover' />

      <div className='px-2'>
        <p>{course.courseName}</p>
      </div>
    </a>
  )
}

export default Course_Card
