# Hotel Booking Project Checklist

This checklist tracks the work required to take the hotel booking application from local development to production.

## Completed

### Frontend Experience

- [x] Set up the React and Vite application structure.
- [x] Build the home page with hero carousel, about, services, pricing, hospitality, promotions, testimonials, and footer sections.
- [x] Build About, Gallery, Contact, and Rooms & Suites pages.
- [x] Add responsive navigation, mobile menu, footer links, and scroll-to-top behavior.
- [x] Add room cards with consistent booking actions and pricing.
- [x] Add direct navigation to the luxury rooms section from browse links.
- [x] Add booking modal validation for dates, guests, contact details, and room quantity.
- [x] Add browser-persisted booking cart with add, remove, clear, and total actions.
- [x] Add frontend API error handling and local `/api` proxy support.

### Backend and Data

- [x] Set up the Express API with JSON parsing and CORS.
- [x] Add MongoDB connection handling for local development and production.
- [x] Add Room and Booking Mongoose models with validation and indexes.
- [x] Add room listing and date-based availability endpoints.
- [x] Add booking creation with date validation, room validation, quantity checks, and overlap protection.
- [x] Add booking lookup and admin-protected booking management endpoints.
- [x] Add booking status transition rules.
- [x] Add room seed data for all six bookable rooms.
- [x] Add booking confirmation email delivery through Nodemailer.
- [x] Add `/api/health` readiness reporting.
- [x] Add consistent `503` responses when MongoDB is unavailable.
- [x] Add automatic MongoDB retry after temporary startup failures.
- [x] Add backend syntax checks and clean ESLint configuration.

### Verification

- [x] Verify local MongoDB connection.
- [x] Verify room seeding succeeds locally.
- [x] Verify room availability responses.
- [x] Verify invalid booking requests return useful errors.
- [x] Run `npm run lint` successfully.
- [x] Run `npm run build` successfully.

## Before Production

### Configuration and Security

- [ ] Create a production-only MongoDB Atlas database and least-privilege database user.
- [ ] Configure Atlas Network Access for the production server.
- [ ] Set `NODE_ENV=production` in the deployment environment.
- [ ] Set `MONGODB_URI` to the production connection string.
- [ ] Set `CLIENT_URL` to the deployed frontend origin.
- [ ] Set a long, randomly generated `ADMIN_API_KEY`.
- [ ] Configure a production email provider and app password.
- [ ] Rotate all credentials that were exposed during development.
- [ ] Confirm no `.env` files, passwords, or API keys are tracked by Git.

### Testing and Reliability

- [ ] Add automated backend tests for room listing and availability.
- [ ] Add automated booking tests for valid, invalid, overlapping, and cancelled bookings.
- [ ] Add tests for admin authentication and status transitions.
- [ ] Test email delivery with a staging mailbox.
- [ ] Test frontend booking flow against a staging API.
- [ ] Add request rate limiting and production request logging.
- [ ] Add centralized error monitoring and uptime monitoring.
- [ ] Configure MongoDB backups and verify a restore procedure.

### Deployment

- [ ] Choose hosting for the frontend and backend.
- [ ] Configure the production API URL with `VITE_API_URL`.
- [ ] Configure the production web server or hosting platform to proxy `/api` where required.
- [ ] Run the seed process only against the intended staging or empty production database.
- [ ] Run `npm run lint` and `npm run build` in CI before deployment.
- [ ] Enable HTTPS and verify CORS from the deployed frontend.
- [ ] Verify `/api/health` returns `database: connected` after deployment.
- [ ] Complete a real staging booking from room selection through email confirmation.
- [ ] Document rollback, support, and incident-response procedures.

## Future Improvements

- [ ] Add a dedicated admin dashboard instead of header-key-only administration.
- [ ] Add booking cancellation and guest self-service lookup.
- [ ] Add payment processing and payment status tracking.
- [ ] Replace room-name references with stable room IDs.
- [ ] Add room image management and availability calendars.
- [ ] Add pagination and filtering for admin booking lists.

