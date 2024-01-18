"use client";
import { useActiveSectionContext } from "@/context/active-section-context";
import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegClock, FaRegFolder } from "react-icons/fa6";

const BlogImage = ({
  image,
  title,
  author,
  date,
  categories,
}: {
  image: string | undefined;
  title: string;
  author: string;
  date: string | undefined;
  categories: string[];
}) => {
  const { theme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(loadTimer);
  }, []);

  const { setSectionVisible } = useActiveSectionContext();

  useEffect(() => {
    setSectionVisible(false);
  }, [setSectionVisible]);

  const lightGrdient =
    "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))";
  const darkGrdient =
    "linear-gradient(rgba(30, 30, 30, 0), rgba(30, 30, 30, 1))";
  const gradient =
    mounted && (theme === "dark" || resolvedTheme === "dark")
      ? darkGrdient
      : lightGrdient;

  return (
    <>
      {image && (
        <div
          className=" h-96 bg-cover bg-center bg-no-repeat relative rounded-xl  flex items-end"
          style={{
            backgroundImage: `${gradient}, url(${image})`,
          }}
        >
          <div className="mt-20 m-4">
            <h1
              dangerouslySetInnerHTML={markdownify(title)}
              className="h2 mb-4"
            />
            <ul className="mb-4">
              <li className="mr-4 inline-block">
                <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
                {categories?.map((category: string, index: number) => (
                  <Link
                    key={category}
                    href={`/categories/${slugify(category)}`}
                  >
                    {humanize(category)}
                    {index !== categories.length - 1 && ", "}
                  </Link>
                ))}
              </li>
              <li className="mr-4 inline-block">
                <FaRegUserCircle className={"-mt-1 mr-2 inline-block"} />
                {humanize(author)}
              </li>
              {date && (
                <li className="mr-4 inline-block">
                  <FaRegClock className="-mt-1 mr-2 inline-block" />
                  {dateFormat(date)}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogImage;
