import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Developers from "@/partials/Developers";
import { Feature, ICompanies, IItem } from "@/types";
import NumberElements from "../layouts/components/NumberElements";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Companies from "@/layouts/partials/Companies";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    features,
    skills,
    numbers,
    companies,
  }: {
    features: Feature;
    skills: Feature;
    numbers: IItem[];
    companies: ICompanies;
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <Hero features={features} />
      <NumberElements numbers={numbers} />
      <Companies companies={companies} />
      <Features skills={skills} />
      <Developers data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
