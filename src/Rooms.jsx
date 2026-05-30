import { useState } from 'react';
import room1 from './assets/Images/room1.jpg';
import room2 from './assets/Images/room2.jpg';
import room3 from './assets/Images/room3.jpg';
import room4 from './assets/Images/room4.jpg';
import { FaUserFriends, FaBed, FaBath, FaWifi, FaTv } from 'react-icons/fa';

const rooms = [
  { image: room1, name: 'Luxury Suite Room',   price: 90 },
  { image: room2, name: 'Deluxe Double Room',  price: 90 },
  { image: room3, name: 'Superior King Room',  price: 120 },
  { image: room4, name: 'Executive Room',      price: 150 },
];

const amenities = [FaUserFriends, FaBed, FaBath, FaWifi, FaTv];

const Rooms = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-[#f6f2ea] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-[#bf9b6a]" />
            <span className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase">
              Sheraton Hotel &amp; Resort
            </span>
            <span className="h-px w-12 bg-[#bf9b6a]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900">
            Luxury Rooms &amp; Suites
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {rooms.map((room, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={i}
                onClick={() => setActiveIndex(isActive ? null : i)}
                className="group relative overflow-hidden aspect-16/10 cursor-pointer"
              >
                {/* Image (premium zoom) */}
                <img
                  src={room.image}
                  alt={room.name}
                  className={`w-full h-full object-cover transition-transform duration-800 ease-out group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}
                />

                {/* Base gradient for legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                {/* Hover/active darken */}
                <div className={`absolute inset-0 transition-colors duration-500 group-hover:bg-black/40 ${isActive ? 'bg-black/40' : 'bg-black/0'}`} />

                {/* Title + price (lifts up on hover/active) */}
                <div className={`absolute inset-x-0 bottom-0 p-6 lg:p-8 text-right transition-transform duration-500 ease-out group-hover:-translate-y-14 ${isActive ? '-translate-y-14' : ''}`}>
                  <h3 className="font-serif text-2xl lg:text-3xl text-white">
                    {room.name}
                  </h3>
                  <p className="mt-1 text-sm">
                    <span className="text-[#bf9b6a] font-medium text-base">${room.price}</span>
                    <span className="text-white/90"> / Night</span>
                  </p>
                </div>

                {/* Action row — fades in at bottom on hover/active */}
                <div className={`absolute inset-x-0 bottom-0 px-6 lg:px-8 pb-6 lg:pb-7 flex items-center justify-between transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="border border-white/80 text-white text-[11px] tracking-[0.2em] px-6 py-3 hover:bg-[#bf9b6a] hover:border-[#bf9b6a] transition-colors"
                  >
                    BOOK NOW
                  </button>
                  <div className="flex items-center gap-3 text-white/90 text-base lg:text-lg">
                    {amenities.map((Icon, idx) => (
                      <Icon key={idx} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Rooms;