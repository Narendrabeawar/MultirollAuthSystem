'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Lock,
  Key,
  Users,
  Activity,
  Zap
} from 'lucide-react'

export default function SuperAdminSecurity() {
  const securityMetrics = [
    {
      title: 'Security Score',
      value: '95/100',
      status: 'excellent',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Threats',
      value: '0',
      status: 'safe',
      icon: AlertTriangle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Failed Logins',
      value: '12',
      status: 'warning',
      icon: XCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: '2FA Enabled',
      value: '98%',
      status: 'good',
      icon: Key,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ]

  const recentAlerts = [
    {
      type: 'login_attempt',
      severity: 'low',
      message: 'Multiple failed login attempts from IP 192.168.1.100',
      timestamp: '2 minutes ago',
      status: 'resolved'
    },
    {
      type: 'suspicious_activity',
      severity: 'medium',
      message: 'Unusual data access pattern detected',
      timestamp: '15 minutes ago',
      status: 'investigating'
    },
    {
      type: 'system_update',
      severity: 'info',
      message: 'Security patches applied successfully',
      timestamp: '1 hour ago',
      status: 'completed'
    }
  ]

  const securityPolicies = [
    {
      name: 'Password Policy',
      status: 'enabled',
      description: 'Minimum 8 characters, uppercase, lowercase, numbers',
      icon: Lock
    },
    {
      name: 'Two-Factor Authentication',
      status: 'enabled',
      description: 'Required for all admin accounts',
      icon: Key
    },
    {
      name: 'Session Timeout',
      status: 'enabled',
      description: 'Auto-logout after 30 minutes of inactivity',
      icon: Activity
    },
    {
      name: 'IP Whitelist',
      status: 'disabled',
      description: 'Restrict access to specific IP addresses',
      icon: Shield
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      case 'low':
        return 'bg-yellow-100 text-yellow-800'
      case 'info':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'investigating':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'enabled':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'disabled':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Dashboard</h1>
        <p className="text-gray-600">Monitor and manage system security</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Button className="bg-red-600 hover:bg-red-700">
          <Shield className="h-4 w-4 mr-2" />
          Security Scan
        </Button>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          View Logs
        </Button>
        <Button variant="outline">
          <Key className="h-4 w-4 mr-2" />
          Manage Keys
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Access Control
        </Button>
      </motion.div>

      {/* Security Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <Badge 
                    variant="secondary" 
                    className={`mt-1 ${
                      metric.status === 'excellent' || metric.status === 'safe' 
                        ? 'bg-green-100 text-green-800' 
                        : metric.status === 'warning' 
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {metric.status}
                  </Badge>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Security Alerts */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Alerts</CardTitle>
            <CardDescription>Latest security events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {getStatusIcon(alert.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-900">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Policies</CardTitle>
            <CardDescription>Active security policies and configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityPolicies.map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <policy.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{policy.name}</h4>
                      <p className="text-xs text-gray-600">{policy.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(policy.status)}
                    <Badge 
                      variant="secondary" 
                      className={
                        policy.status === 'enabled' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {policy.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Overview */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Firewall Status</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SSL Certificate</span>
                <Badge className="bg-green-100 text-green-800">Valid</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Vulnerability Scan</span>
                <Badge className="bg-green-100 text-green-800">Clean</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Access Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Today&apos;s Logins</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Failed Attempts</span>
                <span className="font-medium text-orange-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Sessions</span>
                <span className="font-medium">89</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button size="sm" className="w-full" variant="outline">
                <Shield className="h-3 w-3 mr-2" />
                Run Security Scan
              </Button>
              <Button size="sm" className="w-full" variant="outline">
                <Key className="h-3 w-3 mr-2" />
                Rotate Keys
              </Button>
              <Button size="sm" className="w-full" variant="outline">
                <Users className="h-3 w-3 mr-2" />
                Review Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
