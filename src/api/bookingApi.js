const API_URL = import.meta.env.VITE_API_URL || 'https://hotel-booking-site-pudw.onrender.com';

const request = async (path, options, fallbackMessage) => {
  try {
    const res = await fetch(`${API_URL}${path}`, options);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || fallbackMessage);
    }

    return res.json();
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Cannot reach the booking server. Please check that the backend is running.');
    }
    throw err;
  }
};

export async function submitBookings(items) {
  return request('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  }, 'Something went wrong while confirming your booking.');
}

export async function checkAvailability({ checkIn, checkOut, guests }) {
  return request('/api/rooms/check-availability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ checkIn, checkOut, guests }),
  }, 'Could not check availability right now.');
}