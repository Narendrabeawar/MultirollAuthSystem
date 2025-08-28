'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Settings, 
  Save,
  Shield,
  Database,
  Users,
  Bell,
  Globe,
  Lock,
  Eye,
  Key
} from 'lucide-react'

export default function SuperAdminSettings() {
  const settings = [
    {
      category: 'Security',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      items: [
        { name: 'Two-Factor Authentication', enabled: true, description: 'Require 2FA for all users' },
        { name: 'Session Timeout', enabled: true, description: 'Auto-logout after 30 minutes' },
        { name: 'IP Whitelist', enabled: false, description: 'Restrict access to specific IPs' },
        { name: 'Password Policy', enabled: true, description: 'Enforce strong passwords' }
      ]
    },
    {
      category: 'Database',
      icon: Database,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        { name: 'Auto Backup', enabled: true, description: 'Daily automated backups' },
        { name: 'Query Logging', enabled: false, description: 'Log all database queries' },
        { name: 'Connection Pooling', enabled: true, description: 'Optimize database connections' },
        { name: 'Data Encryption', enabled: true, description: 'Encrypt sensitive data' }
      ]
    },
    {
      category: 'User Management',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: [
        { name: 'User Registration', enabled: true, description: 'Allow new user signups' },
        { name: 'Email Verification', enabled: true, description: 'Require email confirmation' },
        { name: 'Role Assignment', enabled: true, description: 'Allow role-based access' },
        { name: 'User Analytics', enabled: false, description: 'Track user behavior' }
      ]
    },
    {
      category: 'Notifications',
      icon: Bell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: [
        { name: 'Email Notifications', enabled: true, description: 'Send email alerts' },
        { name: 'SMS Notifications', enabled: false, description: 'Send SMS alerts' },
        { name: 'System Alerts', enabled: true, description: 'Critical system notifications' },
        { name: 'Weekly Reports', enabled: true, description: 'Automated weekly summaries' }
      ]
    }
  ]

  const systemInfo = [
    { label: 'System Version', value: 'v2.1.0', icon: Settings },
    { label: 'Database Version', value: 'PostgreSQL 15.2', icon: Database },
    { label: 'Last Backup', value: '2 hours ago', icon: Shield },
    { label: 'Active Users', value: '1,234', icon: Users },
    { label: 'System Uptime', value: '99.9%', icon: Globe },
    { label: 'Security Status', value: 'Secure', icon: Lock }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
        <Button variant="outline">
          <Shield className="h-4 w-4 mr-2" />
          Security Audit
        </Button>
        <Button variant="outline">
          <Database className="h-4 w-4 mr-2" />
          Backup Now
        </Button>
      </motion.div>

      {/* System Information */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {systemInfo.map((info, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <info.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{info.label}</p>
                  <p className="text-lg font-semibold text-gray-900">{info.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Settings Categories */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {settings.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                </div>
                <div>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>Configure {category.category.toLowerCase()} settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{item.name}</h4>
                        {item.enabled && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <Switch checked={item.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Advanced Settings */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Collection</p>
                <p className="text-sm text-gray-600">Collect usage analytics</p>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cookie Consent</p>
                <p className="text-sm text-gray-600">Show cookie banner</p>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">GDPR Compliance</p>
                <p className="text-sm text-gray-600">Enable GDPR features</p>
              </div>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-4 w-4 mr-2" />
              API Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">API Rate Limiting</p>
                <p className="text-sm text-gray-600">Limit API requests per minute</p>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">API Documentation</p>
                <p className="text-sm text-gray-600">Public API docs</p>
              </div>
              <Switch checked={false} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Webhook Notifications</p>
                <p className="text-sm text-gray-600">Send webhook events</p>
              </div>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
