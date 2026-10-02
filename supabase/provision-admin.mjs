/**
 * Pulse41 Admin Provisioning Script
 * Creates or updates the primary administrator account (admin@pulse41.com)
 * in Supabase Auth and ensures admin role assignment.
 */

import { createClient } from '@supabase/supabase-js';
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@pulse41.com';
const ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || 'Pulse41Admin2026!';

async function provisionAdmin() {
  console.log(`Checking existing users for ${ADMIN_EMAIL}...`);

  const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    console.error('Failed to list users:', listError.message);
    process.exit(1);
  }

  const existingUser = usersData.users.find(u => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  if (existingUser) {
    console.log(`User ${ADMIN_EMAIL} exists (ID: ${existingUser.id}). Updating password and admin claims...`);
    const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      existingUser.id,
      {
        password: ADMIN_PASSWORD,
        email_confirm: true,
        app_metadata: { role: 'admin' },
        user_metadata: { name: 'Pulse41 Administrator', role: 'admin' },
      }
    );

    if (updateError) {
      console.error('Failed to update admin user:', updateError.message);
      process.exit(1);
    }

    console.log('Successfully updated admin user credentials and claims:', updateData.user.id);
  } else {
    console.log(`Creating new admin user: ${ADMIN_EMAIL}...`);
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { name: 'Pulse41 Administrator', role: 'admin' },
    });

    if (createError) {
      console.error('Failed to create admin user:', createError.message);
      process.exit(1);
    }

    console.log('Successfully created admin user:', createData.user.id);
  }

  console.log('\n=============================================');
  console.log('Pulse41 Admin Credentials:');
  console.log(`Email:    ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log('Role:     admin');
  console.log('=============================================\n');
}

provisionAdmin().catch(console.error);
