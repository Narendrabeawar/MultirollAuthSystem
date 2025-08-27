'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  TrendingUp, 
  Activity, 
  DollarSign,
  BarChart3,
  Calendar,
  FileText,
  Settings,
  User,
  Eye,
  Lock,
  AlertCircle,
  Info,
  Clock,
  Target,
  CheckCircle,
  EyeOff,
  Shield
} from 'lucide-react'

export default function User3Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '456',
      change: '+3%',
      icon: Users,
      description: 'Active users this month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Revenue',
      value: '$18,234',
      change: '+2%',
      icon: DollarSign,
      description: 'Monthly revenue',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Sessions',
      value: '234',
      change: '+8%',
      icon: Activity,
      description: 'Current active sessions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Growth Rate',
      value: '12.5%',
      change: '+1%',
      icon: TrendingUp,
      description: 'Monthly growth rate',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

  const readOnlyActions = [
    { title: 'View Reports', icon: FileText, description: 'Read-only access to reports', color: 'text-blue-600', bgColor: 'bg-blue-50 hover:bg-blue-100' },
    { title: 'View Analytics', icon: BarChart3, description: 'View-only analytics dashboard', color: 'text-green-600', bgColor: 'bg-green-50 hover:bg-green-100' },
    { title: 'View Calendar', icon: Calendar, description: 'View calendar events only', color: 'text-purple-600', bgColor: 'bg-purple-50 hover:bg-purple-100' },
    { title: 'View Profile', icon: Settings, description: 'View profile information only', color: 'text-gray-600', bgColor: 'bg-gray-50 hover:bg-gray-100' },
  ]

  const restrictions = [
    { title: 'Access Level', value: 'Read-Only', icon: EyeOff, color: 'text-red-600' },
    { title: 'Permissions', value: 'View Only', icon: Lock, color: 'text-orange-600' },
    { title: 'Data Access', value: 'Restricted', icon: Shield, color: 'text-yellow-600' },
    { title: 'Last Updated', value: '1 day ago', icon: Clock, color: 'text-gray-600' },
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
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">User 3 Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Read-only dashboard with minimal access and view-only permissions.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            Help
          </Button>
          <Button size="sm" disabled>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </motion.div>

      {/* Read-Only Warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Read-Only Access Notice</h3>
                <p className="text-sm text-red-700">
                  You have read-only access to this dashboard. All features are view-only and no modifications are allowed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
        {/* Read-Only Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-red-600" />
                Available Actions (Read-Only)
              </CardTitle>
              <CardDescription>
                View-only functionality with no modification capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {readOnlyActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
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
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Restrictions Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-red-600" />
                Access Restrictions
              </CardTitle>
              <CardDescription>
                Your current access limitations and restrictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {restrictions.map((restriction, index) => (
                  <motion.div
                    key={restriction.title}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <restriction.icon className={`h-4 w-4 ${restriction.color}`} />
                      <div>
                        <p className="text-sm font-medium">{restriction.title}</p>
                        <p className="text-xs text-muted-foreground">{restriction.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Account Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-green-600" />
              Account Status
            </CardTitle>
            <CardDescription>
              Your current account information and access level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Role</p>
                <p className="text-sm text-muted-foreground">User 3</p>
                <Badge variant="destructive">Read-Only</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Permissions</p>
                <p className="text-sm text-muted-foreground">View Only</p>
                <Badge variant="outline">Restricted</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Last Login</p>
                <p className="text-sm text-muted-foreground">Yesterday at 2:30 PM</p>
                <Badge variant="secondary">Limited</Badge>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Info className="h-5 w-5 text-yellow-600" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Access Notice</h4>
                  <p className="text-sm text-yellow-700">
                    This is a read-only account. You can view information but cannot make any changes or modifications.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
