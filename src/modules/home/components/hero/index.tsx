"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button, Heading } from "@medusajs/ui";
import Link from "next/link";

const slides = [
  {
    title: "Fine art prints in color or b&W Framed and unframed",
    subtitle:
      "Explore our fine art prints available in both color and black & white. Choose from framed or unframed options to perfectly complement your space.",
    image: "/banner-main.png",
    link: "https://github.com/medusajs/nextjs-starter-medusa",
  },
  {
    title: "Fine art prints in color or b&W Framed and unframed",
    subtitle:
      "Explore our fine art prints available in both color and black & white. Choose from framed or unframed options to perfectly complement your space.",
    image: "/banner-main.png",
    link: "https://github.com/medusajs/nextjs-starter-medusa",
  },
  {
    title: "Fine art prints in color or b&W Framed and unframed",
    subtitle:
      "Explore our fine art prints available in both color and black & white. Choose from framed or unframed options to perfectly complement your space.",
    image: "/banner-main.png",
    link: "https://github.com/medusajs/nextjs-starter-medusa",
  },
];

export default function Hero() {
  return (
    <div className="h-[75vh] w-full relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Background Image */}
            <div
              className="h-full w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark overlay */}
              {/* <div className="absolute inset-0 bg-black/50"></div> */}

              {/* Content */}
              <div className="content-container h-full z-10 mr-auto">
                <div className="max-w-xl flex flex-col justify-center items-start text-left gap-2 h-full">
                  <Heading
                    level="h1"
                    className="text-[30px] md:text-[50px] text-white font-semibold leading-tight capitalize"
                  >
                    {slide.title}
                  </Heading>
                  <Heading
                    level="h2"
                    className="text-sm md:text-base text-[#E4E4E4] font-medium leading-snug max-w-md"
                  >
                    {slide.subtitle}
                  </Heading>
                  <Link href={slide.link} target="_blank" className="mt-8">
                    <Button
                      variant="secondary"
                      className="flex items-center text-white text-base uppercase font-semibold bg-[#343636] px-8 py-3 hover:bg-[#4c4e4e] outline-none border-none rounded-none"
                    >
                      More info on prints
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
