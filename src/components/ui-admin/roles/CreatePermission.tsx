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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/ui-admin/layout";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama permission harus minimal 2 karakter.",
  }),
  code: z.string().min(2, {
    message: "Code permission harus minimal 2 karakter.",
  }),
  description: z.string().min(10, {
    message: "Deskripsi harus minimal 10 karakter.",
  }),
  category: z.string().min(1, {
    message: "Pilih kategori permission.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const permissionCategories = [
  "User Administration",
  "System Administration", 
  "Education",
  "Finance",
  "Reporting",
  "Content Management",
  "Settings",
  "Analytics",
];

export default function CreatePermission() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      // In real app, submit to API
      console.log("Creating permission:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Permission berhasil dibuat");
      router.push("/dashboard/users/roles");
    } catch (error) {
      console.error("Error creating permission:", error);
      toast.error("Gagal membuat permission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Header
      header={{
        title: "Create New Permission",
        description: "Create a new permission for role management",
        showBackButton: true,
        backHref: "/dashboard/users/roles",
        actions: [
          {
            label: "Create Permission",
            onClick: () => {
              const form = document.getElementById("permission-form") as HTMLFormElement;
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
        <form id="permission-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Permission Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permission Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Manage Users"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permission Code *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., user:manage"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {permissionCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                          placeholder="Describe what this permission allows users to do..."
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
                        Create Permission
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

            {/* Permission Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Permission Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-sm text-gray-900">
                      {form.watch("name") || "Permission name will appear here"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Code</label>
                    <p className="text-sm text-gray-900 font-mono">
                      {form.watch("code") || "permission:code"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <p className="text-sm text-gray-900">
                      {form.watch("category") || "Category will appear here"}
                    </p>
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