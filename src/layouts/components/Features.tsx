import React from "react";
import WordChips from "@/partials/WordChips";

interface Skills {
  bulletpoints: string[];
  title: string;
  content: string;
}

interface FeaturesProps {
  skills: Skills;
}

const Features: React.FC<FeaturesProps> = ({ skills }) => {
  return (
    <section className={`section-sm `}>
      <div className="container">
        <div className="row items-center  justify-between">
          <div className={` lg:col-6 md:order-1`}>
            <h2
              className="mb-4 text-center"
              dangerouslySetInnerHTML={{ __html: skills.title }}
            />
            <p
              className="mb-8 text-lg text-center"
              dangerouslySetInnerHTML={{ __html: skills.content }}
            />
            <div>
              <WordChips words={skills.bulletpoints} />
            </div>
          </div>
          <div className="vertical-line" /> {/* Add this line */}
          <div className={` lg:col-6 md:order-1`}>
            <h2
              className="mb-4 text-center"
              dangerouslySetInnerHTML={{ __html: skills.title }}
            />
            <p
              className="mb-8 text-lg text-center"
              dangerouslySetInnerHTML={{ __html: skills.content }}
            />
            <div>
              <WordChips words={skills.bulletpoints} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
