"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  PlusCircle,
  Search,
  Filter,
  Shield,
  LockKeyhole,
  Users,
  Eye,
  Edit2,
  Trash2,
  Download,
  Settings,
  CheckSquare,
  XSquare,
  User,
  UserCog,
  ShieldCheck,
  ShieldAlert,
  Key,
  Clock,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define types
interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: number[];
  isDefault: boolean;
}

interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
  category: string;
}

export default function RolesPermissionsList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("roles");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - would be replaced with API call
    const mockRoles: Role[] = [
      {
        id: "1",
        name: "Super Admin",
        description: "Complete access to all system functions and settings",
        userCount: 2,
        permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        isDefault: false,
      },
      {
        id: "2",
        name: "Admin",
        description: "Administrative access with some limitations",
        userCount: 5,
        permissions: [1, 2, 3, 4, 5, 8],
        isDefault: false,
      },
      {
        id: "3",
        name: "Teacher",
        description: "Access to teaching materials and student management",
        userCount: 25,
        permissions: [2, 4, 6, 9],
        isDefault: false,
      },
      {
        id: "4",
        name: "Student",
        description: "Access to courses, assignments and personal grades",
        userCount: 350,
        permissions: [2, 4],
        isDefault: true,
      },
    ];

    const mockPermissions: Permission[] = [
      {
        id: 1,
        name: "User Management",
        code: "user:manage",
        description: "Create, update, and delete user accounts",
        category: "User Administration",
      },
      {
        id: 2,
        name: "View Profile",
        code: "profile:view",
        description: "View user profiles",
        category: "User Administration",
      },
      {
        id: 3,
        name: "Edit Settings",
        code: "settings:edit",
        description: "Edit system settings",
        category: "System Administration",
      },
      {
        id: 4,
        name: "View Courses",
        code: "course:view",
        description: "View available courses",
        category: "Education",
      },
      {
        id: 5,
        name: "Manage Courses",
        code: "course:manage",
        description: "Create, update, and delete courses",
        category: "Education",
      },
      {
        id: 6,
        name: "Grade Management",
        code: "grade:manage",
        description: "Assign and manage student grades",
        category: "Education",
      },
      {
        id: 7,
        name: "Financial Management",
        code: "finance:manage",
        description: "Manage financial transactions and reports",
        category: "Finance",
      },
      {
        id: 8,
        name: "Report Generation",
        code: "report:generate",
        description: "Generate and download system reports",
        category: "Reporting",
      },
      {
        id: 9,
        name: "Attendance Management",
        code: "attendance:manage",
        description: "Manage student attendance",
        category: "Education",
      },
      {
        id: 10,
        name: "Role Management",
        code: "role:manage",
        description: "Create, update, and delete user roles",
        category: "User Administration",
      },
    ];

    setRoles(mockRoles);
    setPermissions(mockPermissions);
    setLoading(false);
  }, []);

  // Filter roles based on search
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter permissions based on search and category
  const filteredPermissions = permissions.filter((permission) => {
    let match = true;
    
    // Filter by search
    if (searchQuery) {
      match = match && (
        permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter !== "all") {
      match = match && permission.category === categoryFilter;
    }
    
    return match;
  });

  // Group permissions by category
  const permissionsByCategory: Record<string, Permission[]> = {};
  filteredPermissions.forEach((permission) => {
    if (!permissionsByCategory[permission.category]) {
      permissionsByCategory[permission.category] = [];
    }
    permissionsByCategory[permission.category].push(permission);
  });

  // Statistics
  const totalRoles = roles.length;
  const totalPermissions = permissions.length;
  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);
  const defaultRole = roles.find((r) => r.isDefault)?.name || "None";

  // Get unique categories for filter
  const categories = [...new Set(permissions.map((p) => p.category))];

  // Handler functions
  const handleRoleView = (role: Role) => {
    console.log("View role:", role);
  };

  const handleRoleEdit = (role: Role) => {
    console.log("Edit role:", role);
  };

  const handleRoleDelete = (role: Role) => {
    console.log("Delete role:", role);
  };

  const handlePermissionEdit = (permission: Permission) => {
    console.log("Edit permission:", permission);
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
        return <Badge className="bg-gray-100 text-gray-800 font-medium border-gray-200 hover:bg-gray-200 hover:text-gray-900">{role}</Badge>;
    }
  };

  // Permission check component
  const PermissionCheck = ({ isGranted }: { isGranted: boolean }) => {
    return isGranted ? (
      <CheckSquare className="h-5 w-5 text-green-600" />
    ) : (
      <XSquare className="h-5 w-5 text-gray-300" />
    );
  };

  return (
    <div className="space-y-8 px-6 py-3 max-w-[90rem] mx-auto bg-white">
      {/* Header with breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[#C40001]">
            Roles & Permissions Management
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <Link href="/dashboard" className="hover:text-[#C40503] transition-colors">
              Dashboard
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/dashboard/users" className="hover:text-[#C40503] transition-colors">
              User Management
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Roles & Permissions</span>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-white">
          <div className="h-1.5 w-full bg-[#C40001]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <div className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-300">
              <Shield className="h-4 w-4 text-[#C40503]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{totalRoles}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#C40503]"></span>
              System roles available
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-white">
          <div className="h-1.5 w-full bg-[#DAA625]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
            <div className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 transition-all duration-300">
              <Key className="h-4 w-4 text-[#DAA625]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{totalPermissions}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#DAA625]"></span>
              Available system permissions
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-blue-50/20">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-blue-600/70"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{totalUsers}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
              Total users across all roles
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-br from-white to-purple-50/20">
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 to-purple-600/70"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Default Role</CardTitle>
            <div className="p-2.5 rounded-full bg-purple-50 hover:bg-purple-100 transition-all duration-300">
              <UserCog className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{defaultRole}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-600"></span>
              Default role for new users
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card with Tabs */}
      <Card className="shadow-md border-none overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="h-1.5 w-full bg-[#C40001]"></div>
        <CardHeader className="pb-3 pt-5 bg-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#C40503]" />
                Access Control
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5 mt-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C40001]"></span>
                Manage roles and permissions across the system
              </CardDescription>
            </div>
            
             <div className="flex flex-col sm:flex-row gap-3">
               <Link href="/dashboard/users/roles/add">
                 <Button className="bg-[#C40001] hover:bg-[#a30300] text-white">
                   <Plus className="h-4 w-4 mr-2" />
                   Create Role
                 </Button>
               </Link>
               <Link href="/dashboard/users/roles/permissions/add">
                 <Button variant="outline" className="text-[#DAA625] border-[#DAA625]/20 hover:bg-[#DAA625]/5">
                   <Plus className="h-4 w-4 mr-2" />
                   Create Permission
                 </Button>
               </Link>
               <Button variant="outline" className="text-[#C40503] border-[#C40503]/20 hover:bg-[#C40503]/5">
                 <Download className="h-4 w-4 mr-2" />
                 Export Data
               </Button>
             </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 pb-4">
          <Tabs defaultValue="roles" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <div className="px-4 pt-4">
              <TabsList className="grid w-full grid-cols-2 shadow-sm">
                <TabsTrigger 
                  value="roles" 
                  className={`${activeTab === "roles" ? "bg-[#DAA625] text-[#C40001] shadow-sm" : ""} transition-all duration-300`}
                >
                  Roles
                </TabsTrigger>
                <TabsTrigger 
                  value="permissions" 
                  className={`${activeTab === "permissions" ? "bg-[#C40001] text-[#C40001] shadow-sm" : ""} transition-all duration-300`}
                >
                  Permissions
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="roles" className="mt-0">
              {/* Search and Filters */}
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 transition-all group-focus-within:text-[#C40503]" />
                    <Input
                      placeholder="Search roles by name, description..."
                      className="pl-9 border-gray-200 focus-visible:border-[#C40503]/30 focus-visible:ring-[#C40503]/20 transition-all hover:border-gray-300 group"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Roles Table */}
              <div className="px-4 pt-4 overflow-auto">
                {loading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C40503]"></div>
                  </div>
                ) : filteredRoles.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
                    <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">No roles found</h3>
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your search to find what you're looking for</p>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-50/80">
                        <TableRow className="hover:bg-gray-50/90">
                          <TableHead className="w-[60px] text-center font-medium text-gray-700">No</TableHead>
                          <TableHead className="w-[200px] font-medium text-gray-700">Role Name</TableHead>
                          <TableHead className="w-[300px] font-medium text-gray-700">Description</TableHead>
                          <TableHead className="w-[120px] font-medium text-gray-700">Users</TableHead>
                          <TableHead className="w-[120px] font-medium text-gray-700">Status</TableHead>
                          <TableHead className="w-[120px] text-center font-medium text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRoles.map((role, index) => (
                          <TableRow key={role.id} className="transition-colors hover:bg-gray-50/70">
                            <TableCell className="text-center font-medium text-gray-600">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {role.name === "Super Admin" ? (
                                  <ShieldCheck className="h-5 w-5 text-[#C40503]" />
                                ) : role.name === "Admin" ? (
                                  <Shield className="h-5 w-5 text-amber-600" />
                                ) : (
                                  <User className="h-5 w-5 text-gray-500" />
                                )}
                                {getRoleBadge(role.name)}
                              </div>
                            </TableCell>
                            
                            <TableCell>
                              <div className="text-sm text-gray-600">{role.description}</div>
                            </TableCell>
                            
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="bg-blue-50 text-blue-700 font-medium rounded-full px-2 py-1 text-xs">
                                  {role.userCount} Users
                                </div>
                                {role.userCount > 100 && (
                                  <Badge className="bg-purple-50 text-purple-700">High Usage</Badge>
                                )}
                              </div>
                            </TableCell>
                            
                            <TableCell>
                              {role.isDefault ? (
                                <Badge className="bg-green-100 text-green-800">Default</Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800">Standard</Badge>
                              )}
                            </TableCell>
                            
                            <TableCell className="text-center">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleRoleView(role)}
                                >
                                  <Eye className="h-4 w-4 text-gray-500" />
                                </Button>
                                 <Link href={`/dashboard/users/roles/edit/${role.id}`}>
                                   <Button
                                     variant="ghost"
                                     size="sm"
                                     className="h-8 w-8 p-0"
                                   >
                                     <Edit2 className="h-4 w-4 text-[#DAA625]" />
                                   </Button>
                                 </Link>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleRoleDelete(role)}
                                  disabled={role.name === "Super Admin"}
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
            </TabsContent>
            
            <TabsContent value="permissions" className="mt-0">
              {/* Search and Filters */}
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 transition-all group-focus-within:text-[#C40503]" />
                    <Input
                      placeholder="Search permissions by name, code, description..."
                      className="pl-9 border-gray-200 focus-visible:border-[#C40503]/30 focus-visible:ring-[#C40503]/20 transition-all hover:border-gray-300 group"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Permissions Matrix */}
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Permissions Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Permission
                        </th>
                        {roles.map((role) => (
                          <th key={role.id} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                            {role.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPermissions.map((permission) => (
                        <tr key={permission.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3.5 whitespace-nowrap border-r">
                            <div className="font-medium text-gray-900">{permission.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{permission.code}</div>
                          </td>
                          {roles.map((role) => (
                            <td key={role.id} className="px-4 py-3.5 text-center border-r">
                              <div className="flex justify-center">
                                <PermissionCheck isGranted={role.permissions.includes(permission.id)} />
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              

            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
