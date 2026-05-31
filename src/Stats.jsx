const stats = [
  { number: '20', label: ['Years Of',   'Experience'] },
  { number: '35', label: ['Online',     'Booking'] },
  { number: '40', label: ['Experience', 'Hotel Boy'] },
  { number: '30', label: ['Best Hotel', 'Award'] },
];

const Stats = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex items-center justify-center gap-5 lg:gap-6 px-4 ${
                i > 0 ? 'lg:border-l lg:border-gray-200' : ''
              }`}
            >
              <span className="font-serif text-7xl md:text-8xl lg:text-9xl text-[#bf9b6a]/30 leading-none">
                {stat.number}
              </span>
              <div className="font-serif text-lg lg:text-xl text-gray-800 leading-snug">
                {stat.label.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;