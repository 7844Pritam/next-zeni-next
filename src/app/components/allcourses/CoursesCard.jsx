import React from "react";
import { coursesCard } from "../../dummydata";
import { Link } from "react-router-dom";

const CoursesCard = () => {
  return (
    <section className="py-10 px-5 md:px-10 lg:px-20 bg-gray-100">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesCard.map((val, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-5">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-full md:w-1/3">
                <img className="w-full h-auto object-cover rounded-md" src={val.cover} alt="Course Cover" />
              </div>
              <div className="mt-4 md:mt-0 md:ml-4 flex-1">
                <h1 className="text-lg font-semibold text-gray-800">{val.coursesName}</h1>
                <div className="flex items-center text-yellow-500 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa fa-star"></i>
                  ))}
                  <span className="ml-2 text-gray-600">(5.0)</span>
                </div>
                <div className="mt-3">
                  {val.courTeacher.map((details, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full" src={details.dcover} alt="Instructor" />
                      <div>
                        <h4 className="text-gray-700 font-medium">{details.name}</h4>
                        <span className="text-sm text-gray-500">{details.totalTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {val.priceAll} / {val.pricePer}
              </h3>
              <Link to="/contact">
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">ENROLL NOW!</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesCard;
