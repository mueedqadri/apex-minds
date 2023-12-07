"use client";

import Social from "@/components/Social";
import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Testimonial } from "@/types";
import { GoDotFill } from "react-icons/go";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: {
    enable?: boolean;
    title: string;
    description?: string;
    Developers: Array<Testimonial>;
  };
}

const Developers = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-6">
                <h2
                  dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
                  className="mb-4"
                />
                <p
                  dangerouslySetInnerHTML={markdownify(
                    data.frontmatter.description!,
                  )}
                />
              </div>
              <div className="col-12">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  slidesPerView={"auto"}
                  loop={true}
                  centeredSlides={false}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: true,
                  }}
                  spaceBetween={24}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {data.frontmatter.Developers.map(
                    (item: Testimonial, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="rounded-lg bg-theme-light px-9 py-3 dark:bg-darkmode-theme-light">
                          <div className="text-dark dark:text-white">
                            <div className="mt-11 flex items-center">
                              <div className="text-dark dark:text-white">
                                <ImageFallback
                                  height={120}
                                  width={120}
                                  src={item.avatar}
                                  alt={item.name}
                                />
                              </div>
                              <div className="ml-4">
                                <h3
                                  dangerouslySetInnerHTML={markdownify(
                                    item.name,
                                  )}
                                  className="h5 font-primary font-semibold"
                                />
                                <p
                                  dangerouslySetInnerHTML={markdownify(
                                    item.designation,
                                  )}
                                  className="text-dark dark:text-white"
                                />
                                <div className="text-left mt-2 ">
                                  <Social
                                    source={item.social}
                                    className="social-icons"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <ul>
                            {item.content.map((bullet: string) => (
                              <li
                                className="relative mt-6 mb-4 pl-6"
                                key={bullet}
                              >
                                <GoDotFill
                                  className={"absolute left-0  top-1.5"}
                                />
                                <span
                                  dangerouslySetInnerHTML={markdownify(bullet)}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Developers;
