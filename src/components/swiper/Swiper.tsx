import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, EffectFade } from "swiper/modules";

interface Section {
  component: React.ReactNode;
}

export default function FullpageSwiper({ sections }: { sections: Section[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        modules={[Mousewheel, Pagination, EffectFade]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-screen w-screen"
      >
        {sections.map((section, index) => (
          <SwiperSlide key={index} className="h-screen w-screen">
            <div className="flex flex-col items-center justify-center h-full w-full">
              <div
                className={`transition-all duration-500 transform ${
                  activeIndex === index
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 visibility-hidden"
                }`}
              >
                {section.component}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
