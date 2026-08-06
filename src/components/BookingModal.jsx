import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { useBooking } from "../context/useBooking";

// room: { name, price, image }
// onClose: called to dismiss the modal
// initialValues: optional { checkIn, checkOut, guests, quantity } to pre-fill,
// e.g. when arriving from the Contact page's availability search
const BookingModal = ({ room, onClose, initialValues = {} }) => {
  const { addBooking } = useBooking();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: initialValues.checkIn || '',
    checkOut: initialValues.checkOut || '',
    guests: initialValues.guests || 1,
    quantity: initialValues.quantity || 1,
    specialRequests: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(
          0,
          Math.round((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000)
        )
      : 0;

  const totalPrice = nights * room.price * Number(form.quantity || 1);

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.';
    if (!form.phone.trim()) next.phone = 'Enter a phone number.';
    if (!form.checkIn) next.checkIn = 'Pick a check-in date.';
    if (!form.checkOut) next.checkOut = 'Pick a check-out date.';
    if (form.checkIn && form.checkOut && nights <= 0)
      next.checkOut = 'Check-out must be after check-in.';
    if (!form.guests || form.guests < 1) next.guests = 'At least 1 guest.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addBooking({
      roomName: room.name,
      roomImage: room.image,
      pricePerNight: room.price,
      guestName: form.fullName,
      email: form.email,
      phone: form.phone,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: Number(form.guests),
      quantity: Number(form.quantity),
      nights,
      totalPrice,
      specialRequests: form.specialRequests,
    });

    setSubmitted(true);
    setTimeout(onClose, 1400);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/50 transition-opacity duration-200"
      />
      <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            aria-label="Close booking form"
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors"
          >
            <HiX className="text-2xl" />
          </button>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center px-10 py-20">
              <div className="w-16 h-16 rounded-full bg-[#f5ede0] flex items-center justify-center mb-6">
                <span className="text-[#bf9b6a] text-3xl">✓</span>
              </div>
              <h3 className="font-serif text-2xl text-[#0f2c3f] mb-2">Added to your booking</h3>
              <p className="text-gray-500">Review it anytime from the bed icon above.</p>
            </div>
          ) : (
            <div className="p-8 lg:p-10">
              <span className="h-1.5 w-16 bg-[#bf9b6a] block mb-6" />
              <p className="text-[#bf9b6a] text-sm font-semibold tracking-[0.3em] uppercase mb-1">
                Reserve Your Stay
              </p>
              <h3 className="font-serif text-3xl text-gray-900 mb-1">{room.name}</h3>
              <p className="text-gray-500 mb-8">${room.price} / Night</p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Check-in" error={errors.checkIn}>
                    <input
                      type="date"
                      name="checkIn"
                      min={today}
                      value={form.checkIn}
                      onChange={handleChange}
                      className={inputClass(errors.checkIn)}
                    />
                  </Field>
                  <Field label="Check-out" error={errors.checkOut}>
                    <input
                      type="date"
                      name="checkOut"
                      min={form.checkIn || today}
                      value={form.checkOut}
                      onChange={handleChange}
                      className={inputClass(errors.checkOut)}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Guests" error={errors.guests}>
                    <input
                      type="number"
                      name="guests"
                      min={1}
                      max={10}
                      value={form.guests}
                      onChange={handleChange}
                      className={inputClass(errors.guests)}
                    />
                  </Field>
                  <Field label="Rooms">
                    <input
                      type="number"
                      name="quantity"
                      min={1}
                      max={5}
                      value={form.quantity}
                      onChange={handleChange}
                      className={inputClass()}
                    />
                  </Field>
                </div>

                <Field label="Full Name" error={errors.fullName}>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass(errors.fullName)}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass(errors.email)}
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+233 ..."
                      className={inputClass(errors.phone)}
                    />
                  </Field>
                </div>

                <Field label="Special Requests (optional)">
                  <textarea
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Early check-in, extra pillows, dietary needs..."
                    className={inputClass()}
                  />
                </Field>

                {nights > 0 && (
                  <div className="bg-[#f5ede0] px-5 py-4 flex items-center justify-between">
                    <span className="text-gray-600 text-sm">
                      {nights} night{nights > 1 ? 's' : ''} × {form.quantity} room
                      {form.quantity > 1 ? 's' : ''}
                    </span>
                    <span className="font-serif text-xl text-[#0f2c3f]">${totalPrice}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="group/btn relative overflow-hidden border rounded-sm bg-black text-white text-xs tracking-[0.25em] font-semibold px-10 py-4 w-full"
                >
                  <span className="absolute inset-0 bg-[#bf9b6a] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">ADD TO BOOKING</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold tracking-wide uppercase text-gray-500 mb-1.5">
      {label}
    </span>
    {children}
    {error && <span className="block text-red-500 text-xs mt-1">{error}</span>}
  </label>
);

const inputClass = (error) =>
  `w-full border ${
    error ? 'border-red-400' : 'border-gray-200'
  } focus:border-[#bf9b6a] focus:outline-none px-4 py-2.5 text-sm text-gray-800 transition-colors`;

export default BookingModal;