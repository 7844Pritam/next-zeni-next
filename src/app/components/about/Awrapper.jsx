import React from "react";
import { awrapper } from "../../dummydata";
// import { awrapper } from "../../dummydata";

const Awrapper = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {awrapper.map((val, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              {/* Image Section */}
              <div className="w-16 h-16">
                <img
                  src={val.cover}
                  alt={val.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="text-center mt-4">
                <h1 className="text-xl font-bold text-gray-800">{val.data}</h1>
                <h3 className="text-gray-600 text-sm">{val.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awrapper;
