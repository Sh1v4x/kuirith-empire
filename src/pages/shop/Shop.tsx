export default function Shop() {
  return (
    <section className="py-10 pb-40">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-background rounded-xl shadow-lg p-6 flex flex-col"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  className="object-cover w-full h-full"
                  src="https://placehold.co/600x400.png"
                  alt="Product"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="bg-white text-gray-900 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition">
                    Voir le produit
                  </button>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-4">
                Nom du produit
              </h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt.
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-900 font-semibold text-base md:text-lg">
                  Prix
                </span>
                <button className="bg-primary text-white py-2 px-4 rounded-full font-bold hover:bg-accent transition">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
