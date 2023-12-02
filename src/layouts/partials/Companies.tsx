"use client";
import { markdownify } from "@/lib/utils/textConverter";
import { ICompanies } from "@/types";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface LogoSwiperProps {
  companies: ICompanies;
}

// The LogoSwiper component
const LogoSwiper: React.FC<LogoSwiperProps> = ({ companies }) => {
  return (
    <section className="section ">
      <div className="container">
        <div className="row">
          <div className="mx-auto mb-12 text-center md:col-12 lg:col-12 xl:col-12">
            <h2 dangerouslySetInnerHTML={markdownify(companies.title)} />
            <p
              className="mb-8 text-lg"
              dangerouslySetInnerHTML={markdownify(companies.subtitle)}
            />
          </div>
          <div className="col-12 bg-gradient-company">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={"auto"}
              speed={1200}
              loop={true}
              centeredSlides={false}
              autoplay={{
                delay: 250,
                disableOnInteraction: true,
              }}
              spaceBetween={15}
              breakpoints={{
                200: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 7,
                },
              }}
            >
              {companies.logos.map((logo, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={logo}
                    alt={`Logo ${index}`}
                    style={{ filter: "grayscale(100%)", maxWidth: "100px" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSwiper;
