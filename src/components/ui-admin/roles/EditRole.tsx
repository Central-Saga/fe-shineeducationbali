"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/ui-admin/layout";
import { ArrowLeft, Save, Loader2, CheckSquare, Square } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama role harus minimal 2 karakter.",
  }),
  description: z.string().min(10, {
    message: "Deskripsi harus minimal 10 karakter.",
  }),
  permissions: z.array(z.string()).min(1, "Pilih minimal satu permission"),
});

type FormValues = z.infer<typeof formSchema>;

const availablePermissions = [
  { id: "user:manage", name: "User Management", description: "Create, update, and delete user accounts", category: "User Administration" },
  { id: "profile:view", name: "View Profile", description: "View user profiles", category: "User Administration" },
  { id: "settings:edit", name: "Edit Settings", description: "Edit system settings", category: "System Administration" },
  { id: "course:view", name: "View Courses", description: "View available courses", category: "Education" },
  { id: "course:manage", name: "Manage Courses", description: "Create, update, and delete courses", category: "Education" },
  { id: "grade:manage", name: "Grade Management", description: "Assign and manage student grades", category: "Education" },
  { id: "finance:manage", name: "Financial Management", description: "Manage financial transactions and reports", category: "Finance" },
  { id: "report:generate", name: "Report Generation", description: "Generate and download system reports", category: "Reporting" },
  { id: "attendance:manage", name: "Attendance Management", description: "Manage student attendance", category: "Education" },
  { id: "role:manage", name: "Role Management", description: "Create, update, and delete user roles", category: "User Administration" },
];

interface EditRoleProps {
  roleId: string;
}

export default function EditRole({ roleId }: EditRoleProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  // Load role data for edit
  useEffect(() => {
    const loadRole = async () => {
      try {
        setInitialLoading(true);
        // In real app, fetch role data by ID
        // For now, we'll use dummy data
        const dummyRole = {
          name: "Content Manager",
          description: "Manage content and course materials with limited administrative access",
          permissions: ["course:view", "course:manage", "grade:manage", "attendance:manage"],
        };
        
        form.reset(dummyRole);
      } catch (error) {
        console.error("Error loading role:", error);
        toast.error("Gagal memuat data role");
        router.push("/dashboard/users/roles");
      } finally {
        setInitialLoading(false);
      }
    };

    loadRole();
  }, [roleId, form, router]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      // In real app, submit to API
      console.log("Updating role:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Role berhasil diperbarui");
      router.push("/dashboard/users/roles");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Gagal memperbarui role");
    } finally {
      setLoading(false);
    }
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof availablePermissions>);

  const categoryKeys = Object.keys(groupedPermissions);

  // Select all permissions in a category
  const handleSelectAllInCategory = (category: string, checked: boolean) => {
    const categoryPermissions = groupedPermissions[category] || [];
    const categoryPermissionIds = categoryPermissions.map(p => p.id);
    const currentSelectedPermissions = form.getValues("permissions") || [];
    
    if (checked) {
      // Add all category permissions
      const newPermissions = [...new Set([...currentSelectedPermissions, ...categoryPermissionIds])];
      form.setValue("permissions", newPermissions);
    } else {
      // Remove all category permissions
      const newPermissions = currentSelectedPermissions.filter(id => !categoryPermissionIds.includes(id));
      form.setValue("permissions", newPermissions);
    }
  };

  // Check if all permissions in a category are selected
  const isAllInCategorySelected = (category: string) => {
    const categoryPermissions = groupedPermissions[category] || [];
    const categoryPermissionIds = categoryPermissions.map(p => p.id);
    const currentSelectedPermissions = form.getValues("permissions") || [];
    return categoryPermissionIds.every(id => currentSelectedPermissions.includes(id));
  };

  // Check if some permissions in a category are selected
  const isSomeInCategorySelected = (category: string) => {
    const categoryPermissions = groupedPermissions[category] || [];
    const categoryPermissionIds = categoryPermissions.map(p => p.id);
    const currentSelectedPermissions = form.getValues("permissions") || [];
    return categoryPermissionIds.some(id => currentSelectedPermissions.includes(id));
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Header
      header={{
        title: "Edit Role",
        description: "Update role information and permissions",
        showBackButton: true,
        backHref: "/dashboard/users/roles",
        actions: [
          {
            label: "Update Role",
            onClick: () => {
              const form = document.getElementById("role-form") as HTMLFormElement;
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            },
            icon: <Save className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <Form {...form}>
        <form id="role-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Content Manager"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the role's responsibilities and access level..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Permissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* All Categories */}
                <div className="space-y-6">
                  {categoryKeys.map((category) => {
                    const categoryPermissions = groupedPermissions[category] || [];
                    return (
                      <div key={category} className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-3">
                          <h4 className="text-lg font-medium text-gray-900">
                            {category}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={isAllInCategorySelected(category)}
                              ref={(el) => {
                                if (el && 'indeterminate' in el) {
                                  (el as any).indeterminate = isSomeInCategorySelected(category) && !isAllInCategorySelected(category);
                                }
                              }}
                              onCheckedChange={(checked) => handleSelectAllInCategory(category, checked as boolean)}
                            />
                            <span className="text-sm font-medium text-gray-700">
                              Select All in {category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Category Permissions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {categoryPermissions.map((permission) => (
                            <FormField
                              key={permission.id}
                              control={form.control}
                              name="permissions"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(permission.id)}
                                      onCheckedChange={(checked) => {
                                        const currentPermissions = field.value || [];
                                        if (checked) {
                                          field.onChange([...currentPermissions, permission.id]);
                                        } else {
                                          field.onChange(
                                            currentPermissions.filter((id) => id !== permission.id)
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-medium">
                                      {permission.name}
                                    </FormLabel>
                                    <p className="text-xs text-gray-500">
                                      {permission.description}
                                    </p>
                                  </div>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Form Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#C40503] hover:bg-[#A30402]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Role
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/dashboard/users/roles")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selected Permissions Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Selected Permissions</CardTitle>
                <div className="text-sm text-gray-500">
                  {form.watch("permissions")?.length || 0} of {availablePermissions.length} selected
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {form.watch("permissions")?.length > 0 ? (
                    form.watch("permissions").map((permissionId) => {
                      const permission = availablePermissions.find(p => p.id === permissionId);
                      return (
                        <div key={permissionId} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-[#C40503] rounded-full"></div>
                          <span className="text-gray-600">{permission?.name}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500">No permissions selected</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Categories Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Categories Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryKeys.map((category) => {
                    const categoryPermissions = groupedPermissions[category] || [];
                    const selectedInCategory = categoryPermissions.filter(p => form.watch("permissions")?.includes(p.id)).length;
                    return (
                      <div key={category} className="flex justify-between items-center text-sm">
                        <span className="text-gray-900">{category}</span>
                        <span className="text-gray-500">
                          {selectedInCategory}/{categoryPermissions.length}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </form>
      </Form>
    </Header>
  );
}