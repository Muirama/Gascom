import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";

const items = [
  {
    id: 1,
    title: "League of Legends",
    image: "/images/lol.jpg",
  },
  {
    id: 2,
    title: "Counter-Strike 2",
    image: "/images/CS2.jpg",
  },
  {
    id: 3,
    title: "Valorant",
    image: "/images/valorant.jpg",
  },
  {
    id: 4,
    title: "FIFA",
    image: "/images/fifa.jpg",
  },
  {
    id: 5,
    title: "PUBG",
    image:
      "/images/pubg.jpg",
  },
  {
    id: 6,
    title: "Call of Duty",
    image:
      "/images/cod.jpg",
  },
  {
    id: 7,
    title: "Dota 2",
    image: "/images/dota.jpg",
  },
  {
    id: 8,
    title: "Apex Legends",
    image:
      "/images/apex.jpg",
  },
];

export default function Carousel() {
  const swiperRef = useRef(null);

  return (
    <section
      id="jeux"
      className="relative bg-[#0D0D0D] py-16"
      onMouseEnter={() => swiperRef.current?.autoplay.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay.start()}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texte à gauche */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#E50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.8)]">
            Découvrez les jeux qui font vibrer la communauté
          </h2>
          <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
            Plongez dans les univers les plus intenses du gaming moderne : des
            compétitions e-sport haletantes, des aventures immersives et des
            batailles stratégiques. <br />
            Voici une sélection des titres incontournables qui rassemblent des
            millions de joueurs à travers le monde.
          </p>
        </div>

        {/* Carrousel à droite */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={25}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="w-full"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="relative group w-full h-[220px] rounded-xl overflow-hidden shadow-lg 
                           border border-red-700/40 
                           transform transition duration-500 hover:scale-110 hover:rotate-1
                           hover:shadow-[0_0_30px_rgba(255,0,0,0.7)] cursor-pointer"
              >
                {/* image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* overlay + titre centré */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                             opacity-90 group-hover:opacity-100 transition duration-500 flex flex-col justify-end"
                >
                  <h3 className="text-lg md:text-xl font-bold text-center text-white mb-4 group-hover:text-[#E50914] transition">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
