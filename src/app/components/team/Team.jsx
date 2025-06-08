import React from "react";
import Back from "../common/back/Back";
import TeamCard from "./TeamCard";
// import "./team.css";
import Awrapper from "../about/Awrapper";
// import "../about/about.css"

const Team = () => {
  return (
    <>
      <div
        className="w-full h-[300px] md:h-screen bg-cover bg-center relative "
        style={{ backgroundImage: "url('/images/bgimg.jpg')" }}
      >
        {/* Dark Overlay for Better Visibility */}
        <div className="absolute mt-11 left-28 inset-0 flex justify-center items-center">
          <Back title="Meet Our Team!" />
        </div>
      </div>
      <section className="team padding">
        <div className="container grid">
          <TeamCard />
        </div>
      </section>
      <Awrapper />
    </>
  );
};

export default Team;
