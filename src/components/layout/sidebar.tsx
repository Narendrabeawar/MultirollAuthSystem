'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Database,
  Shield,
  UserCheck,
  Activity,
  LogOut
} from 'lucide-react'
import { signOut } from '@/lib/supabase/auth-helpers'

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

interface SidebarProps {
  role: string
}

export default function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Define sidebar items based on role
  const getSidebarItems = (role: string): SidebarItem[] => {
    const baseItems: SidebarItem[] = [
      {
        title: 'Dashboard',
        href: `/dashboard/${role}`,
        icon: Home,
      },
      {
        title: 'Analytics',
        href: `/dashboard/${role}/analytics`,
        icon: BarChart3,
      },
      {
        title: 'Reports',
        href: `/dashboard/${role}/reports`,
        icon: FileText,
      },
      {
        title: 'Calendar',
        href: `/dashboard/${role}/calendar`,
        icon: Calendar,
      },
    ]

    // Add role-specific items
    if (role === 'superadmin' || role === 'admin') {
      baseItems.push(
        {
          title: 'User Management',
          href: `/dashboard/${role}/user-management`,
          icon: Users,
          badge: 'Admin',
        },
        {
          title: 'System Settings',
          href: `/dashboard/${role}/settings`,
          icon: Settings,
        },
        {
          title: 'Database',
          href: `/dashboard/${role}/database`,
          icon: Database,
        }
      )
    }

    if (role === 'superadmin') {
      baseItems.push(
        {
          title: 'Security',
          href: `/dashboard/${role}/security`,
          icon: Shield,
          badge: 'Super',
        },
        {
          title: 'Permissions',
          href: `/dashboard/${role}/permissions`,
          icon: UserCheck,
        }
      )
    }

    return baseItems
  }

  const sidebarItems = getSidebarItems(role)

  return (
    <motion.div
      className={cn(
        "flex flex-col border-r bg-background",
        collapsed ? "w-16" : "w-64"
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.h2
              key="title"
              className="text-lg font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
            </motion.h2>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item, index) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed ? "px-2" : "px-3"
                  )}
                >
                  <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.div
                        key="content"
                        className="flex items-center justify-between w-full"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-2">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="footer"
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <span>Role: {role}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    try {
                      const { error } = await signOut()
                      if (!error) window.location.href = '/'
                    } catch (e) {
                      window.location.href = '/'
                    }
                  }}
                  className="h-8"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign out
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="flex items-center justify-center mt-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                try {
                  const { error } = await signOut()
                  if (!error) window.location.href = '/'
                } catch (e) {
                  window.location.href = '/'
                }
              }}
              className="h-8 w-8"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
