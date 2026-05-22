// server.js
import express from 'express';
import courses from './course.js';

const app = express();
const PORT = 3000;

app.get('/departments/:dept/courses', (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;

  // Edge case: invalid credit range
  const min = minCredits !== undefined ? parseInt(minCredits) : null;
  const max = maxCredits !== undefined ? parseInt(maxCredits) : null;

  if (min !== null && max !== null && min > max) {
    return res.status(400).json({ error: 'minCredits cannot be greater than maxCredits' });
  }

  let results = courses.filter(course => {
    // Match department (case-insensitive)
    if (course.department.toLowerCase() !== dept.toLowerCase()) return false;

    // Filter by level
    if (level && course.level !== level) return false;

    // Filter by minCredits
    if (min !== null && course.credits < min) return false;

    // Filter by maxCredits
    if (max !== null && course.credits > max) return false;

    // Filter by semester
    if (semester && course.semester !== semester) return false;

    // Filter by instructor (partial match, case-insensitive)
    if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;

    return true;
  });

  res.json({
    results,
    meta: { total: results.length }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});