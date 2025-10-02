"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  ShieldCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockDetailedUsers } from "@/data/data-admin/users-data";
import { Header, TableLayout, StatsGrid } from "@/components/ui-admin/layout";
import { userService, User as ApiUser } from "@/lib/services/user.service";
import { isAuthenticated } from "@/lib/auth";

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
  const router = useRouter();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      console.warn('User not authenticated, redirecting to login');
      router.push('/auth/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        let response;
        
        if (userType === "all") {
          response = await userService.getUsers({
            search: search,
            role: roleFilter !== "all" ? roleFilter : undefined,
            status: statusFilter !== "all" ? statusFilter : undefined,
            page: currentPage,
            per_page: itemsPerPage,
          });
        } else {
          // Map userType to proper role name
          const roleMapping: Record<string, string> = {
            'admin': 'Admin',
            'teacher': 'Teacher', 
            'student': 'Student'
          };
          
          const roleName = roleMapping[userType] || userType;
          console.log(`Fetching users for role: ${roleName}`);
          
          response = await userService.getUsersByRole(roleName, {
            search: search,
            status: statusFilter !== "all" ? statusFilter : undefined,
            page: currentPage,
            per_page: itemsPerPage,
          });
        }

        if (response.success && response.data) {
          let usersData: ApiUser[] = [];
          
          if (Array.isArray(response.data)) {
            usersData = response.data;
          } else if (response.data && 'users' in response.data) {
            usersData = response.data.users;
          } else if (response.data && 'id' in response.data) {
            usersData = [response.data];
          }
          
          console.log('UsersManagement - Parsed users data:', usersData);
          console.log('UsersManagement - UserType:', userType);
          console.log('UsersManagement - Users with Student role:', usersData.filter(u => u.role === 'Student'));
          
          // Additional filtering on frontend to ensure only correct role is shown
          if (userType !== "all") {
            const roleMapping: Record<string, string> = {
              'admin': 'Admin',
              'teacher': 'Teacher', 
              'student': 'Student'
            };
            
            const expectedRole = roleMapping[userType];
            const filteredByRole = usersData.filter(user => user.role === expectedRole);
            console.log(`UsersManagement - Filtered by role ${expectedRole}:`, filteredByRole);
            setUsers(filteredByRole);
          } else {
            setUsers(usersData);
          }
        } else {
          console.error('UsersManagement - Failed to fetch users:', response);
        }
      } catch (error: unknown) {
        console.error('Error fetching users:', error);
        // Fallback to empty array on error
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userType, search, roleFilter, statusFilter, currentPage, itemsPerPage]);

  // Filter users based on search, role, and status
  const filteredUsers = users.filter(user => {
    let match = true;
    
    // For specific userType (student, teacher, admin), ensure role matches exactly
    if (userType !== "all") {
      const roleMapping: Record<string, string> = {
        'admin': 'Admin',
        'teacher': 'Teacher', 
        'student': 'Student'
      };
      
      const expectedRole = roleMapping[userType];
      // Double-check role matching
      match = match && user.role === expectedRole;
      
      // Apply search and status filters
      if (search) {
        match = match && (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.id.toString().includes(search.toLowerCase())
        );
      }
      
      if (statusFilter !== "all") {
        match = match && user.status === statusFilter;
      }
    } else {
      // For "all" userType, apply all filters
      if (search) {
        match = match && (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.id.toString().includes(search.toLowerCase())
        );
      }
      
      if (roleFilter !== "all") {
        match = match && user.role === roleFilter;
      }
      
      if (statusFilter !== "all") {
        match = match && user.status === statusFilter;
      }
    }
    
    return match;
  });

  // Debug logging for filtered users
  console.log('UsersManagement - Filtered users:', filteredUsers);
  console.log('UsersManagement - Total users:', users.length);
  console.log('UsersManagement - Filtered count:', filteredUsers.length);
  console.log('UsersManagement - UserType:', userType);
  console.log('UsersManagement - Users by role:', {
    Student: users.filter(u => u.role === 'Student').length,
    Teacher: users.filter(u => u.role === 'Teacher').length,
    Admin: users.filter(u => u.role === 'Admin').length,
    'Super Admin': users.filter(u => u.role === 'Super Admin').length
  });

  // Get unique roles for filter
  const roles = [...new Set(users.map(user => user.role))];

  // Statistics based on user data
  const stats = {
    total: users.length,
    active: users.filter(user => user.status === "Aktif").length,
    inactive: users.filter(user => user.status === "Tidak Aktif").length,
    pending: users.filter(user => user.status === "Pending").length,
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
    if (!user.created_at) return false;
    
    const createdDate = new Date(user.created_at);
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Users created in the last 30 days
  });

  // Handle action buttons
  const handleAdd = () => {
    if (userType === "teacher") {
      router.push("/dashboard/users/teachers/add");
    } else if (userType === "student") {
      router.push("/dashboard/users/students/add");
    } else if (userType === "admin") {
      router.push("/dashboard/users/add");
    } else {
      router.push("/dashboard/users/add");
    }
  };

  const handleEdit = (user: ApiUser) => {
    if (userType === "teacher") {
      router.push(`/dashboard/users/teachers/edit/${user.id}`);
    } else if (userType === "student") {
      router.push(`/dashboard/users/students/edit/${user.id}`);
    } else if (userType === "admin") {
      router.push(`/dashboard/users/edit/${user.id}`);
    } else {
      router.push(`/dashboard/users/edit/${user.id}`);
    }
  };

  const handleDelete = async (user: ApiUser) => {
    if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      try {
        const response = await userService.deleteUser(user.id);
        if (response.success) {
          // Remove user from local state
          setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
          console.log("User deleted successfully");
        } else {
          console.error("Failed to delete user:", response.message);
        }
      } catch (error: unknown) {
        console.error("Error deleting user:", error);
      }
    }
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
      case "Aktif":
        return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900 transition-colors font-medium">Aktif</Badge>;
      case "Tidak Aktif":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 hover:text-gray-900 transition-colors font-medium">Tidak Aktif</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 hover:text-amber-900 transition-colors font-medium">Pending</Badge>;
      default:
        return <Badge className="hover:bg-gray-200 transition-colors">{status}</Badge>;
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
  const columns: ColumnDef<ApiUser>[] = [
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
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
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
      accessorKey: "last_active",
      header: () => <div>Last Active</div>,
      cell: ({ row }) => {
        const lastActive = row.getValue("last_active") as string;
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
      accessorKey: "created_at",
      header: () => <div>Created</div>,
      cell: ({ row }) => {
        const createdAt = row.getValue("created_at") as string;
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
              <DropdownMenuContent align="end" className="w-[120px]">
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
            onClick: handleAdd,
            icon: <UserPlus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
        {/* Statistics Cards */}
        <StatsGrid 
          stats={statsData} 
          columns={4}
          className="mb-6"
        />

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
              { value: "Aktif", label: "Aktif" },
              { value: "Tidak Aktif", label: "Tidak Aktif" },
              { value: "Pending", label: "Pending" },
            ],
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredUsers.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        stats={[]}
        loading={loading}
        showStats={false}
      />
    </Header>
  );
}
