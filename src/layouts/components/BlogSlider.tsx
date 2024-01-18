"use client";

import { markdownify, slugify } from "@/lib/utils/textConverter";
import { Post, PostSlider } from "@/types";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";
import SeoMeta from "@/partials/SeoMeta";
import { useRef, useState } from "react";
import { useTheme } from "next-themes";

const BlogSlider = ({ data }: { data: PostSlider }) => {
  const swiperRef = useRef(null);
  const setSwiperRef = (swiper: any) => {
    swiperRef.current = swiper;
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleTagClick = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((t) => t !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const filteredPosts = data.posts.filter(
    (post) =>
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        post.frontmatter.categories.map(slugify).includes(category),
      ),
  );

  const { title, meta_title, description, image } = data.postIndex.frontmatter;
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section -mt-10">
        <div className="container">
          <div className="row">
            <div className="mx-auto  text-center md:col-10 lg:col-8 xl:col-6">
              <h2
                dangerouslySetInnerHTML={markdownify(title)}
                className="mb-4"
              />
            </div>
            <p className="categories">
              {data.categories.map((category: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleTagClick(category)}
                  type="button"
                  className={`btn btn-outline-category btn-category ${
                    selectedCategories.includes(category)
                      ? "btn-category-selected"
                      : ""
                  }`}
                >
                  {`${category}`}
                </button>
              ))}
            </p>
            <div className="col-12 ">
              <Swiper
                onSwiper={setSwiperRef}
                centeredSlides={true}
                slidesPerView={"auto"}
                spaceBetween={30}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: true,
                }}
                className="mySwiper"
              >
                {filteredPosts.map((item: Post, index: number) => (
                  <SwiperSlide key={index}>
                    <div>
                      <div key={index}>
                        <BlogCard data={item} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSlider;
