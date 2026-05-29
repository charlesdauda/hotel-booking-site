import { useState, useEffect } from 'react';
import hotelLogo from './assets/Images/hotelLogo.png';
import { IoBedSharp } from "react-icons/io5";
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', link: '#' },
  { name: 'About', link: '#' },
  { name: 'Gallery', link: '#' },
  { name: 'Rooms Suites', link: '#' },
  { name: 'Contact', link: '#' },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 md:top-11 left-0 right-0 z-40 bg-white shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-6 h-full py-4 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center h-full">
            <img src={hotelLogo} alt="Hotel Logo" className="h-28 w-auto" />
          </a>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((item, i) => (
              <li key={i}>
                <a
                  href={item.link}
                  className="text-sm font-medium text-gray-500 hover:text-[#bf9b6a] transition-colors uppercase tracking-wide"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: button + cart */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-[#bf9b6a] hover:bg-[#a8895d] text-white text-sm font-semibold px-6 py-3 tracking-wide transition-colors border rounded-sm">
              RESERVE ROOM
            </button>

            <div className="relative">
              <IoBedSharp className="text-xl text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-[#bf9b6a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl text-gray-800"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-20 left-0 right-0 bottom-0 z-30 bg-white transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col px-6 py-8 gap-6">
          {navLinks.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-gray-800 hover:text-[#bf9b6a] transition-colors uppercase tracking-wide"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;