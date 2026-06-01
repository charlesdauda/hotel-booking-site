import logo1 from './assets/Images/partner1.png';
import logo2 from './assets/Images/partner2.png';
import logo3 from './assets/Images/partner3.png';
import logo4 from './assets/Images/partner4.png';
import logo5 from './assets/Images/partner5.png';

const partners = [
  { src: logo1, name: 'TravelGo' },
  { src: logo2, name: 'MyTeam Privates Ltd' },
  { src: logo3, name: 'Brand Logo' },
  { src: logo4, name: 'InfinityDNA' },
  { src: logo5, name: 'Cultural Diversity' },
];

const Partners = () => {
  return (
    <section className="hidden md:block bg-white py-14 md:py-20 overflow-hidden">
      <div className="group">
        <div className="flex gap-16 lg:gap-20 items-center w-max animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform motion-reduce:animate-none">
          {[...partners, ...partners].map((p, i) => (
            <div key={i} className="shrink-0 flex items-center justify-center">
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                decoding="async"
                className="h-20 lg:h-24 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  );
};

export default Partners;