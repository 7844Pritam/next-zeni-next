import React from "react";
import Heading from "../components/common/heading/Heading";
import { coursesCard } from "../dummydata";

const HAbout = () => {
  return (
    <>
      <section id="courses" className="bg-gray-100 py-14">
        <div className="mx-auto px-4 py-10 max-w-screen-xl">
          {/* Heading Section */}
          <Heading
            subtitle="Our Courses"
            title="Explore Our Popular Online Courses"
          />
  
          {/* Course Cards */}
          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesCard.slice(0, 3).map((val, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col"
                >
                  {/* Image Section */}
                  <div className="mb-4">
                    <img
                      src={val.cover}
                      alt={val.coursesName}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Course Details */}
                  <div className="flex-1">
                    <h1 className="text-lg font-semibold text-gray-800 mb-2">
                      {val.coursesName}
                    </h1>
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa fa-star text-yellow-400"></i>
                      ))}
                      <span className="text-sm text-gray-500">(5.0)</span>
                    </div>

                    {/* Course Teacher Section */}
                    <div>
                      {val.courTeacher.map((details, idx) => (
                        <div key={idx} className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10">
                              <img
                                src={details.dcover}
                                alt={details.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-gray-700 font-medium">
                                {details.name}
                              </h4>
                            </div>
                          </div>
                          <span className="text-gray-500 text-sm">
                            {details.totalTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and Enroll Button */}
                  <div className="mt-4 text-gray-800 text-lg font-semibold">
                    <h3>
                      {val.priceAll} / {val.pricePer}
                    </h3>
                  </div>
                  <button className="mt-4 w-full py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                    ENROLL NOW!
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <OnlineCourses /> */}
      </section>
    </>
  );
};

export default HAbout;
