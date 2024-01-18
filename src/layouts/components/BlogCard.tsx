"use client";
import config from "@/config/config.json";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, plainify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import { FaHashtag, FaRegUserCircle } from "react-icons/fa/index.js";
import ImageFallback from "../helpers/ImageFallback";
import { FaRegFolder } from "react-icons/fa6";

const BlogCard = ({ data }: { data: Post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { title, image, author, categories, date } = data.frontmatter;
  const postUrl = `/${blog_folder}/${data.slug}`;

  const handleCardClick = (e: any) => {
    // Preventing the default event if it's a link or another interactive element
    if (e.target.tagName === "A" || e.target.closest("a")) {
      return;
    }
    window.location.href = postUrl;
  };

  return (
    <div
      className="bg-body dark:bg-darkmode-body  hover:bg-gray-200 dark:hover:bg-[#333333] rounded p-4 hover:cursor-pointer"
      onClick={handleCardClick}
    >
      {image && (
        <ImageFallback
          className="mb-6 w-full rounded"
          src={image}
          alt={title}
          width={445}
          height={230}
        />
      )}
      <h4 className="mb-3">{title}</h4>
      <div>
        <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
        {categories?.map((category: string, index: number) => (
          <span key={index} className="inline-block">
            {humanize(category)}
            {index !== categories.length - 1 && " ,"}
          </span>
        ))}
      </div>
      <ul className="mb-4">
        <li className="mr-4 inline-block">
          <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
          {humanize(author)}
        </li>
        {date && <li className="inline-block">{dateFormat(date)}</li>}
      </ul>
      <p className="mb-6">
        {plainify(data.content!.slice(0, Number(summary_length)))}
      </p>
    </div>
  );
};

export default BlogCard;
