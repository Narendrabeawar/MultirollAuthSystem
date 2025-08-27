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
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Ban,
  User,
  Shield,
  Crown
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { UserRole } from '@/lib/supabase/auth-helpers'

interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  approved: boolean
  created_at: string
  avatar_url?: string
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterApproved, setFilterApproved] = useState<string>('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Use RPC function to bypass RLS for admin operations
      const { data, error } = await supabase.rpc('admin_list_all_users')
      
      if (error) {
        console.error('RPC error:', error)
        // Fallback to direct query if RPC doesn't exist
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })

        if (fallbackError) throw fallbackError
        setUsers(fallbackData || [])
      } else {
        setUsers(data || [])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      // Final fallback - try direct query
      try {
        const { data: directData, error: directError } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })

        if (directError) throw directError
        setUsers(directData || [])
      } catch (finalError) {
        console.error('Final error fetching users:', finalError)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (userId: string, approved: boolean) => {
    try {
      const { error } = await supabase.rpc('admin_approve_user', {
        target_user_id: userId,
        approve: approved
      })

      if (error) throw error
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, approved } : user
      ))
    } catch (error) {
      console.error('Error updating user approval:', error)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const { error } = await supabase.rpc('admin_delete_user', {
        target_user_id: userId
      })

      if (error) throw error
      
      // Update local state
      setUsers(users.filter(user => user.id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase.rpc('admin_change_user_role', {
        target_user_id: userId,
        new_role: newRole
      })

      if (error) throw error
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
    } catch (error) {
      console.error('Error updating user role:', error)
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
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesApproved = filterApproved === 'all' || 
                           (filterApproved === 'approved' && user.approved) ||
                           (filterApproved === 'pending' && !user.approved)
    
    return matchesSearch && matchesRole && matchesApproved
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage all users, approve registrations, and control access
          </p>
        </div>
        <Button onClick={fetchUsers} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Filters */}
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
              <div className="text-2xl font-bold text-primary">
                {filteredUsers.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
                        <h3 className="font-semibold">{user.full_name || 'No Name'}</h3>
                        {getRoleIcon(user.role)}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge variant={user.approved ? "default" : "secondary"}>
                          {user.approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                                     <div className="flex items-center space-x-2">
                     {/* Approve/Reject Buttons */}
                     {!user.approved ? (
                       <Button
                         size="sm"
                         onClick={() => handleApprove(user.id, true)}
                         className="bg-green-600 hover:bg-green-700"
                       >
                         <CheckCircle className="w-4 h-4 mr-1" />
                         Approve
                       </Button>
                     ) : (
                       <Button
                         size="sm"
                         variant="outline"
                         onClick={() => handleApprove(user.id, false)}
                       >
                         <XCircle className="w-4 h-4 mr-1" />
                         Revoke
                       </Button>
                     )}
                     
                     {/* Role Change Dropdown */}
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button size="sm" variant="outline">
                           <Edit className="w-4 h-4 mr-1" />
                           Role
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent>
                         <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.SUPER_ADMIN)}>
                           <Crown className="w-4 h-4 mr-2" />
                           Super Admin
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.ADMIN)}>
                           <Shield className="w-4 h-4 mr-2" />
                           Admin
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.USER1)}>
                           <User className="w-4 h-4 mr-2" />
                           User 1
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.USER2)}>
                           <User className="w-4 h-4 mr-2" />
                           User 2
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleRoleChange(user.id, UserRole.USER3)}>
                           <User className="w-4 h-4 mr-2" />
                           User 3
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                     
                     {/* Delete Button */}
                     <Button
                       size="sm"
                       variant="destructive"
                       onClick={() => handleDelete(user.id)}
                     >
                       <Trash2 className="w-4 h-4 mr-1" />
                       Delete
                     </Button>
                     
                     {/* Ban Button */}
                     <Button
                       size="sm"
                       variant="outline"
                       className="border-red-300 text-red-600 hover:bg-red-50"
                     >
                       <Ban className="w-4 h-4 mr-1" />
                       Ban
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
