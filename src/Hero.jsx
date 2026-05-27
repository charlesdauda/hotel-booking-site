import { useState, useEffect } from 'react';
import hotelLogo from './assets/Images/hotelLogo.png';
import hero1 from './assets/Images/hero1.jpg';
import hero2 from './assets/Images/hero2.jpg';

const slides = [
  {
    image: hero1,
    welcome: 'WELCOME TO SHERATON HOTEL',
    title: ['Stay In Our Luxury', 'Suites & Rooms'],
    cta: 'ROOMS & SUITES',
  },
  {
    image: hero2,
    welcome: 'EXPERIENCE TIMELESS COMFORT',
    title: ['Discover Elegance', 'In Every Detail'],
    cta: 'EXPLORE MORE',
  },
];

const SLIDE_DURATION = 6500;

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-20 md:mt-31 h-[calc(100vh-80px)] md:h-[calc(100vh-124px)] min-h-160 w-full overflow-hidden bg-black">
      {/* Background slides with Ken Burns zoom */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1400 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover transition-transform ease-out ${
              i === current ? 'scale-110 duration-8000' : 'scale-100 duration-1400'
            }`}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/75" />
        </div>
      ))}

      {/* Content layer */}
      <div className="relative z-10 h-full">
        {slides.map((slide, i) => {
          const active = i === current;
          return (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all ease-out ${
                active
                  ? 'opacity-100 translate-y-0 duration-1200 delay-300'
                  : 'opacity-0 translate-y-6 duration-700 pointer-events-none'
              }`}
            >
              <img
                src={hotelLogo}
                alt=""
                className="h-20 w-auto mb-6 brightness-0 invert opacity-90"
              />

              <p className="text-white text-[13px] md:text-sm tracking-[0.35em] font-light mb-7">
                {slide.welcome}
              </p>

              <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-[88px] leading-[1.05] font-normal max-w-5xl">
                {slide.title.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <button className="mt-12 border border-white/90 text-white text-[12px] tracking-[0.25em] font-semibold px-10 py-4 hover:bg-[#bf9b6a] hover:border-[#bf9b6a] transition-all duration-300">
                {slide.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-0.5 transition-all duration-500 ${
              i === current ? 'w-12 bg-[#bf9b6a]' : 'w-6 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;