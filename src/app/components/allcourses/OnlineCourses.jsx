import React from "react";
import { online } from "../../dummydata";
import Heading from "../common/heading/Heading";

const OnlineCourses = () => {
  return (
    <section className="online py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Heading subtitle="COURSES" title="Browse Our Online Courses" />
        <div className="content grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
          {online.map((val, index) => (
            <div
              key={index}
              className="box bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center w-full"
            >
              <div className="img w-auto mb-4">
                <img
                  src={val.cover}
                  alt={val.courseName}
                  className="w-full h-32 sm:h-44 md:h-52 lg:h-52 bg-cover rounded-lg"
                />
              </div>
              <h1 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                {val.courseName}
              </h1>
              <span className="text-xs sm:text-sm text-primary">
                {val.course}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnlineCourses;
