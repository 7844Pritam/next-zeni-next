import React, { useState } from "react";
import { faq } from "../../dummydata";
import Heading from "../common/heading/Heading";

const Faq = () => {
  const [click, setClick] = useState(null);

  const toggle = (index) => {
    setClick(click === index ? null : index);
  };

  return (
    <>
      <Heading subtitle="FAQS" title="Frequently Asked Questions" />
      <section className="faq py-10 px-4 md:px-10 lg:px-20">
        <div className="container mx-auto max-w-4xl">
          {faq.map((val, index) => (
            <div key={index} className="mb-4 border-b border-gray-300">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-100 rounded-lg text-left focus:outline-none"
                onClick={() => toggle(index)}
              >
                <h2 className="text-lg font-semibold">{val.title}</h2>
                <span>
                  {click === index ? (
                    <i className="fa fa-chevron-down"></i>
                  ) : (
                    <i className="fa fa-chevron-right"></i>
                  )}
                </span>
              </button>
              {click === index && (
                <div className="p-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-md">
                  <p className="text-gray-700">{val.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Faq;
