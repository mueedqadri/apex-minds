import React from "react";
import ImageFallback from "@/helpers/ImageFallback";

import { markdownify } from "@/lib/utils/textConverter";
import { FaCheck } from "react-icons/fa";

interface HeroProps {
  features: {
    image: string;
    title: string;
    content: string;
    bulletpoints: string[];
    button: {
      link: string;
      label: string;
    };
  };
}

const Hero: React.FC<HeroProps> = ({ features }) => {
  return (
    <section className={`section-sm bg-gradient`}>
      <div className="container">
        <div className="">
          <h1 className="absolute bottom-0 left-0 p-20 text-dark text-8xl">
            Benny
            <br />
            The Pup
          </h1>
          <div className={`mb:md-0 mb-6 md:col-5 `}>
            <ImageFallback
              src={features.image}
              height={480}
              width={520}
              alt={features.title}
            />
          </div>
          <div className="w-1/2 overflow-auto">
            {" "}
            {/* Scrollable Column */}
            {/* Generate multiple rows */}
            {Array.from({ length: 20 }, (_, index) => (
              <div key={index} className="p-4 border-b">
                Row {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
