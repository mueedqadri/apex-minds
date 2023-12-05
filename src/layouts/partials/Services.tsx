"use client";
import React, { useState, useEffect } from "react";

const Services: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    // Adjust the multiplier based on the number of 'h-screen' divs
    const threshold = 2000;

    if (window.scrollY >= threshold || window.scrollY <= 200) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`section-sm bg-gradient`}>
      <div className="container">
        <div className="row items-center justify-between">
          <div className="relative">
            <div
              className={`${
                isFixed ? "md:fixed" : ""
              } w-full md:w-7/12 min-h-screen `}
            >
              <h1
                className={` ${
                  isFixed ? "md:fixed" : ""
                } absolute bottom-0 left-0 p-20  text-8xl`}
              >
                Benny
                <br />
                The Pup
              </h1>
            </div>
            <div className="w-full md:w-5/12 ml-auto">
              <div className="bg-red-200 h-screen flex justify-center items-center flex-col p-10">
                <h2 className="text-4xl mb-5">Meet Benny</h2>
                <p className="mb-5">I was born 20 May 2020</p>
              </div>
              <div className="bg-red-50 h-screen flex justify-center items-center flex-col p-10">
                <h2 className="text-4xl mb-5">I love food</h2>
                <p className="mb-5">Bones, Pallets, and more!</p>
              </div>
              <div className="bg-red-200 h-screen flex justify-center items-center flex-col p-10">
                <h2 className="text-4xl mb-5">I love my humans</h2>
                <p className="mb-5">
                  My humans are super special to me, and I love them
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
