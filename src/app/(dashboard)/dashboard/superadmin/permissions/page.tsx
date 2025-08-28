'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  UserCheck, 
  Shield,
  Users,
  Settings,
  Database,
  FileText,
  BarChart3,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'

export default function SuperAdminPermissions() {
  const roles = [
    {
      name: 'Super Admin',
      description: 'Full system access and control',
      users: 2,
      permissions: ['all'],
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Admin',
      description: 'Administrative access with limitations',
      users: 5,
      permissions: ['user_management', 'reports', 'settings'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Manager',
      description: 'Team management and reporting',
      users: 12,
      permissions: ['reports', 'analytics', 'user_view'],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'User',
      description: 'Basic user access',
      users: 156,
      permissions: ['dashboard', 'profile'],
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ]

  const permissions = [
    {
      category: 'User Management',
      icon: Users,
      items: [
        { name: 'View Users', description: 'Can view user list and profiles', enabled: true },
        { name: 'Create Users', description: 'Can create new user accounts', enabled: false },
        { name: 'Edit Users', description: 'Can modify user information', enabled: false },
        { name: 'Delete Users', description: 'Can remove user accounts', enabled: false }
      ]
    },
    {
      category: 'System Settings',
      icon: Settings,
      items: [
        { name: 'View Settings', description: 'Can view system configuration', enabled: true },
        { name: 'Modify Settings', description: 'Can change system settings', enabled: false },
        { name: 'Security Settings', description: 'Can access security configurations', enabled: false },
        { name: 'Backup Settings', description: 'Can manage backup configurations', enabled: false }
      ]
    },
    {
      category: 'Database',
      icon: Database,
      items: [
        { name: 'View Data', description: 'Can view database records', enabled: true },
        { name: 'Export Data', description: 'Can export data from database', enabled: false },
        { name: 'Modify Data', description: 'Can update database records', enabled: false },
        { name: 'Database Admin', description: 'Full database administration', enabled: false }
      ]
    },
    {
      category: 'Reports & Analytics',
      icon: BarChart3,
      items: [
        { name: 'View Reports', description: 'Can access system reports', enabled: true },
        { name: 'Generate Reports', description: 'Can create custom reports', enabled: false },
        { name: 'Export Reports', description: 'Can download report data', enabled: false },
        { name: 'Analytics Access', description: 'Can view analytics dashboard', enabled: false }
      ]
    }
  ]

  const recentActivity = [
    {
      action: 'Permission Updated',
      user: 'John Doe',
      role: 'Admin',
      timestamp: '2 minutes ago',
      details: 'Added "Create Users" permission'
    },
    {
      action: 'Role Created',
      user: 'System',
      role: 'Manager',
      timestamp: '1 hour ago',
      details: 'Created new "Manager" role'
    },
    {
      action: 'User Assigned',
      user: 'Jane Smith',
      role: 'User',
      timestamp: '3 hours ago',
      details: 'Assigned to "User" role'
    },
    {
      action: 'Permission Revoked',
      user: 'Mike Johnson',
      role: 'Admin',
      timestamp: '1 day ago',
      details: 'Removed "Delete Users" permission'
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Permissions Management</h1>
        <p className="text-gray-600">Manage user roles and system permissions</p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Assign Users
        </Button>
        <Button variant="outline">
          <Shield className="h-4 w-4 mr-2" />
          Bulk Permissions
        </Button>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Audit Log
        </Button>
      </motion.div>

      {/* Roles Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {roles.map((role, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${role.bgColor}`}>
                  <UserCheck className={`h-5 w-5 ${role.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-600">{role.users} users</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <div className="flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className={
                    role.name === 'Super Admin' 
                      ? 'bg-red-100 text-red-800' 
                      : role.name === 'Admin'
                      ? 'bg-blue-100 text-blue-800'
                      : role.name === 'Manager'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {role.permissions.length} permissions
                </Badge>
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Permissions Matrix */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {permissions.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <category.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>Manage {category.category.toLowerCase()} permissions</CardDescription>
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

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest permission and role changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <UserCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.user}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <Badge variant="outline" className="text-xs">
                          {activity.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">175</p>
            <p className="text-sm text-gray-600 mt-1">Across all roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Active Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">24</p>
            <p className="text-sm text-gray-600 mt-1">Currently enabled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-4 w-4 mr-2" />
              Role Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">4</p>
            <p className="text-sm text-gray-600 mt-1">Different roles</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
