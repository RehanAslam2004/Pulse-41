import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testRLS() {
  console.log('Testing anon key read on services...');
  const { data: services, error: readError } = await supabase.from('services').select('slug, title');
  if (readError) {
    console.error('Anon read error:', readError);
  } else {
    console.log(` Anon read successful! Received ${services.length} services.`);
  }

  console.log('Testing anon key INSERT on services (should be BLOCKED by RLS)...');
  const { data: insertData, error: insertError } = await supabase.from('services').insert({
    num: '99',
    title: 'Hacked Service',
    slug: 'hacked-service',
    tagline: 'Should fail',
    typical_outcomes: 'Should fail',
    description: 'Should fail',
  });
  if (insertError) {
    console.log(` RLS correctly blocked unauthorized INSERT: ${insertError.message} (${insertError.code})`);
  } else {
    console.error(' SECURITY ERROR: Anon insert succeeded when it should be blocked!', insertData);
  }

  console.log('Testing anon key INSERT on contact_submissions (should SUCCEED)...');
  const { error: contactError } = await supabase.from('contact_submissions').insert({
    name: 'Anon Test Lead',
    email: 'test@pulse41.test',
    message: 'Testing public submission policy',
  });
  if (contactError) {
    console.error('Contact submission error:', contactError);
  } else {
    console.log(' Public contact submission succeeded as expected by RLS policy!');
  }
}

testRLS();
