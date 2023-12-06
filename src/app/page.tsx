import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Developers from "@/partials/Developers";
import { IFeature, ICompanies, IItem, ISkills } from "@/types";
import NumberElements from "../layouts/components/NumberElements";
import Hero from "@/components/Hero";
import Companies from "@/layouts/partials/Companies";
import Services from "@/partials/Services";
import Skills from "@/components/Skills";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const developers = getListPage("sections/developers.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    features,
    skills,
    numbers,
    companies,
  }: {
    features: IFeature;
    skills: ISkills;
    numbers: IItem[];
    companies: ICompanies;
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <Hero features={features} />
      {/* <Services /> */}
      <NumberElements numbers={numbers} />
      <Companies companies={companies} />
      <Skills skills={skills} />
      <Developers data={developers} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
