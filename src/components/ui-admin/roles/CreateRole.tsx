"use client";

import { useState } from "react";
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
import { ArrowLeft, Save, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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
  { id: "program:view", name: "View Programs", description: "View available programs", category: "Education" },
  { id: "program:manage", name: "Manage Programs", description: "Create, update, and delete programs", category: "Education" },
  { id: "grade:manage", name: "Grade Management", description: "Assign and manage student grades", category: "Education" },
  { id: "finance:manage", name: "Financial Management", description: "Manage financial transactions and reports", category: "Finance" },
  { id: "report:generate", name: "Report Generation", description: "Generate and download system reports", category: "Reporting" },
  { id: "attendance:manage", name: "Attendance Management", description: "Manage student attendance", category: "Education" },
  { id: "role:manage", name: "Role Management", description: "Create, update, and delete user roles", category: "User Administration" },
];

export default function CreateRole() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      // In real app, submit to API
      console.log("Creating role:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Role berhasil dibuat");
      router.push("/dashboard/users/roles");
    } catch (error) {
      console.error("Error creating role:", error);
      toast.error("Gagal membuat role");
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

  // Get current page permissions
  const categoryKeys = Object.keys(groupedPermissions);
  const currentCategory = categoryKeys[currentPage];
  const currentPermissions = groupedPermissions[currentCategory] || [];
  const totalPages = categoryKeys.length;

  // Select all permissions in current category
  const handleSelectAllInCategory = (checked: boolean) => {
    const currentPermissionIds = currentPermissions.map(p => p.id);
    const currentSelectedPermissions = form.getValues("permissions") || [];
    
    if (checked) {
      // Add all current category permissions
      const newPermissions = [...new Set([...currentSelectedPermissions, ...currentPermissionIds])];
      form.setValue("permissions", newPermissions);
    } else {
      // Remove all current category permissions
      const newPermissions = currentSelectedPermissions.filter(id => !currentPermissionIds.includes(id));
      form.setValue("permissions", newPermissions);
    }
  };

  // Check if all permissions in current category are selected
  const isAllInCategorySelected = () => {
    const currentPermissionIds = currentPermissions.map(p => p.id);
    const currentSelectedPermissions = form.getValues("permissions") || [];
    return currentPermissionIds.every(id => currentSelectedPermissions.includes(id));
  };

  // Check if some permissions in current category are selected
  const isSomeInCategorySelected = () => {
    const currentPermissionIds = currentPermissions.map(p => p.id);
    const currentSelectedPermissions = form.getValues("permissions") || [];
    return currentPermissionIds.some(id => currentSelectedPermissions.includes(id));
  };

  return (
    <Header
      header={{
        title: "Create New Role",
        description: "Create a new role with specific permissions",
        showBackButton: true,
        backHref: "/dashboard/users/roles",
        actions: [
          {
            label: "Create Role",
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
                <div className="flex items-center justify-between">
                  <CardTitle>Permissions</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Page {currentPage + 1} of {totalPages}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Category Header with Select All */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h4 className="text-lg font-medium text-gray-900">
                      {currentCategory}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={isAllInCategorySelected()}
                        ref={(el) => {
                          if (el && 'indeterminate' in el) {
                            (el as HTMLInputElement).indeterminate = isSomeInCategorySelected() && !isAllInCategorySelected();
                          }
                        }}
                        onCheckedChange={handleSelectAllInCategory}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Select All in {currentCategory}
                      </span>
                    </div>
                  </div>
                  
                  {/* Current Category Permissions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPermissions.map((permission) => (
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

                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {categoryKeys.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentPage(index)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                          index === currentPage
                            ? "bg-[#C40503] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Role
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

            {/* Current Category Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Current Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-900">{currentCategory}</div>
                  <div className="text-xs text-gray-500">
                    {currentPermissions.length} permissions available
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentPermissions.filter(p => form.watch("permissions")?.includes(p.id)).length} selected
                  </div>
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