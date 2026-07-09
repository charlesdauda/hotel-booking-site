import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hotelLogo from './assets/Images/hotelLogo.png';
import { IoBedSharp } from "react-icons/io5";
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home',        link: '/' },
  { name: 'About',       link: '/about' },
  { name: 'Gallery',     link: '/gallery' },
  { name: 'Room Suites', link: '/rooms-suites' },
  { name: 'Contact',     link: '/contact' },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || cartOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, cartOpen]);

  return (
    <>
      <nav className="fixed top-0 md:top-11 left-0 right-0 z-40 bg-white shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-6 h-full py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center h-full">
            <img src={hotelLogo} alt="Hotel Logo" className="h-28 w-auto" />
          </Link>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  className="text-sm font-medium text-gray-500 hover:text-[#bf9b6a] transition-colors uppercase tracking-wide"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: button + cart */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1"
              aria-label="Open bed bookings"
            >
              <IoBedSharp className="text-xl text-gray-700" />
            </button>

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
              <Link
                to={item.link}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-gray-800 hover:text-[#bf9b6a] transition-colors uppercase tracking-wide"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bed bookings sidebar */}
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl
        transform transition-transform duration-200 ease-out
        ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <IoBedSharp className="text-xl text-[#0f2c3f]" />
            <h2 className="text-lg font-bold text-[#0f2c3f]">Bed Bookings</h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close bed bookings"
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Empty state (default until backend logic is wired up) */}
        <div className="flex flex-col items-center justify-center text-center px-8 h-[calc(100%-88px)]">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <IoBedSharp className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-[#0f2c3f] mb-2">
            No beds booked yet
          </h3>
          <p className="text-gray-400 mb-6">
            Add rooms to your booking to see them here.
          </p>
          <Link
            to="/rooms-suites"
            onClick={() => setCartOpen(false)}
            className="bg-[#bf9b6a] hover:bg-[#a9875a] text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;