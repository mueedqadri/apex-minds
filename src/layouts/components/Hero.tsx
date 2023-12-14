"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import ImageFallback from "@/helpers/ImageFallback";

import { markdownify } from "@/lib/utils/textConverter";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "next-themes";

import config from "@/config/config.json";
import { motion, useTransform, useScroll } from "framer-motion";
import {
  ActiveSectionContext,
  useActiveSectionContext,
} from "@/context/active-section-context";

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
  const context = useContext(ActiveSectionContext);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const ref = useRef<HTMLDivElement>(null);

  const { logo, logo_darkmode }: { logo: string; logo_darkmode: string } =
    config.site;

  const resolvedLogo =
    mounted && (theme === "dark" || resolvedTheme === "dark")
      ? logo_darkmode
      : logo;

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const element = document.getElementById("contact-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.1]);

  const { setSectionVisible } = useActiveSectionContext();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 },
    ); // Adjust the threshold as needed

    observer.observe(sectionRef?.current as HTMLDivElement);

    return () => observer.disconnect();
  }, [setSectionVisible]);

  return (
    <section className={`section-sm bg-gradient`}>
      <br />

      <div ref={sectionRef} className="container">
        <div className="row items-center justify-between">
          <motion.div
            style={{ scale, transformOrigin: "left" }}
            ref={ref}
            className={`mb-7 mb:md-0 mt-20 md:col-5 `}
          >
            <ImageFallback
              src={resolvedLogo}
              height={480}
              width={520}
              alt={features.title}
            />
          </motion.div>
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
            <button
              onClick={handleButtonClick}
              type="button"
              className="btn btn-primary"
            >
              {features.button.label}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
