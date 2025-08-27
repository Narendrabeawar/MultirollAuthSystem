'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  Users, 
  TrendingUp, 
  Activity, 
  DollarSign,
  Shield,
  Settings,
  Database,
  UserCheck,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  BarChart3,
  Calendar,
  FileText,
  Zap,
  UserPlus,
  Cog,
  Lock
} from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+15%',
      icon: Users,
      description: 'Active users this month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Revenue',
      value: '$89,234',
      change: '+12%',
      icon: DollarSign,
      description: 'Monthly revenue',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Sessions',
      value: '1,456',
      change: '+18%',
      icon: Activity,
      description: 'Current active sessions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'System Health',
      value: '98.5%',
      change: '+2%',
      icon: Shield,
      description: 'Uptime this month',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
  ]

  const adminActions = [
    { 
      title: 'User Management', 
      icon: Users, 
      description: 'Manage user accounts and permissions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      href: '/dashboard/admin/user-management'
    },
    { 
      title: 'System Settings', 
      icon: Settings, 
      description: 'Configure system-wide settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      href: '/dashboard/admin/settings'
    },
    { 
      title: 'Database Access', 
      icon: Database, 
      description: 'Access and manage database',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      href: '/dashboard/admin/database'
    },
    { 
      title: 'Security Controls', 
      icon: Shield, 
      description: 'Manage security policies',
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      href: '/dashboard/admin/security'
    },
  ]

  const recentAlerts = [
    { 
      id: 1, 
      type: 'warning', 
      message: 'High memory usage detected', 
      time: '5 minutes ago',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      id: 2, 
      type: 'info', 
      message: 'New user registration', 
      time: '10 minutes ago',
      icon: UserPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 3, 
      type: 'success', 
      message: 'Backup completed successfully', 
      time: '1 hour ago',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      id: 4, 
      type: 'warning', 
      message: 'Database connection slow', 
      time: '2 hours ago',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

  const recentActivities = [
    { id: 1, action: 'User created', user: 'john@example.com', time: '2 minutes ago', type: 'create' },
    { id: 2, action: 'Settings updated', user: 'admin@example.com', time: '5 minutes ago', type: 'update' },
    { id: 3, action: 'User login', user: 'user@example.com', time: '10 minutes ago', type: 'login' },
    { id: 4, action: 'Report generated', user: 'analyst@example.com', time: '15 minutes ago', type: 'report' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Administrative control panel with full system access.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Cog className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-blue-600" />
                Admin Actions
              </CardTitle>
              <CardDescription>
                Administrative functions and system management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adminActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={action.href}>
                      <div className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${action.bgColor}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${action.bgColor}`}>
                            <action.icon className={`h-5 w-5 ${action.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                System Alerts
              </CardTitle>
              <CardDescription>
                System notifications and warnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${alert.bgColor}`}
                  >
                    <div className="flex items-start space-x-3">
                      <alert.icon className={`h-4 w-4 mt-0.5 ${alert.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                      <Badge variant={alert.type === 'warning' ? 'secondary' : 'default'}>
                        {alert.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest system activities and user actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                      activity.type === 'create' ? 'bg-green-500' :
                      activity.type === 'update' ? 'bg-blue-500' :
                      activity.type === 'login' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}>
                      {activity.type === 'create' ? '+' :
                       activity.type === 'update' ? '↻' :
                       activity.type === 'login' ? '→' : '📊'}
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{activity.type}</Badge>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
