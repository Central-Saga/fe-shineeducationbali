"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  PlusCircle,
  Search,
  Filter,
  UserPlus,
  Users,
  User as UserIcon,
  Shield,
  GraduationCap,
  Mail,
  Phone,
  CalendarClock,
  MoreHorizontal,
  Edit2,
  Trash2,
  Download,
  EyeIcon,
  ShieldCheck,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { mockDetailedUsers, User } from "@/data/data-admin/users-data";

interface UsersManagementProps {
  title: string;
  description: string;
  userType: "all" | "admin" | "teacher" | "student";
  showRoleFilter?: boolean;
}

export default function UsersManagement({
  title,
  description,
  userType,
  showRoleFilter = true,
}: UsersManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    // Filter users based on userType
    let filteredUsers: User[] = [];
    switch (userType) {
      case "admin":
        filteredUsers = mockDetailedUsers.filter(user => 
          user.role === "Admin" || user.role === "Super Admin"
        );
        break;
      case "teacher":
        filteredUsers = mockDetailedUsers.filter(user => 
          user.role === "Teacher"
        );
        break;
      case "student":
        filteredUsers = mockDetailedUsers.filter(user => 
          user.role === "Student"
        );
        break;
      default:
        filteredUsers = mockDetailedUsers;
    }

    setUsers(filteredUsers);
    setLoading(false);
  }, [userType]);

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
    active: users.filter(user => user.status === "active").length,
    inactive: users.filter(user => user.status === "inactive").length,
    pending: users.filter(user => user.status === "pending").length,
    admins: users.filter(user => user.role === "Admin" || user.role === "Super Admin").length,
    teachers: users.filter(user => user.role === "Teacher").length,
    students: users.filter(user => user.role === "Student").length,
  };

  // Get today's date
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const recentUsers = users.filter(user => {
    if (!user.createdAt) return false;
    
    const createdDate = new Date(user.createdAt);
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Users created in the last 30 days
  });

  // Handle action buttons
  const handleView = (user: User) => {
    console.log("View user details:", user);
    // Implement view functionality
  };

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
    // Implement edit functionality
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
    // Implement delete functionality
  };

  // Format date to readable format
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Determine status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900 transition-colors font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 hover:text-gray-900 transition-colors font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 hover:text-amber-900 transition-colors font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      default:
        return <Badge className="hover:bg-gray-200 transition-colors">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
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
        return <UserIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  // Get role badge styling
  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "super admin":
        return <Badge className="bg-red-100 text-[#C40503] font-medium border-red-200 hover:bg-red-200 hover:text-[#C40503]">{role}</Badge>;
      case "admin":
        return <Badge className="bg-amber-100 text-amber-800 font-medium border-amber-200 hover:bg-amber-200 hover:text-amber-900">{role}</Badge>;
      case "teacher":
        return <Badge className="bg-blue-100 text-blue-800 font-medium border-blue-200 hover:bg-blue-200 hover:text-blue-900">{role}</Badge>;
      case "student":
        return <Badge className="bg-purple-100 text-purple-800 font-medium border-purple-200 hover:bg-purple-200 hover:text-purple-900">{role}</Badge>;
      default:
        return <Badge variant="outline" className="hover:bg-gray-100">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-8 px-6 py-10 max-w-[90rem] mx-auto bg-white">
      {/* Header with breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[#C40001]">
            {title}
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <Link href="/dashboard" className="hover:text-[#C40503] transition-colors">
              Dashboard
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/dashboard/users" className="hover:text-[#C40503] transition-colors">
              User Management
            </Link>
            {userType !== "all" && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{title}</span>
              </>
            )}
          </div>
        </div>
        <Button className="bg-[#C40001] hover:bg-[#a30300] shadow-sm transition-all duration-300">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New {userType === "admin" ? "Admin" : userType === "teacher" ? "Teacher" : userType === "student" ? "Student" : "User"}
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-white">
          <div className="h-1.5 w-full bg-[#C40001]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-300">
              <Users className="h-4 w-4 text-[#C40503]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{stats.total}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#C40503]"></span>
              Total {userType !== "all" ? userType : "user"} accounts
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-white">
          <div className="h-1.5 w-full bg-[#DAA625]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 transition-all duration-300">
              <UserIcon className="h-4 w-4 text-[#DAA625]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{stats.active}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#DAA625]"></span>
              {Math.round((stats.active / stats.total) * 100) || 0}% of users are active
            </div>
          </CardContent>
        </Card>
        
        {userType === "all" && (
          <>
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-blue-50/20">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-500/70"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
                <CardTitle className="text-sm font-medium">New Users (30d)</CardTitle>
                <div className="p-2.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                  <UserPlus className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pb-2">{recentUsers.length}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                  {Math.round((recentUsers.length / stats.total) * 100) || 0}% growth in 30 days
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-purple-50/20">
              <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-purple-500/70"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <div className="p-2.5 rounded-full bg-purple-50 hover:bg-purple-100 transition-all duration-300">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pb-2">{stats.pending}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-500"></span>
                  Users waiting for approval
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {userType === "admin" && (
          <>
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-red-50/20">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#C40503] to-[#C40503]/70"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
                <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
                <div className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-300">
                  <ShieldCheck className="h-4 w-4 text-[#C40503]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pb-2">
                  {users.filter(u => u.role === "Super Admin").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-amber-50/20">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#DAA625] to-[#DAA625]/70"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
                <div className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 transition-all duration-300">
                  <Shield className="h-4 w-4 text-[#DAA625]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pb-2">
                  {users.filter(u => u.role === "Admin").length}
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {userType === "teacher" && (
          <>
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-blue-50/20">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-500/70"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
                <CardTitle className="text-sm font-medium">Senior Teachers</CardTitle>
                <div className="p-2.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pb-2">
                  {users.filter(u => u.position === "Senior Teacher").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-green-50/20">
              <div className="h-1.5 w-full bg-gradient-to-r from-green-500 to-green-500/70"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
                <CardTitle className="text-sm font-medium">Junior Teachers</CardTitle>
                <div className="p-2.5 rounded-full bg-green-50 hover:bg-green-100 transition-all duration-300">
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pb-2">
                  {users.filter(u => u.position === "Junior Teacher").length}
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {userType === "student" && (
          <>
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-purple-50/20">
              <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-purple-500/70"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
                <CardTitle className="text-sm font-medium">New Students (30d)</CardTitle>
                <div className="p-2.5 rounded-full bg-purple-50 hover:bg-purple-100 transition-all duration-300">
                  <UserPlus className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pb-2">{recentUsers.length}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-500"></span>
                  {Math.round((recentUsers.length / stats.total) * 100) || 0}% growth in 30 days
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-amber-50/20">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#DAA625] to-[#DAA625]/70"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
                <CardTitle className="text-sm font-medium">Pending Registration</CardTitle>
                <div className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 transition-all duration-300">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pb-2">{stats.pending}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                  Users waiting for registration
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Main Card */}
      <Card className="shadow-md border-none overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="h-1.5 w-full bg-[#C40001]"></div>
        <CardHeader className="pb-3 pt-5 bg-white">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0 lg:items-center">
            <div>
              <CardTitle className="mb-1.5 font-bold text-gray-800">{title}</CardTitle>
              <CardDescription className="text-sm text-gray-500 flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C40001]"></span>
                {description}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 transition-all group-focus-within:text-[#C40503]" />
                <Input
                  type="search"
                  placeholder="Search users by name, email or ID..."
                  className="pl-9 pr-4 border-gray-200 focus-visible:border-[#C40503]/30 focus-visible:ring-[#C40503]/20 transition-all hover:border-gray-300 group"
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 pb-4">
          
          {/* Tabs - Only show for All Users */}
          {/* {userType === "all" && (
            <div className="px-4 pt-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white border shadow-sm rounded-md">
                  <TabsTrigger 
                    value="all"
                    className={`${activeTab === "all" ? "bg-[#C40001]/10 text-[#C40001] shadow-sm" : ""} transition-all duration-300`}
                  >
                    All Users
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin"
                    className={`${activeTab === "admin" ? "bg-[#C40001]/10 text-[#C40001] shadow-sm" : ""} transition-all duration-300`}
                  >
                    Admins
                  </TabsTrigger>
                  <TabsTrigger 
                    value="teacher"
                    className={`${activeTab === "teacher" ? "bg-[#C40001]/10 text-[#C40001] shadow-sm" : ""} transition-all duration-300`}
                  >
                    Teachers
                  </TabsTrigger>
                  <TabsTrigger 
                    value="student"
                    className={`${activeTab === "student" ? "bg-[#C40001]/10 text-[#C40001] shadow-sm" : ""} transition-all duration-300`}
                  >
                    Students
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )} */}
          
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
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for</p>
              </div>
            ) : (
              <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
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
                            <Avatar className="h-9 w-9 border border-gray-200 transition-transform hover:scale-110">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-[#C40001] text-white">
                                {user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                                <Mail className="h-3 w-3 text-[#C40503]/80" />
                                <span className="hover:text-[#C40503] transition-colors">{user.email}</span>
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
                              className="h-8 w-8 p-0 transition-all hover:bg-blue-100/60 hover:text-blue-700"
                              onClick={() => handleView(user)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 transition-all hover:bg-amber-100/60 hover:text-[#DAA625]"
                              onClick={() => handleEdit(user)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 transition-all hover:bg-red-100/60 hover:text-red-700"
                              onClick={() => handleDelete(user)}
                            >
                              <Trash2 className="h-4 w-4" />
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
