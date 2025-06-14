"use client"

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Back from "../components/common/back/Back";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_dmsch3b", "template_mlny9t8", form.current, {
        publicKey: "QAJJWF5gOlV6ZCU-M",
      })
      .then(
        (result) => {
          console.log(result.text);
          alert("Message Sent Successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message. Please try again.");
        }
      );
    e.target.reset();
  };

  const map =
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3559.1451950395885!2d81.01597737543788!3d26.86712767667439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUyJzAxLjciTiA4McKwMDEnMDYuOCJF!5e0!3m2!1sen!2sin!4v1738667917368!5m2!1sen!2sin";

  return (
    <>
      {/* Background Image Section */}
      <div
        className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center relative" id="contact"
        style={{ backgroundImage: "url('/images/bgimg.jpg')" }}
      >
        {/* Dark Overlay for Better Visibility */}
        <div className="absolute inset-0 flex justify-center items-center">
          <Back title="Contact Us" />
        </div>
      </div>
      <section className="py-6">
        <div className="container shadow flex flex-col md:flex-row gap-8 px-10">
          <div className="w-full md:w-1/2">
            <iframe
              src={map}
              className="w-full h-64 md:h-[550px] rounded-lg"
              style={{ border: "2px solid #ccc" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold text-black">Contact us</h1>
            <p className="text-gray-600 mb-4">
              We're open for any suggestion or just to have a chat
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="box bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold">ADDRESS:</h4>
                <p>
                  4/37 Vibhav Khand, Gomtinagar, Lucknow, Uttar Pradesh, 226010
                </p>
              </div>
              <div className="box bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold">EMAIL:</h4>
                <p>yournextzeni@gmail.com</p>
              </div>
              <div className="box bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold">PHONE:</h4>
                <p>+91 6307749532</p>
              </div>
            </div>

            <form ref={form} onSubmit={sendEmail} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="from_name"
                  placeholder="Name"
                  required
                  className="p-2 border rounded w-full"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="p-2 border rounded w-full"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="p-2 border rounded w-full"
              />
              <textarea
                name="message"
                cols="30"
                rows="5"
                placeholder="Create a message here..."
                required
                className="p-2 border rounded w-full"
              ></textarea>
              <button
                type="submit"
                className="primary-btn w-full md:w-auto px-6 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition-all"
              >
                SEND MESSAGE
              </button>
            </form>

            <h3 className="mt-6 text-xl font-semibold">Follow us here</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61571258289396"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f text-xl text-blue-600"></i>
              </a>
              <a
                href="https://www.instagram.com/nextzeni/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-xl text-pink-600"></i>
              </a>
              <a
                href="https://x.com/next_zeni"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter text-xl text-blue-400"></i>
              </a>
              <a
                href="https://www.youtube.com/@NextZeni"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube text-xl text-red-600"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
