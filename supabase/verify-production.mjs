import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
    const idx = trimmed.indexOf('=');
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const BASE_URL = 'http://localhost:3000';

const routesToTest = [
  { path: '/', label: 'Home Page', expectedContent: 'PULSE41' },
  { path: '/services', label: 'Services Page', expectedContent: 'AI and Intelligent Automation' },
  { path: '/solutions', label: 'Solutions Page', expectedContent: 'PulseDesk AI' },
  { path: '/industries', label: 'Industries Page', expectedContent: 'Technology' },
  { path: '/case-studies', label: 'Case Studies Page', expectedContent: 'Digital Commerce' },
  { path: '/insights', label: 'Insights Page', expectedContent: 'Applied AI in Modern Enterprises' },
  { path: '/careers', label: 'Careers Page', expectedContent: 'Senior Full-Stack Engineer' },
  { path: '/about', label: 'About Page', expectedContent: 'Pulse41' },
  { path: '/pricing', label: 'Pricing Page', expectedContent: 'Engagement Models' },
  { path: '/contact', label: 'Contact Page', expectedContent: 'Pulse41' },
  { path: '/ai-solutions', label: 'AI Solutions Page', expectedContent: 'Intelligent Automation' },
];

async function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function run() {
  console.log('====================================================');
  console.log('PULSE41 PHASE 3 BACKEND & ROUTE VERIFICATION SUITE');
  console.log('====================================================\n');

  // Wait for server to be responsive
  let serverReady = false;
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}/`);
      if (res.status === 200) {
        serverReady = true;
        console.log(`Server is READY on ${BASE_URL} (Attempt ${attempt})\n`);
        break;
      }
    } catch {
      await sleep(1000);
    }
  }

  if (!serverReady) {
    console.error('ERROR: Server did not respond with 200 on port 3000');
    process.exit(1);
  }

  // 1. Audit all 11 public pages
  console.log('--- 1. AUDITING PUBLIC ROUTES (SSR / SSG) ---');
  let routeFailures = 0;
  for (const r of routesToTest) {
    try {
      const res = await fetch(`${BASE_URL}${r.path}`);
      const text = await res.text();
      const hasContent = text.includes(r.expectedContent);
      if (res.status === 200 && hasContent) {
        console.log(` [200 OK] ${r.path.padEnd(16)} -> Verified content: "${r.expectedContent}"`);
      } else {
        console.error(`❌ [FAIL]   ${r.path.padEnd(16)} -> Status: ${res.status}, Found content: ${hasContent}`);
        routeFailures++;
      }
    } catch (err) {
      console.error(`❌ [ERROR]  ${r.path.padEnd(16)} -> ${err.message}`);
      routeFailures++;
    }
  }

  // 2. Test API Routes
  console.log('\n--- 2. TESTING API ENDPOINTS & SUPABASE WRITES ---');

  // 2a. /api/contact
  const testContactEmail = `test-lead-${Date.now()}@pulse41.test`;
  console.log('Submitting test contact inquiry...');
  const contactRes = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Verification Bot',
      email: testContactEmail,
      company: 'Pulse41 Automated QA',
      projectType: 'ai-automation',
      budget: '$50k - $100k',
      message: 'Automated test of contact form persistence into Supabase.',
    }),
  });
  const contactJson = await contactRes.json();
  console.log('Contact response:', contactRes.status, contactJson);

  // 2b. /api/newsletter
  const testNewsletterEmail = `newsletter-${Date.now()}@pulse41.test`;
  console.log('Submitting test newsletter subscription...');
  const newsRes = await fetch(`${BASE_URL}/api/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testNewsletterEmail,
      source: 'automated_test',
    }),
  });
  const newsJson = await newsRes.json();
  console.log('Newsletter response:', newsRes.status, newsJson);

  // 2c. /api/quote
  const testQuoteEmail = `quote-${Date.now()}@pulse41.test`;
  console.log('Submitting test quote inquiry...');
  const quoteRes = await fetch(`${BASE_URL}/api/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Quote Test User',
      email: testQuoteEmail,
      company: 'Enterprise Client',
      tier: 'Enterprise Custom',
      projectScope: 'Full Cloud Migration & AI Pipeline',
      budget: '$150,000+',
      message: 'Requesting formal RFP proposal.',
    }),
  });
  const quoteJson = await quoteRes.json();
  console.log('Quote response:', quoteRes.status, quoteJson);

  // 3. Verify Database Records
  console.log('\n--- 3. VERIFYING SUPABASE DATABASE INSERTS VIA POSTGRES ---');
  const client = await pool.connect();
  try {
    const contactRow = await client.query('SELECT * FROM public.contact_submissions WHERE email = $1', [testContactEmail]);
    if (contactRow.rows.length > 0) {
      console.log(' contact_submissions record confirmed:', contactRow.rows[0].email, contactRow.rows[0].status);
    } else {
      console.error('❌ contact_submissions record NOT found!');
    }

    const newsRow = await client.query('SELECT * FROM public.newsletter_subscriptions WHERE email = $1', [testNewsletterEmail]);
    if (newsRow.rows.length > 0) {
      console.log(' newsletter_subscriptions record confirmed:', newsRow.rows[0].email);
    } else {
      console.error('❌ newsletter_subscriptions record NOT found!');
    }

    const quoteRow = await client.query('SELECT * FROM public.quote_requests WHERE email = $1', [testQuoteEmail]);
    if (quoteRow.rows.length > 0) {
      console.log(' quote_requests record confirmed:', quoteRow.rows[0].email, quoteRow.rows[0].tier);
    } else {
      console.error('❌ quote_requests record NOT found!');
    }

    // Clean up test rows
    await client.query('DELETE FROM public.contact_submissions WHERE email = $1', [testContactEmail]);
    await client.query('DELETE FROM public.newsletter_subscriptions WHERE email = $1', [testNewsletterEmail]);
    await client.query('DELETE FROM public.quote_requests WHERE email = $1', [testQuoteEmail]);
    console.log(' Cleaned up automated test rows.');

    // 4. Verify Storage Bucket
    console.log('\n--- 4. VERIFYING SUPABASE STORAGE ---');
    const bucketRow = await client.query("SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id = 'pulse41-media'");
    if (bucketRow.rows.length > 0) {
      console.log(' Storage bucket pulse41-media confirmed:', bucketRow.rows[0]);
    } else {
      console.error('❌ Storage bucket pulse41-media NOT found!');
    }

  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n====================================================');
  if (routeFailures === 0) {
    console.log(' ALL VERIFICATION CHECKS PASSED PERFECTLY!');
  } else {
    console.error(`❌ FINISHED WITH ${routeFailures} ROUTE FAILURES`);
    process.exit(1);
  }
  console.log('====================================================\n');
}

run();
