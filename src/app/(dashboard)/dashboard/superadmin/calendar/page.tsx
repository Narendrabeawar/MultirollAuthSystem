'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Plus,
  Clock,
  Users,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function SuperAdminCalendar() {
  const events = [
    {
      title: 'System Maintenance',
      date: '2024-01-15',
      time: '02:00 AM',
      type: 'maintenance',
      status: 'scheduled',
      attendees: 5,
      description: 'Monthly system maintenance and updates'
    },
    {
      title: 'Team Meeting',
      date: '2024-01-16',
      time: '10:00 AM',
      type: 'meeting',
      status: 'confirmed',
      attendees: 12,
      description: 'Weekly team sync and project updates'
    },
    {
      title: 'Security Audit',
      date: '2024-01-18',
      time: '09:00 AM',
      type: 'audit',
      status: 'pending',
      attendees: 3,
      description: 'Quarterly security assessment'
    },
    {
      title: 'Database Backup',
      date: '2024-01-20',
      time: '11:00 PM',
      type: 'backup',
      status: 'scheduled',
      attendees: 2,
      description: 'Automated database backup process'
    }
  ]

  const eventTypes = [
    { type: 'meeting', label: 'Meeting', color: 'bg-blue-100 text-blue-800', icon: Users },
    { type: 'maintenance', label: 'Maintenance', color: 'bg-orange-100 text-orange-800', icon: Settings },
    { type: 'audit', label: 'Audit', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
    { type: 'backup', label: 'Backup', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  ]

  const getEventTypeInfo = (type: string) => {
    return eventTypes.find(t => t.type === type) || eventTypes[0]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-blue-600" />
      default:
        return <XCircle className="h-4 w-4 text-red-600" />
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
        <p className="text-gray-600">Manage events, meetings, and system schedules</p>
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
          Add Event
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>January 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-2" />
                  <p>Calendar component will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event, index) => {
                const typeInfo = getEventTypeInfo(event.type)
                return (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      {getStatusIcon(event.status)}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${typeInfo.color}`}>
                        {typeInfo.label}
                      </Badge>
                      <span className="text-xs text-gray-500">{event.attendees} attendees</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Events List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>Manage and view all scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event, index) => {
                const typeInfo = getEventTypeInfo(event.type)
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${typeInfo.color.replace('text-', 'bg-').replace('-800', '-100')}`}>
                        <typeInfo.icon className={`h-4 w-4 ${typeInfo.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{event.date} at {event.time}</span>
                          <span className="text-xs text-gray-500">{event.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={typeInfo.color}>
                        {typeInfo.label}
                      </Badge>
                      {getStatusIcon(event.status)}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Event Types Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${type.color.replace('text-', 'bg-').replace('-800', '-100')}`}>
                    <type.icon className={`h-4 w-4 ${type.color}`} />
                  </div>
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
