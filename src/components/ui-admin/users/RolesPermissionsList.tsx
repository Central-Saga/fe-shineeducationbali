"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import {
  Plus,
  Shield,
  Users,
  Eye,
  Edit2,
  Trash2,
  Download,
  CheckSquare,
  XSquare,
  User,
  UserCog,
  ShieldCheck,
  Key,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Header, TableLayout } from "@/components/ui-admin/layout";

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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  // Statistics
  const totalRoles = roles.length;
  const totalPermissions = permissions.length;
  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);
  const defaultRole = roles.find((r) => r.isDefault)?.name || "None";

  // Pagination calculations
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoles = filteredRoles.slice(startIndex, endIndex);

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

  // Define columns for DataTable
  const columns: ColumnDef<Role>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: () => <div>Role Name</div>,
      cell: ({ row }) => {
        const role = row.original;
        return (
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
        );
      },
    },
    {
      accessorKey: "description",
      header: () => <div>Description</div>,
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return <div className="text-sm text-gray-600">{description}</div>;
      },
    },
    {
      accessorKey: "userCount",
      header: () => <div>Users</div>,
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 text-blue-700 font-medium rounded-full px-2 py-1 text-xs">
              {role.userCount} Users
            </div>
            {role.userCount > 100 && (
              <Badge className="bg-purple-50 text-purple-700">High Usage</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "isDefault",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const isDefault = row.getValue("isDefault") as boolean;
        return isDefault ? (
          <Badge className="bg-green-100 text-green-800">Default</Badge>
        ) : (
          <Badge className="bg-gray-100 text-gray-800">Standard</Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Actions</div>,
      cell: ({ row }) => {
        const role = row.original;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => handleRoleView(role)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleEdit(role)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleRoleDelete(role)}
                  disabled={role.name === "Super Admin"}
                  className="text-red-600 focus:text-red-600 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  // Prepare stats for TableLayout
  const statsData = [
    {
      title: "Total Roles",
      value: totalRoles,
      description: "System roles available",
      icon: <Shield className="h-5 w-5 text-[#C40503]" />,
      color: "bg-[#C40503]",
      bgColor: "bg-red-50",
    },
    {
      title: "Total Permissions",
      value: totalPermissions,
      description: "Available system permissions",
      icon: <Key className="h-5 w-5 text-[#DAA625]" />,
      color: "bg-[#DAA625]",
      bgColor: "bg-amber-50",
    },
    {
      title: "Total Users",
      value: totalUsers,
      description: "Total users across all roles",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Default Role",
      value: defaultRole,
      description: "Default role for new users",
      icon: <UserCog className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <Header
      header={{
        title: "Roles & Permissions Management",
        description: "Kelola peran dan izin pengguna dalam sistem",
        actions: [
          {
            label: "Create Role",
            href: "/dashboard/users/roles/add",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
          },
          {
            label: "Create Permission",
            href: "/dashboard/users/roles/permissions/add",
            icon: <Plus className="h-4 w-4" />,
            variant: "outline",
          },
          {
            label: "Export Data",
            onClick: () => console.log("Export data"),
            icon: <Download className="h-4 w-4" />,
            variant: "outline",
          },
        ],
      }}
    >
      <TableLayout
        title="Access Control"
        description="Manage roles and permissions across the system"
        data={currentRoles}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search roles by name, description..."
        filters={[]}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredRoles.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        stats={statsData}
        loading={loading}
      />
    </Header>
  );
}
