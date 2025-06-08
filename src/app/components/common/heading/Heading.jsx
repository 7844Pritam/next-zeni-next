import React from "react";

const Heading = ({ subtitle, title }) => (
  <div className="text-center px-4">
    {/* Subtitle */}
    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-600">
      {subtitle}
    </h2>

    {/* Title */}
    <h1 className="text-2xl sm:text-2xl  font-bold text-gray-800 mt-2 sm:mt-4 leading-tight max-w-4xl mx-auto">
      {title}
    </h1>
  </div>
);

export default Heading;
