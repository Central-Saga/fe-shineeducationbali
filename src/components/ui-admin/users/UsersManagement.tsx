"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import {
  UserPlus,
  Users,
  User as UserIcon,
  Shield,
  GraduationCap,
  Mail,
  Clock,
  MoreHorizontal,
  Edit2,
  Trash2,
  EyeIcon,
  ShieldCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockDetailedUsers, User } from "@/data/data-admin/users-data";
import { Header, TableLayout } from "@/components/ui-admin/layout";

interface UsersManagementProps {
  title: string;
  description: string;
  userType: "all" | "admin" | "teacher" | "student";
  showRoleFilter?: boolean;
}

export default function UsersManagement({
  title,
  description,
  userType,
  showRoleFilter = true,
}: UsersManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Filter users based on userType
    let filteredUsers: User[] = [];
    switch (userType) {
      case "admin":
        filteredUsers = mockDetailedUsers.filter(user => 
          user.role === "Admin" || user.role === "Super Admin"
        );
        break;
      case "teacher":
        filteredUsers = mockDetailedUsers.filter(user => 
          user.role === "Teacher"
        );
        break;
      case "student":
        filteredUsers = mockDetailedUsers.filter(user => 
          user.role === "Student"
        );
        break;
      default:
        filteredUsers = mockDetailedUsers;
    }

    setUsers(filteredUsers);
    setLoading(false);
  }, [userType]);

  // Filter users based on search, role, and status
  const filteredUsers = users.filter(user => {
    let match = true;
    
    // Filter by search
    if (search) {
      match = match && (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter by role
    if (roleFilter !== "all") {
      match = match && user.role === roleFilter;
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      match = match && user.status === statusFilter;
    }
    
    return match;
  });

  // Get unique roles for filter
  const roles = [...new Set(users.map(user => user.role))];

  // Statistics based on user data
  const stats = {
    total: users.length,
    active: users.filter(user => user.status === "active").length,
    inactive: users.filter(user => user.status === "inactive").length,
    pending: users.filter(user => user.status === "pending").length,
    admins: users.filter(user => user.role === "Admin" || user.role === "Super Admin").length,
    teachers: users.filter(user => user.role === "Teacher").length,
    students: users.filter(user => user.role === "Student").length,
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Get today's date
  const today = new Date();
  const recentUsers = users.filter(user => {
    if (!user.createdAt) return false;
    
    const createdDate = new Date(user.createdAt);
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Users created in the last 30 days
  });

  // Handle action buttons
  const handleView = (user: User) => {
    console.log("View user details:", user);
  };

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
  };

  // Format date to readable format
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Determine status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900 transition-colors font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 hover:text-gray-900 transition-colors font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 hover:text-amber-900 transition-colors font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
      default:
        return <Badge className="hover:bg-gray-200 transition-colors">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    }
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "super admin":
        return <ShieldCheck className="h-4 w-4 text-[#C40503]" />;
      case "admin":
        return <Shield className="h-4 w-4 text-[#DAA625]" />;
      case "teacher":
        return <GraduationCap className="h-4 w-4 text-blue-600" />;
      case "student":
        return <UserIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <UserIcon className="h-4 w-4 text-gray-600" />;
    }
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
        return <Badge variant="outline" className="hover:bg-gray-100">{role}</Badge>;
    }
  };

  // Define columns for DataTable
  const columns: ColumnDef<User>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: () => <div>User</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-gray-200 transition-transform hover:scale-110">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#C40503] text-white">
                {user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                <Mail className="h-3 w-3 text-[#C40503]/80" />
                <span className="hover:text-[#C40503] transition-colors">{user.email}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    ...(userType === "all" ? [{
      accessorKey: "role",
      header: () => <div>Role</div>,
      cell: ({ row }: { row: any }) => {
        const role = row.getValue("role") as string;
        return (
          <div className="flex items-center gap-1.5">
            {getRoleIcon(role)}
            {getRoleBadge(role)}
          </div>
        );
      },
    }] : []),
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return getStatusBadge(status);
      },
    },
    {
      accessorKey: "lastActive",
      header: () => <div>Last Active</div>,
      cell: ({ row }) => {
        const lastActive = row.getValue("lastActive") as string;
        return (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock className="h-3.5 w-3.5 text-gray-500" />
            {lastActive ? new Date(lastActive).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }) : "Never"}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div>Created</div>,
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string;
        return formatDate(createdAt);
      },
    },
    {
      id: "actions",
      header: () => <div>Actions</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => handleView(user)}>
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(user)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(user)}
                  className="text-red-600 focus:text-red-600"
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
      title: "Total Users",
      value: stats.total,
      description: `Total ${userType !== "all" ? userType : "user"} accounts`,
      icon: <Users className="h-5 w-5 text-[#C40503]" />,
      color: "bg-[#C40503]",
      bgColor: "bg-red-50",
    },
    {
      title: "Active Users",
      value: stats.active,
      description: `${Math.round((stats.active / stats.total) * 100) || 0}% of users are active`,
      icon: <UserIcon className="h-5 w-5 text-[#DAA625]" />,
      color: "bg-[#DAA625]",
      bgColor: "bg-amber-50",
    },
    ...(userType === "all" ? [
      {
        title: "New Users (30d)",
        value: recentUsers.length,
        description: `${Math.round((recentUsers.length / stats.total) * 100) || 0}% growth in 30 days`,
        icon: <UserPlus className="h-5 w-5 text-blue-600" />,
        color: "bg-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Pending Approvals",
        value: stats.pending,
        description: "Users waiting for approval",
        icon: <Clock className="h-5 w-5 text-purple-600" />,
        color: "bg-purple-600",
        bgColor: "bg-purple-50",
      },
    ] : []),
    ...(userType === "admin" ? [
      {
        title: "Super Admins",
        value: users.filter(u => u.role === "Super Admin").length,
        description: "Super admin accounts",
        icon: <ShieldCheck className="h-5 w-5 text-[#C40503]" />,
        color: "bg-[#C40503]",
        bgColor: "bg-red-50",
      },
      {
        title: "Admins",
        value: users.filter(u => u.role === "Admin").length,
        description: "Admin accounts",
        icon: <Shield className="h-5 w-5 text-[#DAA625]" />,
        color: "bg-[#DAA625]",
        bgColor: "bg-amber-50",
      },
    ] : []),
    ...(userType === "teacher" ? [
      {
        title: "Senior Teachers",
        value: users.filter(u => u.position === "Senior Teacher").length,
        description: "Senior teacher accounts",
        icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
        color: "bg-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Junior Teachers",
        value: users.filter(u => u.position === "Junior Teacher").length,
        description: "Junior teacher accounts",
        icon: <GraduationCap className="h-5 w-5 text-green-600" />,
        color: "bg-green-600",
        bgColor: "bg-green-50",
      },
    ] : []),
    ...(userType === "student" ? [
      {
        title: "New Students (30d)",
        value: recentUsers.length,
        description: `${Math.round((recentUsers.length / stats.total) * 100) || 0}% growth in 30 days`,
        icon: <UserPlus className="h-5 w-5 text-purple-600" />,
        color: "bg-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        title: "Pending Registration",
        value: stats.pending,
        description: "Users waiting for registration",
        icon: <Clock className="h-5 w-5 text-amber-600" />,
        color: "bg-amber-600",
        bgColor: "bg-amber-50",
      },
    ] : []),
  ];

  return (
    <Header
      header={{
        title: title,
        description: description,
        actions: [
          {
            label: `Add New ${userType === "admin" ? "Admin" : userType === "teacher" ? "Teacher" : userType === "student" ? "Student" : "User"}`,
            onClick: () => console.log("Add new user"),
            icon: <UserPlus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <TableLayout
        title={title}
        description={description}
        data={currentUsers}
        columns={columns}
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search users by name, email or ID..."
        filters={[
          ...(showRoleFilter ? [{
            key: "role",
            label: "All Roles",
            value: roleFilter,
            onChange: setRoleFilter,
            options: [
              { value: "all", label: "All Roles" },
              ...roles.map(role => ({ value: role, label: role })),
            ],
          }] : []),
          {
            key: "status",
            label: "All Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "pending", label: "Pending" },
            ],
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredUsers.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        stats={statsData}
        loading={loading}
      />
    </Header>
  );
}
