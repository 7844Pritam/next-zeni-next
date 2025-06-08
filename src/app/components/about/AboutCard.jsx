import React from "react";
import Heading from "../common/heading/Heading";
import { homeAbout } from "../../dummydata";
import Awrapper from "./Awrapper";

const AboutCard = () => {
  return (
    <>
      <section id="coursesRef" className=" bg-white py-10">
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Left Section */}
            <div className=" w-full md:w-1/2 pt-10">
              <img
                src="./images/aboutimg.jpg"
                alt="About NextZeni"
                className="w-full  h-full bg-cover  rounded shadow-md"
              />
            </div>
            {/* Right Section */}
            <div className=" w-full md:w-1/2">
              <Heading
                subtitle="Why Choose NextZeni?"
                title="A brief overview of your mission and vision:"
              />
              <p className="text-gray-600 mt-4">
                NextZeni is dedicated to equipping students and professionals
                with essential skills that open doors to success. We blend
                interactive learning with real-world applications to make your
                journey enjoyable and impactful!
              </p>
              <div className="items mt-6 space-y-6">
                {homeAbout.map((val, index) => (
                  <div
                    key={index}
                    className="item flex items-center gap-4 border-b pb-4"
                  >
                    <div className="img w-16 h-16 flex-shrink-0">
                      <img
                        src={val.cover}
                        alt={val.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="text">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {val.title}
                      </h2>
                      <p className="text-gray-600">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Awrapper /> */}
    </>
  );
};

export default AboutCard;
