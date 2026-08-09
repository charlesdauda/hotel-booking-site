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