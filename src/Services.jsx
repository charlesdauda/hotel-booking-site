import { FaBed, FaPlaneDeparture, FaWifi, FaConciergeBell, FaSwimmingPool, FaCar } from 'react-icons/fa';

const services = [
  { icon: FaBed,            title: 'Room Service',   desc: 'Orci varius natoque penatibus magnis ders disney parturient ridiculus' },
  { icon: FaPlaneDeparture, title: 'Pick Up & Drop', desc: 'Orci varius natoque penatibus magnis ders disney parturient ridiculus' },
  { icon: FaWifi,           title: 'Wifi Internet',  desc: 'Orci varius natoque penatibus magnis ders disney parturient ridiculus' },
  { icon: FaConciergeBell,  title: 'Breakfast',      desc: 'Orci varius natoque penatibus magnis ders disney parturient ridiculus' },
  { icon: FaSwimmingPool,   title: 'Swimming Pool',  desc: 'Orci varius natoque penatibus magnis ders disney parturient ridiculus' },
  { icon: FaCar,            title: 'Parking Space',  desc: 'Orci varius natoque penatibus magnis ders disney parturient ridiculus' },
];

const Services = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-[#bf9b6a]" />
            <span className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase">
              Sheraton Hotels &amp; Resorts
            </span>
            <span className="h-px w-12 bg-[#bf9b6a]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900">
            Hotel Facilities
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="group relative border border-gray-200 p-10 lg:p-12 text-center bg-white hover:bg-[#1a1a1a] transition-colors duration-500 cursor-pointer"
              >
                {/* Top accent bar */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-[#f0e0c0] group-hover:opacity-0 transition-opacity duration-500" />

                {/* Icon */}
                <Icon className="text-6xl text-[#bf9b6a] mx-auto mb-6 group-hover:text-white transition-colors duration-500" />

                {/* Title */}
                <h3 className="font-serif text-2xl text-gray-900 mb-4 group-hover:text-white transition-colors duration-500">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;