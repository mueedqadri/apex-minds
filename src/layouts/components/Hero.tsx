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
        <div className="row items-center justify-between">
          <div className={`mb:md-0 mb-6 md:col-5 `}>
            <ImageFallback
              src={features.image}
              height={480}
              width={520}
              alt={features.title}
            />
          </div>
          <div className={`md:col-7 lg:col-6 `}>
            <h2
              className="mb-4"
              dangerouslySetInnerHTML={markdownify(features.title)}
            />
            <p
              className="mb-8 text-lg"
              dangerouslySetInnerHTML={markdownify(features.content)}
            />
            <ul>
              {features.bulletpoints.map((bullet: string) => (
                <li className="relative mb-4 pl-6" key={bullet}>
                  <FaCheck className={"absolute left-0 top-1.5"} />
                  <span dangerouslySetInnerHTML={markdownify(bullet)} />
                </li>
              ))}
            </ul>
            <a className="btn btn-primary mt-5" href={features.button.link}>
              {features.button.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
