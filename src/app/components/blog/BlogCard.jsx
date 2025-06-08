import React from "react";
import { blog } from "../../dummydata";

const BlogCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {blog.map((val, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-xl overflow-hidden"
        >
          <div className="w-full h-56 md:h-64 lg:h-72">
            <img
              src={val.cover}
              alt={val.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <i className="fa fa-user" aria-hidden="true"></i>
                {val.type}
              </span>
              <span className="flex items-center gap-1">
                <i className="fa fa-calendar-alt" aria-hidden="true"></i>
                {val.date}
              </span>
              <span className="flex items-center gap-1">
                <i className="fa fa-comments" aria-hidden="true"></i>
                {val.com}
              </span>
            </div>
            <h1 className="text-lg font-semibold mb-2">{val.title}</h1>
            <p className="text-gray-600 text-sm md:text-base">{val.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
