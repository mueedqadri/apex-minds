"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ActiveSectionContext } from "@/context/active-section-context";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    title: string;
    description?: string;
    services: {
      title: string;
      subtitle: string;
    }[];
  };
}

const Services = ({ data }: { data: PageData }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isLargeScreen, setIsLargeScreen] = useState(false);
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
                <h1 className={`mb-10 text-5xl`}>{data.frontmatter.title}</h1>
                <p className=" md:mr-10 text-xl">
                  {data.frontmatter.description}
                </p>
              </div>
            </motion.div>
            <div className="mt-5 w-full md:w-6/12 ml-auto">
              {data.frontmatter.services.map((item: any, index: any) => (
                <div
                  key={index}
                  className="p-6 bg-[#222222] rounded-xl  h-70 flex justify-center  flex-col md:p-20 mb-10 dark:bg-[#f9f9f9]"
                >
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
