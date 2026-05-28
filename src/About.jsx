import about1 from './assets/Images/about1.jpg';
import about2 from './assets/Images/about2.jpg';
import { FaBed, FaSwimmingPool, FaPhoneVolume, FaPlay, FaRegLightbulb } from 'react-icons/fa';

const About = () => {
  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div className="relative">
          <div className="hidden lg:block absolute left-0 top-8 w-10 h-72 bg-[#bf9b6a] z-0" />

          <div className="relative lg:h-155">
            <div className="relative lg:absolute lg:left-8 lg:top-0 lg:w-[76%] lg:h-150">
              <div className="group relative h-72 lg:h-full overflow-hidden">
                <img
                  src={about1}
                  alt="Luxury room interior"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Shine sweep — plays once, no reverse */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-linear-to-r from-transparent via-white/55 to-transparent translate-x-[-250%] group-hover:translate-x-[350%] transition-transform duration-0 group-hover:duration-800 ease-in-out" />
                </div>
              </div>
            </div>

            {/* Second image (bottom-right) with shine */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-0 lg:right-0 lg:w-[48%] lg:h-72 lg:border-[6px] lg:border-white z-10">
              <div className="group relative w-full h-56 lg:h-full overflow-hidden">
                <img
                  src={about2}
                  alt="Hotel dining area"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-linear-to-r from-transparent via-white/55 to-transparent translate-x-[-250%] group-hover:translate-x-[350%] transition-transform duration-0 group-hover:duration-800 ease-in-out" />
                </div>
              </div>
            </div>

            {/* Dark info card */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-16 lg:w-75 bg-[#262421] text-white p-8 text-center z-20 shadow-2xl">
              <FaBed className="text-[#bf9b6a] text-4xl mx-auto mb-4" />
              <h3 className="font-serif text-2xl mb-3">Luxury Room</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Relax in elegantly designed spaces with unforgettable hospitality.
              </p>
            </div>
          </div>
        </div>

        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase">
              Sheraton Hotels & Resorts
            </span>
            <span className="h-px w-14 bg-[#bf9b6a]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] mb-7">
            Most Safe &amp; Rated<br />Hotel in Accra.
          </h2>

          {/* Lead paragraph (gold) */}
          <p className="font-serif text-lg md:text-xl text-[#bf9b6a] leading-relaxed mb-6">
           Experience comfort, security, and luxury at one of Accra’s most trusted hotel destinations.
          </p>

          {/* Body paragraph */}
          <p className="text-gray-500 leading-relaxed mb-10">
            Enjoy exceptional hospitality, luxurious rooms, and a peaceful atmosphere designed to give you comfort, relaxation, and a truly memorable stay experience.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-4">
              <FaRegLightbulb className="text-[#bf9b6a] text-4xl shrink-0" />
              <span className="font-serif text-xl text-gray-900 leading-snug">
                The Best<br />Lighting
              </span>
            </div>
            <div className="flex items-center gap-4">
              <FaSwimmingPool className="text-[#bf9b6a] text-4xl shrink-0" />
              <span className="font-serif text-xl text-gray-900 leading-snug">
                The Best<br />Swiming
              </span>
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-8">
            <button className="bg-[#bf9b6a] hover:bg-[#a8895d] text-white text-sm font-semibold px-8 py-4 tracking-[0.15em] transition-colors">
              DISCOVER MORE
            </button>

            <div className="flex items-center gap-4">
              <FaPhoneVolume className="text-[#bf9b6a] text-3xl shrink-0" />
              <div>
                <p className="text-gray-500 text-sm">Booking Now</p>
                <p className="text-gray-900 font-serif text-xl">123 456 7890</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;