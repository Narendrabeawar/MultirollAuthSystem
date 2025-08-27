'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  Crown,
  Lock,
  Globe,
  Eye,
  Trash2,
  Edit,
  Plus,
  BarChart3,
  Calendar,
  FileText,
  Zap
} from 'lucide-react'

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '5,234',
      change: '+23%',
      icon: Users,
      description: 'Active users this month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Revenue',
      value: '$156,789',
      change: '+18%',
      icon: DollarSign,
      description: 'Monthly revenue',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Sessions',
      value: '2,847',
      change: '+25%',
      icon: Activity,
      description: 'Current active sessions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'System Health',
      value: '99.9%',
      change: '+0.1%',
      icon: Shield,
      description: 'Uptime this month',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
  ]

  const superAdminActions = [
    { 
      title: 'User Management', 
      icon: Users, 
      description: 'Full user control and permissions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      href: '/dashboard/superadmin/user-management'
    },
    { 
      title: 'System Settings', 
      icon: Settings, 
      description: 'Global system configuration',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      href: '/dashboard/superadmin/settings'
    },
    { 
      title: 'Database Access', 
      icon: Database, 
      description: 'Complete database management',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      href: '/dashboard/superadmin/database'
    },
    { 
      title: 'Security Controls', 
      icon: Shield, 
      description: 'Advanced security policies',
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      href: '/dashboard/superadmin/security'
    },
    { 
      title: 'Permissions', 
      icon: UserCheck, 
      description: 'Role and permission management',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      href: '/dashboard/superadmin/permissions'
    },
    { 
      title: 'Global Settings', 
      icon: Globe, 
      description: 'Cross-system configurations',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 hover:bg-teal-100',
      href: '/dashboard/superadmin/global'
    },
  ]

  const systemAlerts = [
    { 
      id: 1, 
      type: 'critical', 
      message: 'Security audit required', 
      time: '2 minutes ago',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    { 
      id: 2, 
      type: 'warning', 
      message: 'High CPU usage detected', 
      time: '5 minutes ago',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      id: 3, 
      type: 'info', 
      message: 'New admin user created', 
      time: '10 minutes ago',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 4, 
      type: 'success', 
      message: 'System backup completed', 
      time: '1 hour ago',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      id: 5, 
      type: 'warning', 
      message: 'Database optimization needed', 
      time: '2 hours ago',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User1', status: 'Active', avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User2', status: 'Inactive', avatar: 'MJ' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User3', status: 'Active', avatar: 'SW' },
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
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Ultimate control panel with complete system access and administrative privileges.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
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
        {/* Super Admin Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-red-600" />
                Super Admin Actions
              </CardTitle>
              <CardDescription>
                Complete system control and administrative functions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {superAdminActions.map((action, index) => (
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
                Critical system notifications and warnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map((alert, index) => (
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
                      <Badge variant={alert.type === 'critical' ? 'destructive' : alert.type === 'warning' ? 'secondary' : 'default'}>
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

      {/* Recent Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Recent Users
            </CardTitle>
            <CardDescription>
              Latest user activities and account status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                    <Badge variant="outline">{user.role}</Badge>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
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
