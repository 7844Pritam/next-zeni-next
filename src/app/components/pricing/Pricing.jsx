import React from "react";
import Back from "../common/back/Back";
import PriceCard from "./PriceCard";
import Faq from "./Faq";

const Pricing = () => {
  return (
    <>
      <div
        className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/bgimg.jpg')" }}
      >
        {/* Dark Overlay for Better Visibility */}
        <div className="absolute inset-0 flex justify-center items-center left-32 top-9 md:left-60">
          <Back title="Choose The Right Plan" />
        </div>
      </div>
      {/* <Back title='' /> */}
      <section className="price padding">
        <div className="container grid">
          <PriceCard />
        </div>
      </section>
      <Faq />
    </>
  );
};

export default Pricing;
