import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import WordChips from "@/partials/WordChips";
import { Button, Feature } from "@/types";
import { FaCheck } from "react-icons/fa/index.js";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    features,
    skills,
  }: {
    features: Feature;
    skills: Feature;
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <section className={`section-sm ${"bg-gradient"}`}>
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

      <section className={`section-sm `}>
        <div className="container">
          <div className="row items-center justify-between">
            <div className={`mb:md-0 mb-6 md:col-5 md:order-2`}>
              <WordChips words={skills.bulletpoints} />
            </div>
            <div className={`md:col-7 lg:col-6 md:order-1`}>
              <h2
                className="mb-4"
                dangerouslySetInnerHTML={markdownify(skills.title)}
              />
              <p
                className="mb-8 text-lg"
                dangerouslySetInnerHTML={markdownify(skills.content)}
              />
            </div>
          </div>
        </div>
      </section>
      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
