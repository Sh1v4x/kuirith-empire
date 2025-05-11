
import Events from "../../components/events/Events";
import Hero from "../../components/hero/Hero";
import Ranking from "../../components/ranking/Ranking";
import NewSwiper from "../../components/swiper/NewSwiper";

export const Home = () => {
  return (
    <div className="min-h-screen">
      <NewSwiper
        sections={[
          { component: <Hero /> },
          { component: <Events /> },
          { component: <Ranking /> },
        ]}
      />
    </div>
  );
};
