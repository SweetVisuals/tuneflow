import { createClient } from "@supabase/supabase-js"

const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ25jaWpodGJwbG5lcHlzYmxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzM3NTQ5MCwiZXhwIjoyMDYyOTUxNDkwfQ.o46erUPw6uWTdU5XjHQXmp0HHLyubqWBbUzB-cFVyWE"
const supabaseAdmin = createClient(
  "https://fbgncijhtbplnepysbld.supabase.co",
  serviceRoleKey
)

async function migrateUser(username: string) {
  try {
    // Check if user exists in profiles table
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (profileError || !profile) {
      console.error('User not found in profiles table')
      return
    }

    // Check if already exists in users table
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    if (existingUser) {
      console.log('User already exists in users table')
      return
    }

    // Migrate to users table
    const { error } = await supabaseAdmin
      .from('users')
      .insert({
        id: profile.id,
        email: profile.email,
        username: profile.username,
        name: profile.full_name,
        avatar_url: profile.avatar_url,
        bio: profile.bio
      })

    if (error) {
      console.error('Migration failed:', error)
    } else {
      console.log('Successfully migrated user:', username)
    }
  } catch (error) {
    console.error('Migration error:', error)
  }
}

async function migrateAllUsers() {
  // Get all users from profiles table
  const { data: profiles, error } = await supabaseAdmin
    .from('profiles')
    .select('username')

  if (error) {
    console.error('Error fetching profiles:', error)
    return
  }

  if (!profiles || profiles.length === 0) {
    console.log('No profiles found to migrate')
    return
  }

  console.log(`Migrating ${profiles.length} users...`)
  
  for (const profile of profiles) {
    await migrateUser(profile.username)
  }

  console.log('Migration complete')
}

// Run migration for all users
migrateAllUsers()
