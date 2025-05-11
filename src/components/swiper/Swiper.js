import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, EffectFade } from "swiper/modules";
export default function FullpageSwiper({ sections }) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (_jsx("div", { className: "fixed inset-0 overflow-hidden", children: _jsx(Swiper, { direction: "vertical", slidesPerView: 1, spaceBetween: 0, mousewheel: true, pagination: {
                clickable: true,
                renderBullet: (className) => {
                    return `<span class="${className}"></span>`;
                },
            }, effect: "fade", fadeEffect: { crossFade: true }, speed: 1000, modules: [Mousewheel, Pagination, EffectFade], onSlideChange: (swiper) => setActiveIndex(swiper.activeIndex), className: "h-screen w-screen", children: sections.map((section, index) => (_jsx(SwiperSlide, { className: "h-screen w-screen", children: _jsx("div", { className: "flex flex-col items-center justify-center h-full w-full", children: _jsx("div", { className: `transition-all duration-500 transform ${activeIndex === index
                            ? "scale-100 opacity-100"
                            : "scale-95 opacity-0 visibility-hidden"}`, children: section.component }) }) }, index))) }) }));
}
