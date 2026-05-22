
export function validateQuery(req, res, next) {
  const { minCredits, maxCredits } = req.query;

  if (minCredits !== undefined && !Number.isInteger(Number(minCredits))) {
    return res.status(400).json({ error: 'minCredits must be a valid integer' });
  }

  if (maxCredits !== undefined && !Number.isInteger(Number(maxCredits))) {
    return res.status(400).json({ error: 'maxCredits must be a valid integer' });
  }

  const min = minCredits !== undefined ? parseInt(minCredits) : null;
  const max = maxCredits !== undefined ? parseInt(maxCredits) : null;

  if (min !== null && max !== null && min > max) {
    return res.status(400).json({ error: 'minCredits cannot be greater than maxCredits' });
  }

  next();
}
