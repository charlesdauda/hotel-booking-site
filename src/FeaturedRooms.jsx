import featured1 from './assets/Images/featured1.jpg';
import featured2 from './assets/Images/featured2.jpg';
import { FaCheck } from 'react-icons/fa';

const amenities = ['Pick & Drop Service', 'Swimming Pool', 'City Tour Guide', 'Fibre Internet'];

const rooms = [
  { image: featured1, name: 'Single Room', price: 200 },
  { image: featured2, name: 'Double Room', price: 250 },
];

const FeaturedRooms = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-[#bf9b6a]" />
            <span className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase">
              Featured Stays
            </span>
            <span className="h-px w-12 bg-[#bf9b6a]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1]">
            The Best Luxury Rooms<br />And Suites
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {rooms.map((room, i) => (
            <div key={i} className="grid grid-cols-12 items-center">

              {/* ===== Info card (left) ===== */}
              <div className="bg-[#f5ede0] p-8 lg:p-10 col-span-12 lg:col-span-5 relative z-10 shadow-md">
                {/* Gold accent bar */}
                <span className="absolute top-0 left-8 w-16 h-1.5 bg-[#bf9b6a]" />

                {/* Price */}
                <p className="mb-2 font-serif">
                  <span className="text-[#bf9b6a] text-5xl">${room.price}</span>
                  <span className="text-gray-700 text-base"> / Night</span>
                </p>

                {/* Room name */}
                <h3 className="font-serif text-3xl text-gray-900 mb-6">{room.name}</h3>

                {/* Amenities */}
                <ul className="space-y-3 mb-8">
                  {amenities.map((a, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600">
                      <FaCheck className="text-[#bf9b6a] text-sm shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                {/* BOOK-NOW button — sweep fills in from left on hover, slides back out on leave */}
                <button className="group/btn relative overflow-hidden bg-black text-white text-xs tracking-[0.25em] font-semibold px-10 py-4">
                  <span className="absolute inset-0 bg-[#bf9b6a] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">BOOK NOW</span>
                </button>
              </div>

              {/* ===== Image (right) with shine sweep ===== */}
              <div className="col-span-12 lg:col-span-7 lg:-ml-8 mt-6 lg:mt-0">
                <div className="group relative overflow-hidden h-80 lg:h-130 shadow-xl">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Shine blade — sweeps once, no reverse */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent translate-x-[-250%] group-hover:translate-x-[350%] transition-transform duration-0 group-hover:duration-800 ease-in-out" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedRooms;