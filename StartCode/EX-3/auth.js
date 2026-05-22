
const VALID_TOKEN = 'xyz123';

export function auth(req, res, next) {
  const { token } = req.query;
  if (!token || token !== VALID_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid token' });
  }
  next();
}
