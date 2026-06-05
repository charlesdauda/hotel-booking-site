import PageHeader from '../PageHeader';
import hero1 from '../assets/Images/hero1.jpg';
import fitness from '../assets/Images/fitness.jpg';
import restaurant from '../assets/Images/restaurant.jpg';
import spa from '../assets/Images/spa.jpg';
import { FaDumbbell, FaUtensils, FaSpa } from 'react-icons/fa';

const features = [
  {
    image: fitness,
    eyebrow: 'Modern',
    title: 'Fitness Center',
    description: 'Train with intention in our state-of-the-art studio — premium cardio machines, free weights, and quiet city views designed to keep your routine intact while you stay with us.',
    icon: FaDumbbell,
  },
  {
    image: restaurant,
    eyebrow: 'Discover',
    title: 'The Restaurant',
    description: 'Seasonal menus, locally-sourced ingredients, and a wine list that travels the world. Our chefs craft each plate as a quiet celebration of the moment you sit down.',
    icon: FaUtensils,
  },
  {
    image: spa,
    eyebrow: 'Experiences',
    title: 'Spa Center',
    description: 'Unwind in our wellness sanctuary — full-body massages, facial treatments, and steam therapies delivered by certified therapists in calming, candlelit suites.',
    icon: FaSpa,
  },
];

const RoomsSuitesPage = () => {
  return (
    <>
      <PageHeader title="Rooms & Suites" bgImage={hero1} />

      {features.map((feature, i) => {
        const Icon = feature.icon;
        const imageLeft = i % 2 === 0;

        return (
          <section key={i} className="grid lg:grid-cols-2 bg-white">

            <div className={`flex items-center lg:py-12 ${
              imageLeft
                ? 'lg:pl-12 xl:pl-20'
                : 'lg:pr-12 xl:pr-20 lg:order-2'
            }`}>
              <img
                src={feature.image}
                alt={feature.title}
                loading="lazy"
                className="w-full h-72 lg:h-115 object-cover"
              />
            </div>

            <div className={`bg-[#f5ede0] p-10 lg:p-16 relative flex flex-col justify-center ${imageLeft ? '' : 'lg:order-1'}`}>
              {/* Gold accent bar */}
              <span className="absolute top-0 left-10 lg:left-16 w-20 h-1.5 bg-[#bf9b6a]" />

              {/* Decorative watermark icon */}
              <Icon className="absolute top-8 right-8 text-7xl text-[#bf9b6a]/15 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase">
                    {feature.eyebrow}
                  </span>
                  <span className="h-px w-14 bg-[#bf9b6a]" />
                </div>

                <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
                  {feature.title}
                </h2>

                <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
                  {feature.description}
                </p>

                <button className="self-start border-2 border-[#bf9b6a] text-[#bf9b6a] hover:bg-[#bf9b6a] hover:text-white px-8 py-3 text-xs tracking-[0.2em] font-semibold transition-colors">
                  DISCOVER MORE
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default RoomsSuitesPage;