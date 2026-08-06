import { FaCheck } from 'react-icons/fa';
import testi1 from '../assets/Images/testi1.jpg';
import testi2 from '../assets/Images/testi2.jpg';
import testi3 from '../assets/Images/testi3.jpg';

const testimonials = [
  {
    photo: testi1,
    name: 'Jina Nillson',
    role: 'Founder of Webflex',
    text: "Upon they're seasons green day beast without form man be firmament years shall the appear moveth signs had.",
  },
  {
    photo: testi2,
    name: 'Donald Browfish',
    role: 'Founder of Webflex',
    text: "Upon they're seasons green day beast without form man be firmament years shall the appear moveth signs had.",
  },
  {
    photo: testi3,
    name: 'Robotor Doses',
    role: 'Founder of Webflex',
    text: "Upon they're seasons green day beast without form man be firmament years shall the appear moveth signs had.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#262626] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-[#bf9b6a]" />
            <span className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase">
              What Says For Customer
            </span>
            <span className="h-px w-12 bg-[#bf9b6a]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
            What Client&apos;s Say?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="relative bg-white p-8 lg:p-10 text-center shadow-xl">

              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-[#bf9b6a]" />

              <h3 className="font-serif text-2xl text-gray-900 mt-2 mb-2">{t.name}</h3>

              <p className="text-[#bf9b6a] text-xs font-semibold tracking-[0.25em] uppercase mb-6">
                {t.role}
              </p>
                <div className="relative w-32 h-32 mx-auto mb-10">
                <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full rounded-full object-cover object-top"
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#bf9b6a] rounded-full flex items-center justify-center shadow-md ring-4 ring-white">
                    <FaCheck className="text-white text-sm" />
                </span>
                </div>
              <p className="text-gray-500 leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;