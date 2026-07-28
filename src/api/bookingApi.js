const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function submitBookings(items) {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Something went wrong while confirming your booking.');
  }

  return res.json();
}

export async function checkAvailability({ checkIn, checkOut, guests }) {
  const res = await fetch(`${API_URL}/api/rooms/check-availability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ checkIn, checkOut, guests }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Could not check availability right now.');
  }

  return res.json();
}