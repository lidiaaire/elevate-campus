import puppeteer from './frontend/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE   = 'http://localhost:3000';

const MOCK_USER  = { id: 1, firstName: 'Ana', lastName: 'García', role: 'student' };
const MOCK_TOKEN = 'mock-token-for-screenshot';

const MOCK_DASHBOARD = {
  profile: { firstName: 'Ana', lastName: 'García', role: 'student' },
  summary: { overallProgressAvg: 68, streakDays: 12 },
  growth: { lessonsCompleted7d: 9, progressGained7d: 14 },
  skillProgress: {
    _source: 'preliminary',
    listening: 72,
    reading: 85,
    assessmentScore: 76,
    writing: 61,
    speaking: null,
  },
  enrollments: [
    { enrollmentId: 1, courseTitle: 'Business English B2', overallProgress: 82, completedLessons: 18, totalLessons: 22 },
    { enrollmentId: 2, courseTitle: 'Academic Writing C1', overallProgress: 45, completedLessons: 9, totalLessons: 20 },
    { enrollmentId: 3, courseTitle: 'Conversational English A2', overallProgress: 31, completedLessons: 5, totalLessons: 16 },
  ],
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1440, height: 900 },
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
});

try {
  const page = await browser.newPage();

  // Intercept the API call and return mock data
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('/api/dashboard/student')) {
      req.respond({
        status: 200,
        contentType: 'application/json',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        },
        body: JSON.stringify(MOCK_DASHBOARD),
      });
    } else {
      req.continue();
    }
  });

  // First, navigate to root to set localStorage
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });

  await page.evaluate((user, token) => {
    localStorage.setItem('auth_user',  JSON.stringify(user));
    localStorage.setItem('auth_token', JSON.stringify(token));
  }, MOCK_USER, MOCK_TOKEN);

  // Navigate to dashboard
  await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle0', timeout: 15000 });

  // Wait a bit more for animations
  await new Promise(r => setTimeout(r, 1200));

  const buf = await page.screenshot({ fullPage: true });
  writeFileSync('dashboard_screenshot.png', buf);
  console.log('Screenshot saved: dashboard_screenshot.png');

  // Also screenshot above-the-fold
  const page2 = await browser.newPage();
  await page2.setRequestInterception(true);
  page2.on('request', (req) => {
    if (req.url().includes('/api/dashboard/student')) {
      req.respond({ status: 200, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(MOCK_DASHBOARD) });
    } else { req.continue(); }
  });
  await page2.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page2.evaluate((user, token) => {
    localStorage.setItem('auth_user',  JSON.stringify(user));
    localStorage.setItem('auth_token', JSON.stringify(token));
  }, MOCK_USER, MOCK_TOKEN);
  await page2.setViewport({ width: 1440, height: 900 });
  await page2.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1200));
  const buf2 = await page2.screenshot({ fullPage: false });
  writeFileSync('dashboard_viewport.png', buf2);
  console.log('Viewport screenshot saved: dashboard_viewport.png');

} finally {
  await browser.close();
}
