import React from "react";
import Back from "../common/back/Back";
import AboutCard from "./AboutCard";

const About = () => {
  return (
    <>
      {/* Background Image Section */}
      <div
        className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/bgimg.jpg')" }}
      >
        {/* Dark Overlay for Better Visibility */}
        <div className="absolute inset-0 flex justify-center items-center left-10 top-10">
          <Back title="About Us" />
        </div>
      </div>

      {/* About Card Section */}
      <AboutCard />
    </>
  );
};

export default About;
