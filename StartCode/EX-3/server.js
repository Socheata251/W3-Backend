import express from 'express';
import courses from './course.js';
import { logger } from './logger.js';
import { validateQuery } from './validateQuery.js';
import { auth } from './auth.js'; // optional

const app = express();
const PORT = 3000;

app.use(logger);

app.get('/departments/:dept/courses', validateQuery, (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;

  const min = minCredits !== undefined ? parseInt(minCredits) : null;
  const max = maxCredits !== undefined ? parseInt(maxCredits) : null;

  let results = courses.filter(course => {
    if (course.department.toLowerCase() !== dept.toLowerCase()) return false;
    if (level && course.level !== level) return false;
    if (min !== null && course.credits < min) return false;
    if (max !== null && course.credits > max) return false;
    if (semester && course.semester !== semester) return false;
    if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;
    return true;
  });

  res.json({ results, meta: { total: results.length } });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
