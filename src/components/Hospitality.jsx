import { FaCheck, FaQuoteLeft } from 'react-icons/fa';
import hospImage from '../assets/Images/hospitality.jpg';
import hospThumb1 from '../assets/Images/hospThumb1.jpg';
import hospThumb2 from '../assets/Images/hospThumb2.jpg';

const hotelFacilities = ['Healthy Food', 'Award-winning Restaurant', 'Individually Styled Bedrooms'];
const luxuryRooms     = ['Healthy Food', 'Award-winning Restaurant', 'Individually Styled Bedrooms'];

const Shine = () => (
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute inset-y-0 left-0 w-1/3 skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent translate-x-[-250%] group-hover:translate-x-[350%] transition-transform duration-0 group-hover:duration-800 ease-in-out" />
  </div>
);

const Hospitality = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="relative">
          <div className="group relative h-115 md:h-145 lg:h-165 overflow-hidden">
            <img
              src={hospImage}
              alt="Hotel interior"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <Shine />
          </div>
          <div className="lg:absolute lg:bottom-0 lg:left-0 lg:right-20 bg-[#bf9b6a] text-white p-7 lg:p-8 flex items-start gap-5 mt-6 lg:mt-0">
            <FaQuoteLeft className="text-3xl shrink-0 mt-1 opacity-90" />
            <p className="font-serif text-lg leading-relaxed">
              Great hospitality is the key to Pride of Britain's longstanding reputation for excellence.
            </p>
          </div>
        </div>
        <div>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase">
              Eat From The Land
            </span>
            <span className="h-px w-14 bg-[#bf9b6a]" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-[52px] text-gray-900 leading-[1.1] mb-6">
            Enjoy Food and Even Better Hospitality
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10">
            Set against quiet gardens and a sun-soaked terrace, our kitchen sources directly from local farms each morning — so every plate carries the colour and warmth of the season. Stay with us for the rooms; return for the table.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-serif text-2xl text-gray-900 mb-5">Hotel Facilities</h3>
              <ul className="space-y-3">
                {hotelFacilities.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-[#bf9b6a] flex items-center justify-center shrink-0">
                      <FaCheck className="text-white text-[10px]" />
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-gray-900 mb-5">Luxury Rooms</h3>
              <ul className="space-y-3">
                {luxuryRooms.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-[#bf9b6a] flex items-center justify-center shrink-0">
                      <FaCheck className="text-white text-[10px]" />
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group relative overflow-hidden">
              <img
                src={hospThumb1}
                alt="Suite interior"
                className="w-full h-44 lg:h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <Shine />
            </div>
            <div className="group relative overflow-hidden">
              <img
                src={hospThumb2}
                alt="Restaurant"
                className="w-full h-44 lg:h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <Shine />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hospitality;