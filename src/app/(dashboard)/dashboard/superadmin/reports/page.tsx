'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Users,
  DollarSign,
  Shield,
  Plus
} from 'lucide-react'

export default function SuperAdminReports() {
  const reports = [
    {
      title: 'User Activity Report',
      description: 'Comprehensive user activity analysis',
      icon: Activity,
      status: 'active',
      lastUpdated: '2 hours ago',
      downloads: 45,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Revenue Analytics',
      description: 'Monthly revenue and growth metrics',
      icon: DollarSign,
      status: 'active',
      lastUpdated: '1 day ago',
      downloads: 23,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Security Audit',
      description: 'System security and access logs',
      icon: Shield,
      status: 'pending',
      lastUpdated: '3 days ago',
      downloads: 12,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'User Demographics',
      description: 'User distribution and demographics',
      icon: Users,
      status: 'active',
      lastUpdated: '1 week ago',
      downloads: 34,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const quickStats = [
    {
      title: 'Total Reports',
      value: '24',
      change: '+3',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'This Month',
      value: '8',
      change: '+2',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Downloads',
      value: '1,234',
      change: '+15%',
      icon: Download,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Reports',
      value: '18',
      change: '+1',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports Dashboard</h1>
        <p className="text-gray-600">Generate and manage comprehensive system reports</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter Reports
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Report
        </Button>
      </motion.div>

      {/* Reports Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {reports.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${report.bgColor}`}>
                  <report.icon className={`h-5 w-5 ${report.color}`} />
                </div>
                <Badge 
                  variant={report.status === 'active' ? 'default' : 'secondary'}
                  className={report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                >
                  {report.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Last Updated:</span>
                  <span>{report.lastUpdated}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Downloads:</span>
                  <span>{report.downloads}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Chart Placeholder */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Report Downloads Trend</CardTitle>
            <CardDescription>Monthly download statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Chart visualization will be implemented here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Categories</CardTitle>
            <CardDescription>Distribution by report type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <PieChart className="h-12 w-12 mx-auto mb-2" />
                <p>Pie chart will be implemented here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
