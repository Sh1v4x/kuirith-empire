import Events from "../../components/events/Events";
import Hero from "../../components/hero/Hero";
import Ranking from "../../components/ranking/Ranking";
import Swiper from "../../components/swiper/Swiper";

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Swiper
        sections={[
          { component: <Hero /> },
          { component: <Events /> },
          { component: <Ranking /> },
        ]}
      />
    </div>
  );
};
