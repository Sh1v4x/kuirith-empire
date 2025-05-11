import glam from "../../assets/events/glam.png";
import pvp from "../../assets/events/pvp.png";
import raid from "../../assets/events/raid.png";
import treasureMap from "../../assets/events/treasure_map.png";

export default function Events() {
  const cards = [
    { img: raid, label: "Raid" },
    { img: treasureMap, label: "Treasure Chest", span: "md:col-span-2" },
    { img: pvp, label: "PVP", span: "md:col-span-2" },
    { img: glam, label: "Glam" },
  ];

  return (
    <div className="w-full  py-0 sm:py-0 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            Events
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Nous proposons plusieurs types d’événements réguliers pour
            satisfaire tous les profils de joueurs. Du chill au challenge, il y
            en a pour tous les goûts !
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {cards.map(({ img, label, span }, i) => (
            <a
              key={i}
              href="#"
              className={`group relative h-28 sm:h-56 md:h-64 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ${
                span || ""
              }`}
            >
              <img
                src={img}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover object-center transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <span className="relative z-10 block text-center text-white text-sm sm:text-base font-semibold bg-black/50 py-2 w-full">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
