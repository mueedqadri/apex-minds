"use client";

import React from "react";
import { useSectionInView } from "../../hooks/useSectionInView";
import { motion } from "framer-motion";
import { IFeature } from "@/types";
import { markdownify } from "@/lib/utils/textConverter";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

interface FeatureProps {
  skills: IFeature;
}

const Skills: React.FC<FeatureProps> = ({ skills }) => {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <div className="mx-auto mb-12 text-center md:col-12 lg:col-12 xl:col-12">
        <h2 dangerouslySetInnerHTML={markdownify(skills.title)} />
        <p
          className="mb-8 text-lg"
          dangerouslySetInnerHTML={markdownify(skills.content)}
        />
      </div>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skills.bulletpoints.map((skill, index) => (
          <motion.li
            className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
