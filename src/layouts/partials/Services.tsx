"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const services = {
    title: "Transform your business",
    subtitle:
      "Explore how our expert services can propel you to the forefront of innovation. Our offerings cover a broad spectrum of tech solutions, each tailored to meet the unique challenges and opportunities of your business.",
    list: [
      {
        title: "AI & Machine Learning Solutions",
        subtitle:
          "Do you want to unlock the full potential of AI and ML for your business? Our solutions range from predictive analytics to intelligent automation, all tailored to your unique needs.",
      },
      {
        title: "Full-Stack Development",
        subtitle:
          "Need a seamless digital experience for your users? Our full-stack development covers everything from elegant front-end design to robust back-end systems.",
      },
      {
        title: "Data Analytics & Business Intelligence",
        subtitle:
          "Want to turn data into a strategic asset? Our data analytics and business intelligence services help you derive actionable insights and make data-driven decisions.",
      },
      {
        title: "Cloud Computing & MLOps",
        subtitle:
          "Looking to scale and secure your operations in the cloud? We provide cutting-edge cloud computing and MLOps services for streamlined ML deployment and management.",
      },
    ],
  };
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getOutputRange = () => {
    return isLargeScreen ? [0, 100, 1070, 1300] : [0, 0, 0, 0];
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], getOutputRange());

  return (
    <section ref={ref} className={`section-sm bg-gradient`}>
      <div className="container">
        <div className="row ">
          <div className="relative">
            <motion.div
              style={{ y: y }}
              className={`md:absolute w-full md:w-6/12 `}
            >
              <div className="p-2">
                <h1 className={`mb-10 text-5xl`}>{services.title}</h1>
                <p className=" md:mr-10 text-xl">{services.subtitle}</p>
              </div>
            </motion.div>
            <div className="mt-5 w-full md:w-6/12 ml-auto">
              {services.list.map((item, index) => (
                <div className="p-6 bg-[#222222] rounded-xl  h-70 flex justify-center  flex-col md:p-20 mb-10 dark:bg-[#f9f9f9]">
                  <h1 className="text-4xl mb-5 text-[#fff] dark:text-dark">
                    {item.title}
                  </h1>
                  <span className="  mb-5 text-[#b8b8b8] dark:text-dark">
                    {item.subtitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
