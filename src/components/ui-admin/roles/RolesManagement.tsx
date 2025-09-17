"use client";

import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiUsers, FiUserCheck, FiShield, FiKey, FiEye } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Shield, LockKeyhole, Users } from "lucide-react";
import { mockRoles, mockPermissions, Role, Permission } from "@/data/data-admin/roles-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RolesManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("roles");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  // Get user role from localStorage on component mount
  useEffect(() => {
    // Try to get the role from localStorage
    const storedRole = localStorage.getItem("userRole");
    
    // Debugging - Ensure we're getting the correct role
    console.log("Current user role:", storedRole);
    
    setUserRole(storedRole);
    // Super Admin has full access, Admin has limited access
    setIsViewOnly(storedRole === "Admin");
  }, []);

  // Filtered roles based on search
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered permissions based on search
  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Check if a role is editable based on user role
  const isRoleEditable = (roleName: string) => {
    // Admin can't edit Super Admin
    if (userRole === "Admin" && roleName === "Super Admin") {
      return false;
    }
    // Super Admin can edit everything
    if (userRole === "Super Admin") {
      return true;
    }
    return !isViewOnly;
  };
  
  // Check if actions should be shown for a role
  const showActionsForRole = (roleName: string) => {
    // Admin can't see actions for Super Admin
    if (userRole === "Admin" && roleName === "Super Admin") {
      return false;
    }
    return true;
  };
  
  // Determine if we should hide specific actions for certain roles
  const shouldHideAction = (role: Role) => {
    return userRole === "Admin" && role.name === "Super Admin";
  };

  // Group permissions by category
  const permissionsByCategory: Record<string, Permission[]> = {};
  filteredPermissions.forEach((permission) => {
    if (!permissionsByCategory[permission.category]) {
      permissionsByCategory[permission.category] = [];
    }
    permissionsByCategory[permission.category].push(permission);
  });

  // Count statistics
  const totalRoles = roles.length;
  const totalPermissions = permissions.length;
  const defaultRole = roles.find((r) => r.isDefault)?.name || "None";

  // Display tooltip when trying to edit Super Admin
  const [showSuperAdminNotice, setShowSuperAdminNotice] = useState(false);
  
  // Additional check for safety - ensure that the UI properly reflects restrictions
  useEffect(() => {
    if (userRole === "Admin") {
      console.log("Admin role detected - ensuring Super Admin actions are hidden");
    }
  }, [userRole]);

  return (
    <div className="space-y-6 py-5 px-6">
      {userRole === "Admin" && showSuperAdminNotice && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Super Admin details can only be viewed but not edited by Admin users
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setShowSuperAdminNotice(false)}
                  className="inline-flex rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Role & Permissions Management
          </h1>
          <p className="text-gray-500 mt-1">Manage user roles and access permissions in the system</p>
        </div>
        
        {userRole === "Super Admin" ? (
          <Button className="bg-[#C40503] hover:bg-[#a50402] text-white flex items-center gap-2">
            <FiPlus className="h-4 w-4" />
            Create New Role
          </Button>
        ) : isViewOnly ? (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 py-2 px-3">
            View Only Mode - Limited Access
          </Badge>
        ) : (
          <Button className="bg-[#C40503] hover:bg-[#a50402] text-white flex items-center gap-2">
            <FiPlus className="h-4 w-4" />
            Create New Role
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-md bg-[#C40001] text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Roles
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-3xl font-bold">{totalRoles}</div>
            <p className="text-sm opacity-80 mt-1">Available in the system</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-[#DAA625] text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <LockKeyhole className="h-5 w-5" />
              Total Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-3xl font-bold">{totalPermissions}</div>
            <p className="text-sm opacity-80 mt-1">Individual access rights</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-purple-600 text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Default Role
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-3xl font-bold">{defaultRole}</div>
            <p className="text-sm opacity-80 mt-1">For new user accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Roles and Permissions */}
      <Tabs defaultValue="roles" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2 bg-white">
          <TabsTrigger value="roles" className="text-base">Roles</TabsTrigger>
          <TabsTrigger value="permissions" className="text-base">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="mt-4">
          {/* Search and Filters for Roles */}
          <div className="flex flex-col sm:flex-row gap-3 py-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search roles..."
                className="pl-8 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-white">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Roles Table */}
          <Card className="bg-white shadow-md rounded-lg overflow-hidden border-none">
            <div className="overflow-x-auto py-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Users
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRoles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {role.name}
                        </div>
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{role.userCount}</div>
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="text-sm text-gray-900 flex flex-wrap gap-1">
                          {role.permissions.length} permissions
                          {role.permissions.includes(2) && (
                            <Badge className="ml-1 bg-blue-100 text-blue-800 border-blue-200">User</Badge>
                          )}
                          {role.permissions.includes(4) && (
                            <Badge className="bg-[#DAA625]/10 text-[#DAA625] border-[#DAA625]/20">Student</Badge>
                          )}
                          {role.permissions.includes(6) && (
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">Teacher</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <Badge
                          className={`
                            ${role.isDefault ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}
                          `}
                        >
                          {role.isDefault ? "Default" : "Standard"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          {shouldHideAction(role) ? (
                            <span className="text-xs text-gray-400">No actions available</span>
                          ) : !isRoleEditable(role.name) ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-blue-600" 
                              title="View only"
                              onClick={() => {
                                if (role.name === "Super Admin" && userRole === "Admin") {
                                  setShowSuperAdminNotice(true);
                                }
                              }}
                            >
                              <FiEye className="h-4 w-4" />
                            </Button>
                          ) : (
                            <>
                              {/* Only show edit button if not admin looking at super admin */}
                              {!(userRole === "Admin" && role.name === "Super Admin") && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 w-8 p-0 text-[#DAA625]"
                                >
                                  <FiEdit2 className="h-4 w-4" />
                                </Button>
                              )}
                              {/* Only show delete button if not admin looking at super admin */}
                              {!(userRole === "Admin" && role.name === "Super Admin") && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 w-8 p-0 text-[#C40503]"
                                  disabled={role.name === "Super Admin" && userRole !== "Super Admin"}
                                  title={role.name === "Super Admin" && userRole !== "Super Admin" ? "Super Admin cannot be deleted" : "Delete role"}
                                >
                                  <FiTrash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="mt-4">
          <div className="mb-4 flex flex-wrap gap-2 items-center bg-gray-50 p-4 rounded-md">
            <span className="text-sm font-medium">Permission Key:</span>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin</Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">Teacher</Badge>
            <Badge className="bg-[#DAA625]/10 text-[#DAA625] border-[#DAA625]/20">Student</Badge>
            <span className="text-sm text-gray-500 ml-2">Badges indicate which roles have the permission</span>
          </div>
          
          {/* Search and Filters for Permissions */}
          <div className="flex flex-col sm:flex-row gap-3 py-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search permissions..."
                className="pl-8 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-white">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Permissions by Category */}
          <div className="space-y-6">
            {Object.entries(permissionsByCategory).map(([category, perms]) => (
              <Card key={category} className="bg-white shadow-md rounded-lg overflow-hidden border-none">
                <CardHeader className="pb-2 pt-4 bg-gray-50">
                  <CardTitle className="text-md font-medium flex items-center gap-2 text-gray-700">
                    <FiKey className="h-4 w-4" />
                    {category}
                  </CardTitle>
                </CardHeader>
                <div className="overflow-x-auto py-2">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Permission Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {perms.map((permission) => (
                        <tr key={permission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3.5 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {permission.name}
                              <div className="flex flex-wrap gap-1 mt-1">
                                {mockRoles.find(role => role.name === "Admin")?.permissions.includes(permission.id) && (
                                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">Admin</Badge>
                                )}
                                {mockRoles.find(role => role.name === "Teacher")?.permissions.includes(permission.id) && (
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Teacher</Badge>
                                )}
                                {mockRoles.find(role => role.name === "Student")?.permissions.includes(permission.id) && (
                                  <Badge className="bg-[#DAA625]/10 text-[#DAA625] border-[#DAA625]/20 text-xs">Student</Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                              {permission.code}
                            </code>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="text-sm text-gray-500">{permission.description}</div>
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              {isViewOnly ? (
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-blue-600">
                                  <FiEye className="h-4 w-4" />
                                </Button>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-[#DAA625]">
                                    <FiEdit2 className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-8 w-8 p-0 text-[#C40503]"
                                    disabled={[1, 2, 3].includes(permission.id) && userRole !== "Super Admin"}
                                    title={[1, 2, 3].includes(permission.id) && userRole !== "Super Admin" ? "Core permission cannot be deleted" : "Delete permission"}
                                  >
                                    <FiTrash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
