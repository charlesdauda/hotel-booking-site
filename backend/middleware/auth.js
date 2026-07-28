// Simple API-key guard for admin-only routes (listing all bookings,
// changing a booking's status). This isn't a full user/session auth
// system — there's no login, no roles — just a shared secret the
// admin dashboard sends on every request. It's a reasonable minimum
// for a small single-admin site; swap it for real session/JWT auth
// if you ever need multiple staff accounts or finer-grained roles.
export const requireAdmin = (req, res, next) => {
  if (!process.env.ADMIN_API_KEY) {
    console.error('ADMIN_API_KEY is not set in the environment — refusing admin request.');
    return res.status(500).json({ message: 'Server is not configured for admin access.' });
  }

  const key = req.headers['x-admin-key'];

  if (!key || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  next();
};