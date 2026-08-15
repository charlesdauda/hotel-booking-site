import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hotelLogo from '../assets/Images/hotelLogo.png';
import { IoBedSharp } from "react-icons/io5";
import { HiMenuAlt3, HiX, HiTrash } from 'react-icons/hi';
import { useBooking } from '../context/useBooking';
import { submitBookings } from '../api/bookingApi';

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
  const { cartItems, removeBooking, clearCart, cartCount, cartTotal } = useBooking();
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmError, setConfirmError] = useState('');

  useEffect(() => {
    document.body.style.overflow = (menuOpen || cartOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, cartOpen]);

  const handleConfirmBooking = async () => {
    setConfirming(true);
    setConfirmError('');
    try {
      await submitBookings(cartItems);
      clearCart();
      setConfirmed(true);
    } catch (err) {
      setConfirmError(err.message);
    } finally {
      setConfirming(false);
    }
  };

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

          <div className="flex items-center gap-4">

            <button
              onClick={() => { setCartOpen(true); setConfirmed(false); }}
              className="relative p-1"
              aria-label="Open bed bookings"
            >
              <IoBedSharp className="text-xl text-gray-700" />
              <span
                className={`absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 px-1 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors
                ${cartCount > 0 ? 'bg-[#bf9b6a] text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {cartCount}
              </span>
            </button>

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

      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl
        transform transition-transform duration-200 ease-out
        ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

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

        {confirmed ? (
          <div className="flex flex-col items-center justify-center text-center px-8 h-[calc(100%-88px)]">
            <div className="w-24 h-24 rounded-full bg-[#f5ede0] flex items-center justify-center mb-6">
              <span className="text-[#bf9b6a] text-4xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-[#0f2c3f] mb-2">Booking Confirmed</h3>
            <p className="text-gray-400 mb-6">
              We'll be in touch shortly to finalize your stay.
            </p>
            <Link
              to="/rooms-suites"
              onClick={() => setCartOpen(false)}
              className="bg-[#bf9b6a] hover:bg-[#a9875a] text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Browse More Rooms
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
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
        ) : (
          <div className="flex flex-col h-[calc(100%-88px)]">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border border-gray-100 p-4 relative">
                  <button
                    onClick={() => removeBooking(item.id)}
                    className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition-colors"
                    aria-label="Remove booking"
                  >
                    <HiTrash />
                  </button>
                  <p className="font-serif text-lg text-[#0f2c3f] pr-6">{item.roomName}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.checkIn} → {item.checkOut} · {item.guests} guest{item.guests > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.nights} night{item.nights > 1 ? 's' : ''} × {item.quantity} room{item.quantity > 1 ? 's' : ''}
                  </p>
                  <p className="font-semibold text-[#bf9b6a] mt-2">${item.totalPrice}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">Total</span>
                <span className="font-serif text-2xl text-[#0f2c3f]">${cartTotal}</span>
              </div>
              {confirmError && (
                <p className="text-red-500 text-sm mb-3">{confirmError}</p>
              )}
              <button
                onClick={handleConfirmBooking}
                disabled={confirming}
                className="group/btn relative overflow-hidden border rounded-sm bg-black text-white text-xs tracking-[0.25em] font-semibold px-10 py-4 w-full disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-[#bf9b6a] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">{confirming ? 'CONFIRMING...' : 'CONFIRM BOOKING'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;