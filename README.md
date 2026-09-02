# Hotel Booking

A full-stack hotel booking application for browsing rooms, checking availability, adding stays to a booking cart, and submitting reservations. The frontend is built with React and Vite. The backend is an Express API backed by MongoDB and Nodemailer.

## Features

- Responsive hotel home, about, gallery, contact, and rooms pages
- Room and suite browsing with direct booking actions
- Date and guest-based availability checks
- Multi-room booking cart persisted in browser storage
- Booking validation and overlap protection
- Booking confirmation emails through Nodemailer
- Admin-protected booking listing and status updates
- Local MongoDB development support
- MongoDB Atlas configuration for production
- API health and database readiness endpoint

## Project Structure

```text
hotel-booking/
├── backend/
│   ├── config/          MongoDB connection configuration
│   ├── controllers/     Room and booking request handlers
│   ├── middleware/      Authentication, database, and error middleware
│   ├── models/          Room and Booking schemas
│   ├── routes/          API route definitions
│   ├── seed/            Room seed data
│   ├── utils/           Email delivery helper
│   └── server.js        Express server entry point
├── public/              Static public assets
└── src/
    ├── api/             Frontend API clients
    ├── components/      Reusable React UI components
    ├── context/         Booking cart state
    └── pages/           Application pages
```

## Requirements

- Node.js 20 or newer
- npm
- MongoDB Community Server for local development, or a reachable MongoDB Atlas cluster for production

## Installation

From the project root:

```powershell
npm install
npm --prefix backend install
```

Create `backend/.env` using the following variables. Never commit this file or share its values:

```env
# Local development uses this URI when NODE_ENV is not production.
MONGODB_LOCAL_URI=mongodb://127.0.0.1:27017/hotel-booking

# Production uses this URI when NODE_ENV=production.
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>

# Comma-separated browser origins allowed to call the API.
CLIENT_URLS=http://localhost:5173
PORT=5000
ADMIN_API_KEY=replace-with-a-long-random-key
EMAIL_USER=your-sender@example.com
EMAIL_PASS=your-email-app-password
```

The backend defaults to `mongodb://127.0.0.1:27017/hotel-booking` during local development if `MONGODB_LOCAL_URI` is not set. Production requires `MONGODB_URI`.

Set `CLIENT_URLS` in Render to `https://hotel-booking-site-nu-brown.vercel.app`. Multiple origins can be separated with commas. Do not include a trailing slash.

## Local Development

Start MongoDB first, then seed the room catalog:

```powershell
npm --prefix backend run seed
```

Start the API in one terminal:

```powershell
npm --prefix backend run dev
```

Start the Vite frontend in another terminal:

```powershell
npm run dev
```

Open `http://localhost:5173`.

The Vite development server proxies `/api` requests to `http://localhost:5000`. If the API runs on another port, update `vite.config.js` and restart Vite.

## Available Commands

### Frontend

```powershell
npm run dev       # Start Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

### Backend

```powershell
npm --prefix backend run start  # Start the API
npm --prefix backend run dev    # Start the API with nodemon
npm --prefix backend run seed   # Reset and seed room data
```

For Render, set the service root directory to `backend`, use `npm install` as the build command, and use `npm start` as the start command. Render supplies the `PORT` environment variable automatically; the API listens on it through `process.env.PORT`.

The current production URLs are:

- Frontend: `https://hotel-booking-site-nu-brown.vercel.app`
- Backend: `https://hotel-booking-site-pudw.onrender.com`

Set these Render environment variables exactly:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
CLIENT_URLS=https://hotel-booking-site-nu-brown.vercel.app
ADMIN_API_KEY=<strong-random-secret>
EMAIL_USER=<sender-email>
EMAIL_PASS=<email-app-password>
```

Set this Vercel environment variable for Production, Preview, and Development as needed:

```env
VITE_API_URL=https://hotel-booking-site-pudw.onrender.com
```

## API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `GET` | `/` | API status | None |
| `GET` | `/api/health` | API and database readiness | None |
| `GET` | `/api/rooms` | List rooms | None |
| `POST` | `/api/rooms/check-availability` | Check rooms for dates and guests | None |
| `POST` | `/api/bookings` | Create one or more bookings | None |
| `GET` | `/api/bookings` | List bookings | `x-admin-key` header |
| `GET` | `/api/bookings/:id` | Get a booking | None |
| `PATCH` | `/api/bookings/:id/status` | Change booking status | `x-admin-key` header |

A healthy local API returns:

```json
{"status":"ok","database":"connected"}
```

A `503` response means the API is running but MongoDB is not ready.

## Booking Payload

`POST /api/bookings` expects an `items` array:

```json
{
  "items": [
    {
      "roomName": "Luxury Suite Room",
      "guestName": "Guest Name",
      "email": "guest@example.com",
      "phone": "+233000000000",
      "checkIn": "2026-10-01",
      "checkOut": "2026-10-03",
      "guests": 2,
      "quantity": 1,
      "specialRequests": "Late arrival"
    }
  ]
}
```

Bookings are rejected when dates are invalid, the room does not exist, or the requested quantity overlaps existing reservations.

## Production Checklist

Before deployment:

- Use a production MongoDB Atlas URI and configure Atlas Network Access.
- Set `NODE_ENV=production` so the backend uses `MONGODB_URI`.
- Use a strong, rotated `ADMIN_API_KEY`.
- Use an email provider and app password stored in deployment secrets.
- Set `CLIENT_URLS` to the deployed frontend origin.
- Set the frontend `VITE_API_URL` to the deployed API URL, or configure the production web server to proxy `/api`.
- Run `npm run lint`, `npm run build`, and the backend seed process against the intended database.
- Confirm `/api/health` returns database `connected`.
- Configure HTTPS, logging, backups, monitoring, and rate limiting before public launch.
- Rotate any credentials that have previously been exposed or shared during development.

## Security Notes

- `backend/.env` is ignored by Git and must remain private.
- Admin endpoints require the `x-admin-key` request header.
- Do not use development credentials in production.
- Email failures are logged without preventing a successfully stored booking; configure monitoring if confirmation delivery is business-critical.

## License

See [LICENSE](LICENSE).
