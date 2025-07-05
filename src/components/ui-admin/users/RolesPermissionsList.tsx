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
      {
        id: "5",
        name: "Parent",
        description: "Limited access to view child's progress and communicate with teachers",
        userCount: 180,
        permissions: [2, 4],
        isDefault: false,
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
        return <Badge className="bg-red-50 text-[#C40503] border-red-100">{role}</Badge>;
      case "admin":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-100">{role}</Badge>;
      case "teacher":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-100">{role}</Badge>;
      case "student":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-100">{role}</Badge>;
      default:
        return <Badge className="bg-gray-50 text-gray-700 border-gray-100">{role}</Badge>;
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Roles & Permissions Management
        </h2>
        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-700">
            {totalRoles} Roles Available
          </span>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-[#C40503]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <div className="p-2 rounded-full bg-red-50">
              <Shield className="h-4 w-4 text-[#C40503]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">{totalRoles}</div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
            <div className="p-2 rounded-full bg-amber-50">
              <Key className="h-4 w-4 text-[#DAA625]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">{totalPermissions}</div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2 rounded-full bg-blue-50">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-gradient-to-r from-[#DAA625] to-[#C40503]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Default Role</CardTitle>
            <div className="p-2 rounded-full bg-purple-50">
              <UserCog className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">{defaultRole}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card with Tabs */}
      <Card className="shadow-md border-none overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
        <CardHeader className="pb-3 pt-5 bg-gradient-to-r from-white to-red-50/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#C40503]" />
                Access Control
              </CardTitle>
              <CardDescription>Manage roles and permissions across the system</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-[#C40503] hover:bg-[#A60000]">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Role
              </Button>
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="roles" 
                  className={activeTab === "roles" ? "data-[state=active]:bg-[#C40503] data-[state=active]:text-white" : ""}
                >
                  Roles
                </TabsTrigger>
                <TabsTrigger 
                  value="permissions" 
                  className={activeTab === "permissions" ? "data-[state=active]:bg-[#C40503] data-[state=active]:text-white" : ""}
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
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search roles by name, description..."
                      className="pl-9"
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
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Role Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Users</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRoles.map((role) => (
                          <TableRow key={role.id}>
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
                            
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleRoleView(role)}
                                >
                                  <Eye className="h-4 w-4 text-gray-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleRoleEdit(role)}
                                >
                                  <Edit2 className="h-4 w-4 text-[#DAA625]" />
                                </Button>
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
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search permissions by name, code, description..."
                      className="pl-9"
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
              
              {/* Permissions List by Category */}
              <div className="px-4 pt-6 space-y-6">
                <h3 className="text-lg font-medium mb-2">Permission Details</h3>
                {Object.entries(permissionsByCategory).map(([category, perms]) => (
                  <Card key={category} className="shadow-sm border">
                    <CardHeader className="bg-gray-50 py-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Key className="h-4 w-4 text-[#DAA625]" />
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100">
                        {perms.map((permission) => (
                          <div key={permission.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-gray-900 flex items-center gap-2">
                                  {permission.name}
                                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                                    {permission.code}
                                  </code>
                                </div>
                                <div className="text-sm text-gray-600 mt-1">{permission.description}</div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {roles.filter(r => r.permissions.includes(permission.id)).map(r => (
                                    <Badge key={r.id} className="bg-gray-100 text-gray-800 border-gray-200">
                                      {r.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 p-0 px-2"
                                onClick={() => handlePermissionEdit(permission)}
                              >
                                <Edit2 className="h-4 w-4 mr-1 text-[#DAA625]" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
