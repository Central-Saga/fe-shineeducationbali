"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit2, Plus, MoreHorizontal, PencilIcon, Trash2, DollarSign, Calendar, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header, TableLayout } from "@/components/ui-admin/layout";
import { apiRequest } from "@/lib/api";

interface TeacherSalary {
  id: string;
  teacherId: string;
  teacherName: string;
  position: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  period: string;
  status: "PENDING" | "PAID" | "CANCELLED";
  paymentDate?: string;
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export function TeacherSalaryManagement() {
  const [salaries, setSalaries] = useState<TeacherSalary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");

  // Mock data - replace with API call
  useEffect(() => {
    const mockSalaries: TeacherSalary[] = [
      {
        id: "SAL001",
        teacherId: "TCH001",
        teacherName: "John Smith",
        position: "Senior Teacher",
        baseSalary: 5000000,
        allowances: 1000000,
        deductions: 500000,
        netSalary: 5500000,
        period: "2024-01",
        status: "PAID",
        paymentDate: "2024-01-31",
        paymentMethod: "Bank Transfer",
        notes: "Regular salary payment",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-31",
      },
      {
        id: "SAL002",
        teacherId: "TCH002",
        teacherName: "Sarah Johnson",
        position: "Teacher",
        baseSalary: 4000000,
        allowances: 500000,
        deductions: 400000,
        netSalary: 4100000,
        period: "2024-01",
        status: "PENDING",
        notes: "Awaiting approval",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      {
        id: "SAL003",
        teacherId: "TCH003",
        teacherName: "Mike Wilson",
        position: "Assistant Teacher",
        baseSalary: 3000000,
        allowances: 300000,
        deductions: 300000,
        netSalary: 3000000,
        period: "2024-01",
        status: "PAID",
        paymentDate: "2024-01-31",
        paymentMethod: "Cash",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-31",
      },
    ];
    setSalaries(mockSalaries);
  }, []);

  const filteredSalaries = salaries.filter(
    (salary) =>
      (salary.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       salary.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       salary.period.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || salary.status === statusFilter) &&
      (periodFilter === "all" || salary.period === periodFilter)
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredSalaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSalaries = filteredSalaries.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, periodFilter]);

  // Define columns for DataTable
  const columns: ColumnDef<TeacherSalary>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "id",
      header: () => <div>ID Gaji</div>,
      cell: ({ row }) => {
        const salaryId = row.getValue("id") as string;
        return (
          <div>
            <Link href={`/dashboard/payments/teacher-salary/detail/${salaryId}`} className="font-medium text-[#C40503] hover:underline">
              {salaryId}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "teacherName",
      header: () => <div>Nama Guru</div>,
      cell: ({ row }) => {
        const teacherName = row.getValue("teacherName") as string;
        const position = row.original.position;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              {teacherName.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{teacherName}</div>
              <div className="text-xs text-gray-500">{position}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "period",
      header: () => <div>Periode</div>,
      cell: ({ row }) => {
        const period = row.getValue("period") as string;
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors">
            {period}
          </Badge>
        );
      },
    },
    {
      accessorKey: "netSalary",
      header: () => <div>Gaji Bersih</div>,
      cell: ({ row }) => {
        const netSalary = row.getValue("netSalary") as number;
        return (
          <div className="font-medium text-green-600">
            Rp {netSalary.toLocaleString()}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return status === "PAID" ? (
          <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">
            Dibayar
          </Badge>
        ) : status === "PENDING" ? (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors">
            Pending
          </Badge>
        ) : (
          <Badge className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors">
            Dibatalkan
          </Badge>
        );
      },
    },
    {
      accessorKey: "paymentDate",
      header: () => <div>Tanggal Bayar</div>,
      cell: ({ row }) => {
        const paymentDate = row.getValue("paymentDate") as string;
        return (
          <div className="text-sm">
            {paymentDate || "-"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Aksi</div>,
      cell: ({ row }) => {
        const salaryData = row.original;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                  onClick={() => window.open(`/dashboard/payments/teacher-salary/detail/${salaryData.id}`, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open(`/dashboard/payments/teacher-salary/edit/${salaryData.id}`, '_blank')}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin menghapus data gaji ini?')) {
                      // Handle delete logic here
                      alert('Fitur hapus data gaji akan segera tersedia');
                    }
                  }}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <Header
      header={{
        title: "Manajemen Gaji Guru",
        description: "Kelola gaji dan pembayaran untuk guru",
        actions: [
          {
            label: "Tambah Gaji",
            href: "/dashboard/payments/teacher-salary/add",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <TableLayout
        title="Daftar Gaji Guru"
        description="Kelola dan lihat daftar gaji guru"
        data={currentSalaries}
        columns={columns}
        searchQuery={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Cari nama guru, ID gaji, atau periode..."
        filters={[
          {
            key: "status",
            label: "Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "Semua Status" },
              { value: "PENDING", label: "Pending" },
              { value: "PAID", label: "Dibayar" },
              { value: "CANCELLED", label: "Dibatalkan" },
            ],
          },
          {
            key: "period",
            label: "Periode",
            value: periodFilter,
            onChange: setPeriodFilter,
            options: [
              { value: "all", label: "Semua Periode" },
              { value: "2024-01", label: "Januari 2024" },
              { value: "2024-02", label: "Februari 2024" },
              { value: "2024-03", label: "Maret 2024" },
            ],
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredSalaries.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        stats={[
          {
            title: "Total Gaji",
            value: filteredSalaries.length,
            description: "Data yang ditampilkan",
            icon: <DollarSign className="h-5 w-5 text-[#C40001]" />,
            color: "bg-[#C40001]",
            bgColor: "bg-red-50",
          },
          {
            title: "Sudah Dibayar",
            value: filteredSalaries.filter(s => s.status === "PAID").length,
            description: "Gaji yang sudah dibayar",
            icon: <User className="h-5 w-5 text-green-600" />,
            color: "bg-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Pending",
            value: filteredSalaries.filter(s => s.status === "PENDING").length,
            description: "Menunggu pembayaran",
            icon: <Calendar className="h-5 w-5 text-orange-600" />,
            color: "bg-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "Total Pengeluaran",
            value: `Rp ${filteredSalaries.reduce((sum, s) => sum + s.netSalary, 0).toLocaleString()}`,
            description: "Total gaji yang dibayar",
            icon: <DollarSign className="h-5 w-5 text-blue-600" />,
            color: "bg-blue-600",
            bgColor: "bg-blue-50",
          },
        ]}
        showStats={true}
        showSearch={true}
        showFilters={true}
        showPagination={true}
      />
    </Header>
  );
}
