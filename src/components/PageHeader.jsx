import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const PageHeader = ({ title, bgImage }) => {
  return (
    <section className="relative mt-20 md:mt-31 h-95 md:h-115 overflow-hidden">
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-none">
          {title}
        </h1>
        <nav className="flex items-center gap-3 text-white">
          <Link to="/" className="hover:text-[#bf9b6a] transition-colors">
            Home
          </Link>
          <FaChevronRight className="text-[#bf9b6a] text-xs" />
          <span className="font-semibold">{title}</span>
        </nav>
      </div>
    </section>
  );
};

export default PageHeader;