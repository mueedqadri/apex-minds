export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type SectionName = (typeof links)[number]["name"];

export interface IItem {
  name: string;
  icon: string;
  text: string;
  number: string;
  postSymbol: string;
  preSymbol: string;
}

export interface ICompanies {
  title: string;
  subtitle: string;
  logos: string[];
}

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type IFeature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type ISkills = {
  list: ISkillList[];
  content: string;
  title: string;
};

type ISkillList = {
  name: string;
  icon: string;
  color: string;
  mode: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string[];
  social: ISocial[];
};

type ISocial = {
  name: string;
  icon: string;
  link: string;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
