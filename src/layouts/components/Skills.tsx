"use client";

import React from "react";
import { motion } from "framer-motion";
import { ISkills } from "@/types";
import { markdownify } from "@/lib/utils/textConverter";
import DynamicIcon from "@/helpers/DynamicIcon";

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
  skills: ISkills;
}

const Skills: React.FC<FeatureProps> = ({ skills }) => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="row">
          <div className="mx-auto mb-8 text-center md:col-12 lg:col-12 xl:col-12">
            <h2 dangerouslySetInnerHTML={markdownify(skills.title)} />
          </div>
          <ul className="flex flex-wrap justify-center gap-5 text-lg text-gray-800">
            {skills.list.map((skill, index) => (
              <motion.li
                style={{ backgroundColor: `#${skill.color}` }}
                className={`flex flex-col items-center justify-center border rounded-xl px-6 py-2  ${
                  skill.mode == "dark" ? "text-white" : "text-black/80"
                } `}
                key={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={index}
              >
                <DynamicIcon className="text-4xl m-1" icon={skill.icon} />
                <span className="text-sm">{skill.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
