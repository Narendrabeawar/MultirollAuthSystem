'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Database, 
  Download,
  Upload,
  RefreshCw,
  Shield,
  Activity,
  HardDrive,
  Server,
  Zap,
  AlertTriangle
} from 'lucide-react'

export default function SuperAdminDatabase() {
  const dbStats = [
    {
      title: 'Database Size',
      value: '2.4 GB',
      change: '+12%',
      icon: HardDrive,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Connections',
      value: '45',
      change: '+5',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Query Performance',
      value: '98.5%',
      change: '+2.1%',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Backup Status',
      value: 'Healthy',
      change: 'Last: 2h ago',
      icon: Shield,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ]

  const tables = [
    { name: 'users', size: '1.2 GB', rows: '12,847', lastModified: '2 hours ago' },
    { name: 'sessions', size: '456 MB', rows: '8,234', lastModified: '1 hour ago' },
    { name: 'logs', size: '234 MB', rows: '45,678', lastModified: '30 minutes ago' },
    { name: 'settings', size: '12 MB', rows: '156', lastModified: '1 day ago' },
    { name: 'notifications', size: '89 MB', rows: '3,456', lastModified: '3 hours ago' }
  ]

  const recentQueries = [
    { query: 'SELECT * FROM users WHERE status = "active"', duration: '45ms', timestamp: '2 minutes ago' },
    { query: 'UPDATE sessions SET last_activity = NOW()', duration: '12ms', timestamp: '5 minutes ago' },
    { query: 'INSERT INTO logs (message, level) VALUES (...)', duration: '8ms', timestamp: '8 minutes ago' },
    { query: 'DELETE FROM expired_sessions WHERE created_at < ...', duration: '156ms', timestamp: '15 minutes ago' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Management</h1>
        <p className="text-gray-600">Monitor and manage database operations</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Create Backup
        </Button>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Restore Backup
        </Button>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Optimize Database
        </Button>
        <Button variant="outline">
          <Shield className="h-4 w-4 mr-2" />
          Security Scan
        </Button>
      </motion.div>

      {/* Database Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {dbStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Database Tables */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Database Tables</CardTitle>
            <CardDescription>Overview of all database tables and their statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tables.map((table, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Database className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{table.name}</h4>
                      <p className="text-sm text-gray-600">{table.rows} rows</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{table.size}</span>
                    <span className="text-sm text-gray-500">Modified: {table.lastModified}</span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Queries */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Queries</CardTitle>
            <CardDescription>Latest database operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQueries.map((query, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Query {index + 1}</span>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {query.duration}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded">
                    {query.query}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{query.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Health</CardTitle>
            <CardDescription>System status and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="p-1 bg-green-100 rounded">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Database Healthy</p>
                  <p className="text-sm text-green-600">All systems operational</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-1 bg-blue-100 rounded">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-800">Performance Optimal</p>
                  <p className="text-sm text-blue-600">Query response times are good</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="p-1 bg-yellow-100 rounded">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-yellow-800">Backup Due</p>
                  <p className="text-sm text-yellow-600">Scheduled backup in 2 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Server Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Server Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Server className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Database Server</p>
                  <p className="text-lg font-semibold text-gray-900">PostgreSQL 15.2</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <HardDrive className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-lg font-semibold text-gray-900">2.4 GB / 50 GB</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-lg font-semibold text-gray-900">99.9%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
