import React from "react";
import { price } from "../../dummydata";
import { Link } from "react-router-dom";

const PriceCard = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {price.map((val, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition transform hover:-translate-y-2 w-full"
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              {val.name}
            </h4>
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              <span className="text-lg">Rs</span> {val.price}
            </h1>
            <p className="text-gray-600 mb-6">{val.desc}</p>
            <Link to="/contact">
              <button className="border-2 border-blue-600 text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition w-full">
                GET STARTED
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;
