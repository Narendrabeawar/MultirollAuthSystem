'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Sidebar from '@/components/layout/sidebar'
import { useSession } from '@/components/providers/session-provider'
import { UserRole, getDashboardPath } from '@/lib/supabase/auth-helpers'
import { supabase } from '@/lib/supabase/client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, profile, loading } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/signin')
        return
      }

      // If profile doesn't exist, create it
      if (!profile) {
        console.log('Profile not found, creating default profile...')
        const createProfile = async () => {
          try {
            const { error: createError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: user.id,
                  email: user.email,
                  full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
                  role: 'user1',
                  approved: false
                }
              ])
            
            if (createError) {
              console.error('Error creating profile:', createError)
              router.push('/signin')
              return
            }
            
            // Redirect to waiting page since new profile is unapproved
            router.push('/waiting-for-approval')
          } catch (error) {
            console.error('Error creating profile:', error)
            router.push('/signin')
          }
        }
        createProfile()
        return
      }

      // If not approved, send to waiting page
      if (profile.approved === false) {
        if (pathname !== '/waiting-for-approval') {
          router.push('/waiting-for-approval')
        }
        return
      }

      // Redirect to canonical dashboard path based on role
      const expectedPath = getDashboardPath(profile.role as UserRole)
      if (!pathname.startsWith(expectedPath)) {
        router.push(expectedPath)
      }
    }
  }, [user, profile, loading, router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role={profile.role} />
      <motion.main
        className="flex-1 overflow-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          {children}
        </div>
      </motion.main>
    </div>
  )
}
