import pg from 'pg';
import fs from 'node:fs';

let connectionString = process.env.DATABASE_URL;
if (!connectionString && fs.existsSync('.env.local')) {
  const content = fs.readFileSync('.env.local', 'utf8');
  for (const line of content.split('\n')) {
    if (line.startsWith('DATABASE_URL=')) {
      connectionString = line.substring('DATABASE_URL='.length).trim();
    }
  }
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  const res = await client.query("SELECT id, email, raw_app_meta_data, created_at FROM auth.users WHERE email = 'admin@pulse41.com'");
  console.log('Admin user found count:', res.rows.length);
  if (res.rows.length > 0) {
    console.log('Admin details:', res.rows[0]);
  }
  await client.end();
}

main().catch(console.error);
