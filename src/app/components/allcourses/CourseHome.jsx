import React from "react";
import Back from "../common/back/Back";
import CoursesCard from "./CoursesCard";
import OnlineCourses from "./OnlineCourses";

const CourseHome = () => {
  return (
    <>
      <div
        className="w-full h-[300px] md:h-screen bg-cover bg-center relative "
        style={{ backgroundImage: "url('/images/bgimg.jpg')" }}
      >
        {/* Dark Overlay for Better Visibility */}
        <div className="absolute mt-11 left-28 inset-0 flex justify-center items-center">
          <Back title="Discover Our Courses" />
        </div>
      </div>
      <CoursesCard />
      {/* <OnlineCourses /> */}
    </>
  );
};

export default CourseHome;
