import { supabase } from './client'

// User roles enum
export enum UserRole {
  SUPER_ADMIN = 'superAdmin',
  ADMIN = 'admin',
  USER1 = 'user1',
  USER2 = 'user2',
  USER3 = 'user3'
}

// User profile interface
export interface UserProfile {
  id: string
  email: string
  role: UserRole
  full_name?: string
  avatar_url?: string
  approved?: boolean
  created_at: string
}

// Check if Supabase is properly configured
function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key'
}

// Sign up function
export async function signUp(email: string, password: string, fullName: string) {
  try {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not properly configured. Please set up your environment variables.')
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: UserRole.USER1, // Default role
          approved: false, // approval workflow
        }
      }
    })

    if (error) throw error

    // Important: do NOT insert into profiles here.
    // The database trigger creates the profile row.

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Sign in function
export async function signIn(email: string, password: string) {
  try {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not properly configured. Please set up your environment variables.')
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Sign out function
export async function signOut() {
  try {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not properly configured. Please set up your environment variables.')
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    if (!isSupabaseConfigured()) {
      return { user: null, error: new Error('Supabase is not properly configured.') }
    }

    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return { user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

// Get user profile
export async function getUserProfile(userId: string) {
  try {
    if (!isSupabaseConfigured()) {
      return { profile: null, error: new Error('Supabase is not properly configured.') }
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      // If profile not found, return null instead of throwing error
      if (error.code === 'PGRST116') {
        return { profile: null, error: null }
      }
      throw error
    }
    return { profile: data, error: null }
  } catch (error) {
    return { profile: null, error }
  }
}

// Update user profile
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not properly configured. Please set up your environment variables.')
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return { profile: data, error: null }
  } catch (error) {
    return { profile: null, error }
  }
}

// Check if user has access to role
export function hasRoleAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    [UserRole.SUPER_ADMIN]: 5,
    [UserRole.ADMIN]: 4,
    [UserRole.USER1]: 3,
    [UserRole.USER2]: 2,
    [UserRole.USER3]: 1,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

// Get dashboard path based on role
export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return '/dashboard/superadmin'
    case UserRole.ADMIN:
      return '/dashboard/admin'
    case UserRole.USER1:
      return '/dashboard/user1'
    case UserRole.USER2:
      return '/dashboard/user2'
    case UserRole.USER3:
      return '/dashboard/user3'
    default:
      return '/dashboard/user1'
  }
}
