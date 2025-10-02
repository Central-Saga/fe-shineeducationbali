"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/ui-admin/layout";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { userService, User as ApiUser, UpdateUserRequest } from "@/lib/services/user.service";
import { roleService, Role } from "@/lib/services/role.service";

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Aktif",
    phone: "",
    department: "",
    position: "",
  });
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        console.log('Fetching user and roles data...');
        
        // Fetch user data and roles in parallel
        const [userResponse, rolesResponse] = await Promise.all([
          userService.getUserById(parseInt(userId)),
          roleService.getRoles()
        ]);

        console.log('User response:', userResponse);
        console.log('Roles response:', rolesResponse);

        if (userResponse.success && userResponse.data) {
          let user: ApiUser;
          
          if (Array.isArray(userResponse.data)) {
            user = userResponse.data[0];
          } else if (userResponse.data && 'id' in userResponse.data) {
            user = userResponse.data;
          } else {
            throw new Error('Invalid user data format');
          }
          
          console.log('EditUser - Parsed user data:', user);
          
          setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            phone: user.phone || "",
            department: user.department || "",
            position: user.position || "",
          });
        } else {
          console.error('EditUser - Failed to fetch user:', userResponse);
          setError(userResponse.message || 'Gagal mengambil data user');
        }

        if (rolesResponse.success && rolesResponse.data) {
          let rolesData: Role[] = [];
          
          if (Array.isArray(rolesResponse.data)) {
            rolesData = rolesResponse.data;
          } else if (rolesResponse.data && 'roles' in rolesResponse.data) {
            rolesData = rolesResponse.data.roles;
          } else if (rolesResponse.data && 'id' in rolesResponse.data) {
            rolesData = [rolesResponse.data];
          }
          
          console.log('EditUser - Parsed roles data:', rolesData);
          setRoles(rolesData);
        } else {
          console.error('EditUser - Failed to fetch roles:', rolesResponse);
          // Fallback roles jika API gagal
          const fallbackRoles: Role[] = [
            { id: 1, name: 'Super Admin', description: 'Super Administrator', user_count: 0, permissions: [], is_default: false, created_at: '', updated_at: '' },
            { id: 2, name: 'Admin', description: 'Administrator', user_count: 0, permissions: [], is_default: false, created_at: '', updated_at: '' },
            { id: 3, name: 'Teacher', description: 'Teacher', user_count: 0, permissions: [], is_default: false, created_at: '', updated_at: '' },
            { id: 4, name: 'Student', description: 'Student', user_count: 0, permissions: [], is_default: false, created_at: '', updated_at: '' }
          ];
          setRoles(fallbackRoles);
          setError(prev => prev + (prev ? ' ' : '') + 'Gagal mengambil data roles dari server. Menggunakan data default.');
        }
      } catch (error: unknown) {
        console.error('Error fetching data:', error);
        // Fallback roles jika terjadi error
        const fallbackRoles: Role[] = [
          { id: 1, name: 'Super Admin', description: 'Super Administrator', user_count: 0, permissions: [], is_default: false, created_at: '', updated_at: '' },
          { id: 2, name: 'Admin', description: 'Administrator', user_count: 0, permissions: [], is_default: false, created_at: '', updated_at: '' },
          { id: 3, name: 'Teacher', description: 'Teacher', user_count: 0, permissions: [], is_default: false, created_at: '', updated_at: '' },
          { id: 4, name: 'Student', description: 'Student', user_count: 0, permissions: [], is_default: false, created_at: '', updated_at: '' }
        ];
        setRoles(fallbackRoles);
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data. Menggunakan data default untuk roles.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const updateData: UpdateUserRequest = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        phone: formData.phone || undefined,
        department: formData.department || undefined,
        position: formData.position || undefined,
      };

      const response = await userService.updateUser(parseInt(userId), updateData);
      
      if (response.success) {
        console.log("User updated successfully:", response);
        router.push("/dashboard/users");
      } else {
        setError(response.message || "Gagal mengupdate user");
      }
    } catch (error: unknown) {
      console.error('Update user error:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate user');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Header
      header={{
        title: "Edit User",
        description: `Edit user account: ${userId}`,
        actions: [
          {
            label: "Back to Users",
            onClick: () => router.push("/dashboard/users"),
            icon: <ArrowLeft className="h-4 w-4" />,
            variant: "outline",
          },
        ],
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Update the details for this user account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-[#C40503]" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    required
                    disabled={saving}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                    disabled={saving}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => handleInputChange("role", value)}
                    disabled={saving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleInputChange("status", value)}
                    disabled={saving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    disabled={saving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Enter department"
                    disabled={saving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="Enter position"
                    disabled={saving}
                  />
                </div>
              </div>
            
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/users")}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {saving ? "Updating..." : "Update User"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </Header>
  );
}

