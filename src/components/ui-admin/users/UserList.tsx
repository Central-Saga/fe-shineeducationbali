"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { userService, User as ApiUser } from "@/lib/services/user.service";
import {
  Search,
  Filter,
  UserPlus,
  Users,
  User,
  Shield,
  GraduationCap,
  Mail,
  Edit2,
  Trash2,
  Download,
  EyeIcon,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Aktif" | "Tidak Aktif" | "Pending";
  avatar?: string;
  phone?: string;
  lastActive?: string;
  createdAt: string;
  permissions?: string[];
  department?: string;
  position?: string;
}

interface UserListProps {
  title: string;
  description: string;
  userType: "all" | "admin" | "teacher" | "student";
  showRoleFilter?: boolean;
}

export default function UserList({
  title,
  description,
  userType,
  showRoleFilter = true,
}: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let response;
        
        if (userType === "all") {
          response = await userService.getUsers({
            search: search,
            role: roleFilter !== "all" ? roleFilter : undefined,
            status: statusFilter !== "all" ? statusFilter : undefined,
          });
        } else {
          response = await userService.getUsersByRole(userType, {
            search: search,
            status: statusFilter !== "all" ? statusFilter : undefined,
          });
        }

        if (response.success && response.data) {
          let usersData: ApiUser[] = [];
          
          if (Array.isArray(response.data)) {
            usersData = response.data;
          } else if (response.data && 'users' in response.data) {
            usersData = response.data.users;
          } else if (response.data && 'id' in response.data) {
            usersData = [response.data];
          }
          
          console.log('UserList - Parsed users data:', usersData);
          
          // Transform API data to match component interface
          const transformedUsers: User[] = usersData.map((user: ApiUser) => ({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status as "Aktif" | "Tidak Aktif" | "Pending",
            avatar: user.avatar,
            phone: user.phone,
            lastActive: user.last_active,
            createdAt: user.created_at,
            permissions: user.permissions,
            department: user.department,
            position: user.position,
          }));
          
          console.log('UserList - Transformed users:', transformedUsers);
          setUsers(transformedUsers);
        } else {
          console.error('UserList - Failed to fetch users:', response);
        }
      } catch (error: unknown) {
        console.error('Error fetching users:', error);
        // Fallback to empty array on error
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userType, search, roleFilter, statusFilter]);

  // Filter users based on search, role, and status
  const filteredUsers = users.filter(user => {
    let match = true;
    
    // Filter by search
    if (search) {
      match = match && (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by role
    if (roleFilter !== "all") {
      match = match && user.role === roleFilter;
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      match = match && user.status === statusFilter;
    }

    // Filter by tab
    if (activeTab !== "all") {
      match = match && user.role.toLowerCase() === activeTab;
    }
    
    return match;
  });

  // Get unique roles for filter
  const roles = [...new Set(users.map(user => user.role))];

  // Statistics based on user data
  const stats = {
    total: users.length,
    active: users.filter(user => user.status === "Aktif").length,
    inactive: users.filter(user => user.status === "Tidak Aktif").length,
    pending: users.filter(user => user.status === "Pending").length,
    admins: users.filter(user => user.role === "Admin" || user.role === "Super Admin").length,
    teachers: users.filter(user => user.role === "Teacher").length,
    students: users.filter(user => user.role === "Student").length,
  };

  // Get today's date
  const today = new Date();
  const recentUsers = users.filter(user => {
    const createdDate = new Date(user.createdAt);
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Users created in the last 30 days
  });

  // Handle action buttons
  const handleView = (user: User) => {
    console.log("View user details:", user);
    // Implement view functionality - could navigate to user detail page
  };

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
    // Navigate to edit user page
    window.location.href = `/dashboard/users/edit/${user.id}`;
  };

  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      try {
        const response = await userService.deleteUser(parseInt(user.id));
        if (response.success) {
          // Remove user from local state
          setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
          console.log("User deleted successfully");
        } else {
          console.error("Failed to delete user:", response.message);
        }
      } catch (error: unknown) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Determine status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktif":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Aktif</Badge>;
      case "Tidak Aktif":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Tidak Aktif</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "super admin":
        return <ShieldCheck className="h-4 w-4 text-[#C40503]" />;
      case "admin":
        return <Shield className="h-4 w-4 text-[#DAA625]" />;
      case "teacher":
        return <GraduationCap className="h-4 w-4 text-blue-600" />;
      case "student":
        return <User className="h-4 w-4 text-purple-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  // Get role badge styling
  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "super admin":
        return <Badge className="bg-red-50 text-[#C40503] border-red-200">{role}</Badge>;
      case "admin":
        return <Badge className="bg-amber-50 text-[#DAA625] border-amber-200">{role}</Badge>;
      case "teacher":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">{role}</Badge>;
      case "student":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">{role}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-[#C40503]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2 rounded-full bg-red-50">
              <Users className="h-4 w-4 text-[#C40503]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="p-2 rounded-full bg-amber-50">
              <User className="h-4 w-4 text-[#DAA625]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">{stats.active}</div>
          </CardContent>
        </Card>
        
        {userType === "all" && (
          <>
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
                <CardTitle className="text-sm font-medium">New Users (30d)</CardTitle>
                <div className="p-2 rounded-full bg-blue-50">
                  <UserPlus className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold pb-5">{recentUsers.length}</div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-[#DAA625] to-[#C40503]"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <div className="p-2 rounded-full bg-purple-50">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold pb-5">{stats.pending}</div>
              </CardContent>
            </Card>
          </>
        )}
        
        {userType === "admin" && (
          <>
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
                <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
                <div className="p-2 rounded-full bg-red-50">
                  <ShieldCheck className="h-4 w-4 text-[#C40503]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold pb-5">
                  {users.filter(u => u.role === "Super Admin").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-[#DAA625] to-[#C40503]"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
                <div className="p-2 rounded-full bg-amber-50">
                  <Shield className="h-4 w-4 text-[#DAA625]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold pb-5">
                  {users.filter(u => u.role === "Admin").length}
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {userType === "teacher" && (
          <>
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
                <CardTitle className="text-sm font-medium">Senior Teachers</CardTitle>
                <div className="p-2 rounded-full bg-blue-50">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold pb-5">
                  {users.filter(u => u.position === "Senior Teacher").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-[#DAA625] to-[#C40503]"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
                <CardTitle className="text-sm font-medium">Junior Teachers</CardTitle>
                <div className="p-2 rounded-full bg-green-50">
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold pb-5">
                  {users.filter(u => u.position === "Junior Teacher").length}
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {userType === "student" && (
          <>
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
                <CardTitle className="text-sm font-medium">New Students (30d)</CardTitle>
                <div className="p-2 rounded-full bg-purple-50">
                  <UserPlus className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold pb-5">{recentUsers.length}</div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-1 w-full bg-gradient-to-r from-[#DAA625] to-[#C40503]"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
                <CardTitle className="text-sm font-medium">Pending Registration</CardTitle>
                <div className="p-2 rounded-full bg-amber-50">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold pb-5">{stats.pending}</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Main Card */}
      <Card className="shadow-md border-none overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
        <CardHeader className="pb-3 pt-5 bg-gradient-to-r from-white to-red-50/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                {userType === "admin" ? (
                  <Shield className="h-5 w-5 text-[#C40503]" />
                ) : userType === "teacher" ? (
                  <GraduationCap className="h-5 w-5 text-[#C40503]" />
                ) : userType === "student" ? (
                  <User className="h-5 w-5 text-[#C40503]" />
                ) : (
                  <Users className="h-5 w-5 text-[#C40503]" />
                )}
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="bg-[#C40503] hover:bg-[#A60000]"
                onClick={() => window.location.href = '/dashboard/users/add'}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
              <Button variant="outline" className="text-[#C40503] border-[#C40503]/20 hover:bg-[#C40503]/5">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 pb-4">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users by name, email or ID..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                {showRoleFilter && (
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tabs - Only show for All Users */}
          {userType === "all" && (
            <div className="px-4 pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white border">
                  <TabsTrigger 
                    value="all"
                    className={activeTab === "all" ? "text-[#C40503]" : ""}
                  >
                    All Users
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin"
                    className={activeTab === "admin" ? "text-[#C40503]" : ""}
                  >
                    Admins
                  </TabsTrigger>
                  <TabsTrigger 
                    value="teacher"
                    className={activeTab === "teacher" ? "text-[#C40503]" : ""}
                  >
                    Teachers
                  </TabsTrigger>
                  <TabsTrigger 
                    value="student"
                    className={activeTab === "student" ? "text-[#C40503]" : ""}
                  >
                    Students
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
          
          {/* Users Table */}
          <div className="px-4 pt-4 overflow-auto">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C40503]"></div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No users found</h3>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filter to find what you&apos;re looking for</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50/80">
                    <TableRow className="hover:bg-gray-50/90">
                      <TableHead className="w-[60px] text-center font-medium text-gray-700">No</TableHead>
                      <TableHead className="w-[280px] font-medium text-gray-700">User</TableHead>
                      {userType === "all" && <TableHead className="w-[150px] font-medium text-gray-700">Role</TableHead>}
                      <TableHead className="w-[120px] font-medium text-gray-700">Status</TableHead>
                      <TableHead className="w-[140px] font-medium text-gray-700">Last Active</TableHead>
                      <TableHead className="w-[120px] font-medium text-gray-700">Created</TableHead>
                      <TableHead className="w-[120px] text-center font-medium text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <TableRow key={user.id} className="transition-colors hover:bg-gray-50/70">
                        <TableCell className="text-center font-medium text-gray-600">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-gray-200">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-[#C40001] text-white">
                                {user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        
                        {userType === "all" && (
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {getRoleIcon(user.role)}
                              {getRoleBadge(user.role)}
                            </div>
                          </TableCell>
                        )}
                        
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Clock className="h-3.5 w-3.5 text-gray-500" />
                            {user.lastActive ? new Date(user.lastActive).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }) : "Never"}
                          </div>
                        </TableCell>
                        
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleView(user)}
                            >
                              <EyeIcon className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEdit(user)}
                            >
                              <Edit2 className="h-4 w-4 text-[#DAA625]" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleDelete(user)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="px-4 pt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
