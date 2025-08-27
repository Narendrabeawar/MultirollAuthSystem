'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Don't show navbar on dashboard pages
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/waiting-for-approval')) {
    return null
  }
  
  return <Navbar />
}
