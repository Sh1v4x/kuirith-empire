import { jsx as _jsx } from "react/jsx-runtime";
import Events from "../../components/events/Events";
import Hero from "../../components/hero/Hero";
import Ranking from "../../components/ranking/Ranking";
import NewSwiper from "../../components/swiper/NewSwiper";
export const Home = () => {
    return (_jsx("div", { className: "min-h-screen", children: _jsx(NewSwiper, { sections: [
                { component: _jsx(Hero, {}) },
                { component: _jsx(Events, {}) },
                { component: _jsx(Ranking, {}) },
            ] }) }));
};
