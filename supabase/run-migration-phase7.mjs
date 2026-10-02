import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
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
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('ERROR: DATABASE_URL is not set in .env.local');
  process.exit(1);
}

console.log('Connecting to PostgreSQL database via pooler...');
const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    console.log('Connected successfully!');
    const sqlPath = path.resolve(__dirname, 'migrations/003_pulse41_control.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Executing 003_pulse41_control.sql...');
    await client.query(sql);
    console.log('✅ Migration 003_pulse41_control.sql executed successfully!');

    // Verify all created tables
    const { rows: tables } = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('Verified Public Tables:', tables.map(t => t.table_name).join(', '));

    // Verify back-populated organizations
    const { rows: orgs } = await client.query(`SELECT name, industry, status FROM public.organizations;`);
    console.log('Verified Organizations:', orgs);

    // Verify back-populated contacts
    const { rows: contacts } = await client.query(`SELECT name, email, job_title FROM public.contacts;`);
    console.log('Verified Contacts:', contacts);

    // Verify activity logs
    const { rows: logs } = await client.query(`SELECT action, entity_type FROM public.admin_activity_logs;`);
    console.log('Verified Audit Logs Count:', logs.length);

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
