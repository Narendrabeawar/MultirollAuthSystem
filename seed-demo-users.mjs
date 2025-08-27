// Seed demo users into Supabase Auth using the Admin API
// Usage:
// 1) Create a .env.local (or .env) with:
//    SUPABASE_URL=your_project_url
//    SUPABASE_SERVICE_ROLE=your_service_role_key
// 2) Run: node scripts/seed-demo-users.mjs
// 3) Then run the SQL file admin_setup.sql in Supabase SQL editor (or via psql) to ensure roles

import dotenv from 'dotenv'

import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: '.env' })


const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRole = process.env.SUPABASE_SERVICE_ROLE

if (!url || !serviceRole) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE in env')
  process.exit(1)
}

const admin = createClient(url, serviceRole)

const demoUsers = [
  { email: 'sadmin@sadmin.com', password: 'sadmin123', user_metadata: { full_name: 'Super Admin' } },
  { email: 'admin@admin.com', password: 'admin123', user_metadata: { full_name: 'Admin' } },
  { email: 'user1@1user.com', password: '1user123', user_metadata: { full_name: 'User One' } },
  { email: 'user2@2user.com', password: '2user123', user_metadata: { full_name: 'User Two' } },
]

async function ensureUser({ email, password, user_metadata }) {
  // Check if user exists
  const { data: list, error: listError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })
  if (listError) throw listError
  const exists = list.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
  if (exists) {
    console.log(`✔ User exists: ${email}`)
    return exists
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata,
  })
  if (error) throw error
  console.log(`➕ Created: ${email}`)
  return data.user
}

;(async () => {
  try {
    for (const u of demoUsers) {
      await ensureUser(u)
    }
    console.log('\nDone. Now run admin_setup.sql in Supabase to set roles in profiles.')
  } catch (e) {
    console.error('Seeding failed:', e)
    process.exit(1)
  }
})()

