import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testLogin() {
  console.log('Testing admin sign in with password...');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@pulse41.com',
    password: 'Pulse41Admin2026!'
  });

  if (error) {
    console.error('Sign in failed:', error.message);
    process.exit(1);
  }

  console.log('Sign in successful!');
  console.log('User ID:', data.user.id);
  console.log('Email:', data.user.email);
  console.log('App metadata:', data.user.app_metadata);
  console.log('Role:', data.user.app_metadata?.role);
}

testLogin().catch(console.error);
