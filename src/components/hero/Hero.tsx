import logo from "../../assets/logo/logo.png";

export default function Hero() {
  return (
    <section className="py-8 z-10 font-serif">
      <div className="flex flex-col-reverse md:flex-row items-center max-w-6xl px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        {/* Texte */}
        <div className="w-full md:w-1/2 py-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            Kuirith Empire
          </h1>
          <p className="text-base sm:text-lg lg:text-2xl text-black mb-4">
            Kuirith Empire est une CL active qui propose des événements
            originaux et variés. Si tu es novice ou expérimenté et sans prise de
            tête, viens chez nous !
          </p>
          <button className="mt-2 sm:mt-4 px-4 py-2 bg-purple-900 text-white rounded hover:bg-purple-700 transition duration-300">
            Rejoindre le serveur
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 py-6 flex justify-center">
          <img
            title="Kuirith Empire Logo"
            src={logo}
            className="w-40 sm:w-48 md:w-56 lg:w-130 rounded-full object-cover"
            alt="Logo Kuirith Empire"
          />
        </div>
      </div>
    </section>
  );
}
