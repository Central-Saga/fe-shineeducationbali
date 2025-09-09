"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  Save,
  X,
  CheckSquare,
  XSquare,
  Trash2,
} from "lucide-react";
import Link from "next/link";

// Define types
interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: number[];
  isDefault: boolean;
}

interface EditRoleProps {
  roleId: string;
}

export default function EditRole({ roleId }: EditRoleProps) {
  const router = useRouter();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as number[],
    isDefault: false
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    permissions: ""
  });

  useEffect(() => {
    // Mock data - would be replaced with API call
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

    // Mock role data - would be fetched from API
    const mockRole: Role = {
      id: roleId,
      name: "Admin",
      description: "Administrative access with some limitations",
      userCount: 5,
      permissions: [1, 2, 3, 4, 5, 8],
      isDefault: false,
    };

    setPermissions(mockPermissions);
    setRole(mockRole);
    setFormData({
      name: mockRole.name,
      description: mockRole.description,
      permissions: mockRole.permissions,
      isDefault: mockRole.isDefault
    });
    setLoading(false);
  }, [roleId]);

  // Group permissions by category
  const permissionsByCategory: Record<string, Permission[]> = {};
  permissions.forEach((permission) => {
    if (!permissionsByCategory[permission.category]) {
      permissionsByCategory[permission.category] = [];
    }
    permissionsByCategory[permission.category].push(permission);
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handlePermissionToggle = (permissionId: number) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleSelectAll = (category: string) => {
    const categoryPermissions = permissionsByCategory[category].map(p => p.id);
    const allSelected = categoryPermissions.every(id => formData.permissions.includes(id));
    
    if (allSelected) {
      // Deselect all permissions in this category
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(id => !categoryPermissions.includes(id))
      }));
    } else {
      // Select all permissions in this category
      setFormData(prev => ({
        ...prev,
        permissions: [...new Set([...prev.permissions, ...categoryPermissions])]
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
      permissions: ""
    };

    if (!formData.name.trim()) {
      newErrors.name = "Role name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = "At least one permission must be selected";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make the actual API call to update the role
      console.log("Updating role:", formData);
      
      // Redirect back to roles list
      router.push("/dashboard/users/roles");
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this role? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make the actual API call to delete the role
      console.log("Deleting role:", roleId);
      
      // Redirect back to roles list
      router.push("/dashboard/users/roles");
    } catch (error) {
      console.error("Error deleting role:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C40001]"></div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Role not found</h2>
          <p className="text-gray-500 mt-2">The role you're looking for doesn't exist.</p>
          <Link href="/dashboard/users/roles">
            <Button className="mt-4">Back to Roles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-6 py-10 max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users/roles">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#C40001]">Edit Role: {role.name}</h1>
          <p className="text-gray-500 mt-1">Modify role permissions and settings</p>
        </div>
        <Button
          variant="outline"
          onClick={handleDelete}
          disabled={deleting || role.name === "Super Admin"}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          {deleting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600 mr-2"></div>
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Role
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card className="shadow-md border-none overflow-hidden">
          <div className="h-1.5 w-full bg-[#C40001]"></div>
          <CardHeader className="pb-3 pt-5 bg-white">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#C40001]" />
              Role Information
            </CardTitle>
            <CardDescription>
              Modify basic information about the role
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role-name" className="text-sm font-medium">
                  Role Name *
                </Label>
                <Input
                  id="role-name"
                  placeholder="Enter role name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  disabled={role.name === "Super Admin"}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
                {role.name === "Super Admin" && (
                  <p className="text-xs text-gray-500">Super Admin role name cannot be changed</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="is-default" className="text-sm font-medium">
                  Default Role
                </Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="is-default"
                    checked={formData.isDefault}
                    onCheckedChange={(checked) => handleInputChange("isDefault", !!checked)}
                  />
                  <Label htmlFor="is-default" className="text-sm font-normal cursor-pointer">
                    Set as default role for new users
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role-description" className="text-sm font-medium">
                Description *
              </Label>
              <Textarea
                id="role-description"
                placeholder="Enter role description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={errors.description ? "border-red-500" : ""}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card className="shadow-md border-none overflow-hidden">
          <div className="h-1.5 w-full bg-[#DAA625]"></div>
          <CardHeader className="pb-3 pt-5 bg-white">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-[#DAA625]" />
              Permissions
            </CardTitle>
            <CardDescription>
              Select the permissions for this role
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(permissionsByCategory).map(([category, perms]) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectAll(category)}
                    className="text-[#DAA625] border-[#DAA625]/20 hover:bg-[#DAA625]/5"
                  >
                    {perms.every(p => formData.permissions.includes(p.id)) ? (
                      <>
                        <XSquare className="h-4 w-4 mr-1" />
                        Deselect All
                      </>
                    ) : (
                      <>
                        <CheckSquare className="h-4 w-4 mr-1" />
                        Select All
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {perms.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={formData.permissions.includes(permission.id)}
                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={`permission-${permission.id}`}
                          className="text-sm font-medium cursor-pointer block"
                        >
                          {permission.name}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {permission.code}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {errors.permissions && (
              <p className="text-sm text-red-500">{errors.permissions}</p>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/users/roles">
            <Button variant="outline" type="button">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={saving}
            className="bg-[#C40001] hover:bg-[#a30300] text-white"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Role
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
