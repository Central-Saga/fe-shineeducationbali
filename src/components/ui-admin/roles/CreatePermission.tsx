"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Key,
  Save,
  X,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function CreatePermission() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    category: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    code: "",
    description: "",
    category: ""
  });

  const handleInputChange = (field: string, value: string) => {
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

  const validateForm = () => {
    const newErrors = {
      name: "",
      code: "",
      description: "",
      category: ""
    };

    if (!formData.name.trim()) {
      newErrors.name = "Permission name is required";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Permission code is required";
    } else if (!/^[a-z]+:[a-z]+$/.test(formData.code)) {
      newErrors.code = "Permission code must be in format 'action:resource' (e.g., user:create)";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
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
      
      // Here you would make the actual API call to create the permission
      console.log("Creating permission:", formData);
      
      // Redirect back to roles list
      router.push("/dashboard/users/roles");
    } catch (error) {
      console.error("Error creating permission:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 px-6 py-10 max-w-2xl mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users/roles">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#C40001]">Create New Permission</h1>
          <p className="text-gray-500 mt-1">Define a new system permission</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Permission Information */}
        <Card className="shadow-md border-none overflow-hidden">
          <div className="h-1.5 w-full bg-[#DAA625]"></div>
          <CardHeader className="pb-3 pt-5 bg-white">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Key className="h-5 w-5 text-[#DAA625]" />
              Permission Information
            </CardTitle>
            <CardDescription>
              Provide details about the new permission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="permission-name" className="text-sm font-medium">
                  Permission Name *
                </Label>
                <Input
                  id="permission-name"
                  placeholder="e.g., User Management"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="permission-code" className="text-sm font-medium">
                  Permission Code *
                </Label>
                <Input
                  id="permission-code"
                  placeholder="e.g., user:manage"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  className={errors.code ? "border-red-500" : ""}
                />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code}</p>
                )}
                <p className="text-xs text-gray-500">Format: action:resource (e.g., user:create, course:view)</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="permission-category" className="text-sm font-medium">
                Category *
              </Label>
              <Input
                id="permission-category"
                placeholder="e.g., User Administration"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={errors.category ? "border-red-500" : ""}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
              <p className="text-xs text-gray-500">Group permissions by category for better organization</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="permission-description" className="text-sm font-medium">
                Description *
              </Label>
              <Textarea
                id="permission-description"
                placeholder="Describe what this permission allows users to do"
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
            className="bg-[#DAA625] hover:bg-[#b8941f] text-white"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Permission
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
