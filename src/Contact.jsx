import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { checkAvailability } from './api/bookingApi';
import BookingModal from './BookingModal';

// Default dates: today and tomorrow
const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

const contactItems = [
  { icon: FaPhoneAlt,     title: 'Have any question?', detail: '+233 546 627 2444' },
  { icon: FaEnvelope,     title: 'Write email',        detail: 'charlesdauda676@gmail.com' },
  { icon: FaMapMarkerAlt, title: 'Visit anytime',      detail: 'McCarthy Hills, Accra, Ghana' },
];

const Contact = () => {
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [rooms, setRooms] = useState('1');
  const [guests, setGuests] = useState('1-0');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);

  const totalGuests = guests.split('-').reduce((sum, n) => sum + Number(n), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const data = await checkAvailability({ checkIn, checkOut, guests: totalGuests });
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          <div className="bg-[#f5ede0] p-8 lg:p-12 relative">
            <span className="absolute top-0 left-0 right-0 h-1.5 bg-[#bf9b6a]" />

            <p className="text-gray-700 text-sm font-semibold tracking-[0.3em] uppercase mb-3 mt-4">
              Rooms &amp; Suites
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 mb-8">
              Hotel Booking
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-600 mb-2 text-sm">Check In</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white px-4 py-3 border border-gray-200 text-gray-700 focus:outline-none focus:border-[#bf9b6a]"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2 text-sm">Check Out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white px-4 py-3 border border-gray-200 text-gray-700 focus:outline-none focus:border-[#bf9b6a]"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2 text-sm">Rooms</label>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="w-full bg-white px-4 py-3 border border-gray-200 text-gray-700 focus:outline-none focus:border-[#bf9b6a]"
                >
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3">3 Rooms</option>
                  <option value="4">4 Rooms</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-2 text-sm">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-white px-4 py-3 border border-gray-200 text-gray-700 focus:outline-none focus:border-[#bf9b6a]"
                >
                  <option value="1-0">1 Adult, 0 Child</option>
                  <option value="2-0">2 Adults, 0 Child</option>
                  <option value="2-1">2 Adults, 1 Child</option>
                  <option value="2-2">2 Adults, 2 Children</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#bf9b6a] hover:bg-[#a8895d] text-white text-sm font-bold tracking-[0.2em] py-4 transition-colors mt-2 disabled:opacity-60"
              >
                {loading ? 'CHECKING...' : 'CHECK AVAILABILITY'}
              </button>
            </form>

            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

            {results && (
              <div className="mt-8 pt-8 border-t border-[#bf9b6a]/30 space-y-3">
                <p className="text-gray-700 text-xs font-semibold tracking-[0.2em] uppercase mb-1">
                  {checkIn} → {checkOut}
                </p>

                {results.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No rooms are set up yet — check back soon.
                  </p>
                ) : (
                  results.map((room) => (
                    <div
                      key={room.roomName}
                      className="flex items-center justify-between gap-4 bg-white px-5 py-4"
                    >
                      <div>
                        <p className="font-serif text-lg text-gray-900">{room.roomName}</p>
                        <p className="text-sm text-gray-500">
                          ${room.pricePerNight} / Night ·{' '}
                          {room.available
                            ? `${room.roomsLeft} left`
                            : 'Fully booked for these dates'}
                        </p>
                      </div>

                      {room.available ? (
                        <button
                          onClick={() =>
                            setBookingRoom({ name: room.roomName, price: room.pricePerNight })
                          }
                          className="group/btn relative overflow-hidden border rounded-sm bg-black text-white text-xs tracking-[0.25em] font-semibold px-6 py-3 shrink-0"
                        >
                          <span className="absolute inset-0 bg-[#bf9b6a] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
                          <span className="relative z-10">BOOK NOW</span>
                        </button>
                      ) : (
                        <span className="shrink-0 text-xs text-gray-400 uppercase tracking-wide">
                          Unavailable
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Need Any Help?
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
              Get in touch with us
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10">
              We&apos;re here whenever you need us — whether you&apos;re planning a stay, asking about a reservation, or simply curious about the experience. Reach out anytime and we&apos;ll get back to you within the hour.
            </p>

            <div className="space-y-6">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-[#bf9b6a] flex items-center justify-center shrink-0">
                      <Icon className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-500">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {bookingRoom && (
        <BookingModal
          room={bookingRoom}
          onClose={() => setBookingRoom(null)}
          initialValues={{
            checkIn,
            checkOut,
            guests: totalGuests,
            quantity: Number(rooms),
          }}
        />
      )}
    </section>
  );
};

export default Contact;