import React from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "../../../pages/OtherScreens/home/Home";

const Back = ({ title }) => {
  const location = useLocation();

  return (
    <>
      <section className="w-full min-h-[200px] md:min-h-[300px] flex flex-col items-center  ">
        <Link
          to="/"
          className="text-white text-lg md:text-3xl lg:text-4xl font-semibold left-0"
        >
          Home / {location.pathname.split("/")[1]}
        </Link>
        <h1 className="text-white text-xl md:text-4xl lg:text-5xl font-bold mt-2">
          {title}
        </h1>
      </section>
    </>
  );
};

export default Back;
