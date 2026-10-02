import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local
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

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.iiolrkvwvpekochuclwu:045dPmvT4ytAsCRW@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  console.log('Connecting to PostgreSQL pooler...');
  await client.connect();
  console.log('Connected! Reading migration 002...');

  const sqlPath = path.resolve(__dirname, 'migrations/002_job_applications.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Executing migration 002...');
  await client.query(sql);

  console.log('Verifying table public.job_applications...');
  const tableCheck = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'job_applications'
  `);
  console.log('Columns in job_applications:', tableCheck.rows.map(r => `${r.column_name} (${r.data_type})`));

  console.log('Verifying storage bucket pulse41-resumes...');
  const bucketCheck = await client.query(`
    SELECT id, name, public, file_size_limit, allowed_mime_types 
    FROM storage.buckets 
    WHERE id = 'pulse41-resumes'
  `);
  console.log('Bucket status:', bucketCheck.rows[0]);

  await client.end();
  console.log('\nMigration 002 executed successfully!');
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
