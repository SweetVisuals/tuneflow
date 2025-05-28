import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fbgncijhtbplnepysbld.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ25jaWpodGJwbG5lcHlzYmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzU0OTAsImV4cCI6MjA2Mjk1MTQ5MH0.Vfgl9ExKjODdOGsvEFDzyBbU_5L1Rm8sSdDhXGRzX70'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: localStorage
  }
})

export async function logout() {
  try {
    console.log('logout function called');
    // Sign out from supabase client
    await supabase.auth.signOut();
    
    // Clear only the specific auth token from localStorage
    localStorage.removeItem('sb-fbgncijhtbplnepysbld-auth-auth-token');
    
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
}