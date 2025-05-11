import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export default function NewSwiper({ sections }) {
    const [currentSection, setCurrentSection] = useState(0);
    const handleScroll = (direction) => {
        if (direction === "down" && currentSection < sections.length - 1) {
            setCurrentSection(currentSection + 1);
        }
        else if (direction === "up" && currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown") {
                handleScroll("down");
            }
            else if (e.key === "ArrowUp") {
                handleScroll("up");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentSection]);
    useEffect(() => {
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.height = "";
            document.body.style.overflow = "";
        };
    }, []);
    useEffect(() => {
        const handleWheel = (e) => {
            const target = e.target;
            const scrollableParent = target.closest(".ranking-scroll");
            if (scrollableParent) {
                const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
                const isAtTop = scrollTop === 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight;
                // Empêche le swiper seulement si le scrollable est en haut ou en bas
                if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
                    // Laisse le scroll naturel
                    return;
                }
            }
            e.preventDefault();
            const now = new Date().getTime();
            if (window.lastScrollTime && now - window.lastScrollTime < 800) {
                return;
            }
            window.lastScrollTime = now;
            if (e.deltaY > 0 && currentSection < sections.length - 1) {
                handleScroll("down");
            }
            else if (e.deltaY < 0 && currentSection > 0) {
                handleScroll("up");
            }
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [currentSection, sections.length]);
    return (_jsx("div", { className: "h-screen w-full overflow-hidden relative pb-16", children: _jsx("div", { className: "transition-transform duration-700 ease-in-out h-screen", style: { transform: `translateY(-${currentSection * 100}vh)` }, children: sections.map((section, index) => (_jsx("div", { className: "h-full", children: section.component }, index))) }) }));
}
