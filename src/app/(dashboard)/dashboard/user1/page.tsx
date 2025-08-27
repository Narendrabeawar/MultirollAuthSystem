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
  Bell,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Share2
} from 'lucide-react'

export default function User1Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      description: 'Active users this month',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8%',
      icon: DollarSign,
      description: 'Monthly revenue',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Sessions',
      value: '892',
      change: '+15%',
      icon: Activity,
      description: 'Current active sessions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+5%',
      icon: TrendingUp,
      description: 'Monthly growth rate',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

  const recentActivities = [
    { id: 1, action: 'User login', user: 'john@example.com', time: '2 minutes ago', type: 'login' },
    { id: 2, action: 'Report generated', user: 'admin@example.com', time: '5 minutes ago', type: 'report' },
    { id: 3, action: 'Settings updated', user: 'user@example.com', time: '10 minutes ago', type: 'update' },
    { id: 4, action: 'New user registered', user: 'newuser@example.com', time: '15 minutes ago', type: 'create' },
  ]

  const quickActions = [
    { title: 'View Reports', icon: FileText, href: '/dashboard/user1/reports', color: 'text-blue-600', bgColor: 'bg-blue-50 hover:bg-blue-100' },
    { title: 'Analytics', icon: BarChart3, href: '/dashboard/user1/analytics', color: 'text-green-600', bgColor: 'bg-green-50 hover:bg-green-100' },
    { title: 'Calendar', icon: Calendar, href: '/dashboard/user1/calendar', color: 'text-purple-600', bgColor: 'bg-purple-50 hover:bg-purple-100' },
    { title: 'Settings', icon: Settings, href: '/dashboard/user1/settings', color: 'text-gray-600', bgColor: 'bg-gray-50 hover:bg-gray-100' },
  ]

  const notifications = [
    { id: 1, type: 'success', message: 'Profile updated successfully', time: '1 minute ago', icon: CheckCircle },
    { id: 2, type: 'info', message: 'New feature available', time: '5 minutes ago', icon: Bell },
    { id: 3, type: 'warning', message: 'Password expires soon', time: '1 hour ago', icon: AlertCircle },
  ]

  const achievements = [
    { id: 1, title: 'First Login', description: 'Successfully logged in for the first time', icon: Star, completed: true },
    { id: 2, title: 'Profile Complete', description: 'Completed your profile information', icon: User, completed: true },
    { id: 3, title: 'Active User', description: 'Been active for 7 consecutive days', icon: Target, completed: false },
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
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">User 1 Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your account today.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
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
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks and frequently used features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
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
                          <p className="text-sm text-muted-foreground">Access {action.title.toLowerCase()}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600" />
                Notifications
              </CardTitle>
              <CardDescription>
                Recent updates and important messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${
                      notification.type === 'success' ? 'bg-green-50 border-green-200' :
                      notification.type === 'info' ? 'bg-blue-50 border-blue-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <notification.icon className={`h-4 w-4 mt-0.5 ${
                        notification.type === 'success' ? 'text-green-600' :
                        notification.type === 'info' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <Badge variant={notification.type === 'success' ? 'default' : notification.type === 'info' ? 'secondary' : 'outline'}>
                        {notification.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-600" />
                Recent Activities
              </CardTitle>
              <CardDescription>
                Latest user activities and system events
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
                        activity.type === 'login' ? 'bg-green-500' :
                        activity.type === 'report' ? 'bg-blue-500' :
                        activity.type === 'update' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}>
                        {activity.type === 'login' ? '→' :
                         activity.type === 'report' ? '📊' :
                         activity.type === 'update' ? '↻' : '+'}
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

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-600" />
                Achievements
              </CardTitle>
              <CardDescription>
                Your progress and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${
                      achievement.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <achievement.icon className={`h-4 w-4 ${
                          achievement.completed ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <Badge variant={achievement.completed ? 'default' : 'secondary'}>
                        {achievement.completed ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
