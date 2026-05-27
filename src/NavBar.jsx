import hotelLogo from './assets/Images/hotellogo.png';
import { FaShoppingCart } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', link: '#' },
  { name: 'About', link: '#' },
  { name: 'Gallery', link: '#' },
  { name: 'Services', link: '#' },
  { name: 'Rooms Suites', link: '#' },
  { name: 'Contact', link: '#' },
];

const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm h-20">
      <div className="max-w-7xl mx-auto px-6 h-full py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center h-full">
          <img src={hotelLogo} alt="Hotel Logo" className="h-25 w-auto" />
        </a>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                className="text-sm font-medium text-gray-800 hover:text-[#bf9b6a] transition-colors uppercase tracking-wide"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: button + cart */}
        <div className="flex items-center gap-4">
          <button className="bg-[#bf9b6a] hover:bg-[#a8895d] text-white text-sm font-semibold px-6 py-3 tracking-wide transition-colors">
            BOOK A CONSULTATION
          </button>

          <div className="relative">
            <FaShoppingCart className="text-xl text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-[#bf9b6a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
