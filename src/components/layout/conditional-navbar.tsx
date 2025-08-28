'use client'

import { usePathname } from 'next/navigation'
import { useSession } from '@/components/providers/session-provider'
import Navbar from './navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const { user, loading } = useSession()
  
  // Don't show navbar on dashboard pages or if user is logged in
  if (pathname?.startsWith('/dashboard') || 
      pathname?.startsWith('/waiting-for-approval')) {
    return null
  }
  
  // Don't show navbar if user is logged in (they should be redirected anyway)
  if (user && !loading) {
    return null
  }
  
  return <Navbar />
}
