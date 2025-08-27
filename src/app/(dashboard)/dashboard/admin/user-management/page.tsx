'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Edit,
  Trash2,
  Ban,
  User,
  Shield,
  Crown,
  XCircle,
  CheckCircle,
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { getCurrentUser, getUserProfile, UserRole } from '@/lib/supabase/auth-helpers'

interface UserRow {
  id: string
  email: string
  full_name: string
  role: UserRole
  approved: boolean
  created_at: string
  avatar_url?: string
}

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterApproved, setFilterApproved] = useState<string>('all')
  const [viewerRole, setViewerRole] = useState<UserRole | null>(null)

  const canManage = viewerRole === UserRole.ADMIN

  useEffect(() => {
    const init = async () => {
      await fetchViewer()
      await fetchUsers()
    }
    init()
  }, [])

  const fetchViewer = async () => {
    try {
      const { user } = await getCurrentUser()
      if (!user) return
      const { profile } = await getUserProfile(user.id)
      if (profile?.role) setViewerRole(profile.role as UserRole)
    } catch (e) {
      // ignore
    }
  }

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('admin_list_all_users')
      if (error) {
        const { data: fallback, error: fbErr } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
        if (fbErr) throw fbErr
        setUsers(((fallback as UserRow[]) || []).filter(u => u.role !== UserRole.SUPER_ADMIN))
      } else {
        setUsers(((data as UserRow[]) || []).filter(u => u.role !== UserRole.SUPER_ADMIN))
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (userId: string, approve: boolean) => {
    if (!canManage) return
    try {
      const { error } = await supabase.rpc('admin_approve_user', {
        target_user_id: userId,
        approve,
      })
      if (error) throw error
      setUsers(users.map(u => (u.id === userId ? { ...u, approved: approve } : u)))
    } catch (e) {
      console.error('approve failed', e)
    }
  }

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    if (!canManage) return
    try {
      const { error } = await supabase.rpc('admin_change_user_role', {
        target_user_id: userId,
        new_role: newRole,
      })
      if (error) throw error
      setUsers(users.map(u => (u.id === userId ? { ...u, role: newRole } : u)))
    } catch (e) {
      console.error('role change failed', e)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!canManage) return
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      const { error } = await supabase.rpc('admin_delete_user', {
        target_user_id: userId,
      })
      if (error) throw error
      setUsers(users.filter(u => u.id !== userId))
    } catch (e) {
      console.error('delete failed', e)
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return <Crown className="w-4 h-4 text-yellow-600" />
      case UserRole.ADMIN:
        return <Shield className="w-4 h-4 text-blue-600" />
      default:
        return <User className="w-4 h-4 text-gray-600" />
    }
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return 'Super Admin'
      case UserRole.ADMIN:
        return 'Admin'
      case UserRole.USER1:
        return 'User 1'
      case UserRole.USER2:
        return 'User 2'
      case UserRole.USER3:
        return 'User 3'
      default:
        return 'User'
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case UserRole.ADMIN:
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case UserRole.USER1:
        return 'bg-green-100 text-green-800 border-green-200'
      case UserRole.USER2:
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case UserRole.USER3:
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === (filterRole as any)
    const matchesApproved =
      filterApproved === 'all' ||
      (filterApproved === 'approved' && user.approved) ||
      (filterApproved === 'pending' && !user.approved)

    return matchesSearch && matchesRole && matchesApproved
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            {canManage
              ? 'Approve registrations, edit roles and manage users'
              : 'View only — Super Admin can see but cannot modify here'}
          </p>
        </div>
        <Button onClick={fetchUsers} variant="outline">
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-filter">Role</Label>
              <select
                id="role-filter"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Roles</option>
                <option value="superAdmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="approval-filter">Approval Status</Label>
              <select
                id="approval-filter"
                value={filterApproved}
                onChange={(e) => setFilterApproved(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Total Users</Label>
              <div className="text-2xl font-bold text-primary">{filteredUsers.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>
                        {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">
                          {user.full_name || 'No Name'}
                          <span className="font-bold ml-2">({getRoleLabel(user.role)})</span>
                        </h3>
                        {getRoleIcon(user.role)}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                        <Badge variant={user.approved ? 'default' : 'secondary'}>
                          {user.approved ? 'Approved' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!user.approved ? (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(user.id, true)}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!canManage}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(user.id, false)}
                        disabled={!canManage}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Revoke
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" disabled={!canManage}>
                          <Edit className="w-4 h-4 mr-1" /> Role
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.ADMIN)}>
                          <Shield className="w-4 h-4 mr-2" /> Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.USER1)}>
                          <User className="w-4 h-4 mr-2" /> User 1
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.USER2)}>
                          <User className="w-4 h-4 mr-2" /> User 2
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.USER3)}>
                          <User className="w-4 h-4 mr-2" /> User 3
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)} disabled={!canManage}>
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                    <Button size="sm" variant="outline" disabled={!canManage} className="border-red-300 text-red-600 hover:bg-red-50">
                      <Ban className="w-4 h-4 mr-1" /> Ban
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No users found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
