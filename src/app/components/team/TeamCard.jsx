import React from "react";
import { team } from "../../dummydata";

const TeamCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {team.map((val, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105"
        >
          <div className="relative w-full h-60">
            <img src={val.cover} alt="" className="w-full h-full bg-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex gap-4">
                <i className="fab fa-facebook-f text-white text-xl cursor-pointer"></i>
                <i className="fab fa-twitter text-white text-xl cursor-pointer"></i>
                <i className="fab fa-instagram text-white text-xl cursor-pointer"></i>
                <i className="fab fa-tiktok text-white text-xl cursor-pointer"></i>
              </div>
            </div>
          </div>
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold">{val.name}</h2>
            <p className="text-gray-600">{val.work}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;
