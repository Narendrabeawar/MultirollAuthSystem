'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from '@/components/providers/session-provider'
import { getDashboardPath, UserRole } from '@/lib/supabase/auth-helpers'

export function useAuthRedirect() {
  const { user, profile, loading } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && user) {
      // If user is logged in, redirect them to their appropriate dashboard
      if (profile) {
        if (profile.approved) {
          const dashboardPath = getDashboardPath(profile.role as UserRole)
          // Only redirect if not already on a dashboard page
          if (!pathname?.startsWith('/dashboard')) {
            router.replace(dashboardPath)
          }
        } else {
          // If user is not approved, redirect to waiting page
          if (pathname !== '/waiting-for-approval') {
            router.replace('/waiting-for-approval')
          }
        }
      } else {
        // If profile doesn't exist, redirect to waiting page
        if (pathname !== '/waiting-for-approval') {
          router.replace('/waiting-for-approval')
        }
      }
    }
  }, [user, profile, loading, router, pathname])

  return { user, profile, loading }
}
