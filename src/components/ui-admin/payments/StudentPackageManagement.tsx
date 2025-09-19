"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, MoreHorizontal, PencilIcon, Trash2, Package, CreditCard, Users, Calendar } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header, TableLayout } from "@/components/ui-admin/layout";
// import { apiRequest } from "@/lib/api";

interface StudentPackage {
  id: string;
  studentId: string;
  studentName: string;
  packageName: string;
  packageType: "BASIC" | "PREMIUM" | "VIP";
  programName: string;
  duration: number; // in months
  price: number;
  discount: number;
  finalPrice: number;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED" | "PENDING";
  startDate: string;
  endDate: string;
  paymentStatus: "PAID" | "PENDING" | "FAILED";
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

export function StudentPackageManagement() {
  const [packages, setPackages] = useState<StudentPackage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data - replace with API call
  useEffect(() => {
    const mockPackages: StudentPackage[] = [
      {
        id: "PKG001",
        studentId: "STD001",
        studentName: "Ayu Putri",
        packageName: "English Basic Package",
        packageType: "BASIC",
        programName: "Bahasa Inggris",
        duration: 3,
        price: 1500000,
        discount: 150000,
        finalPrice: 1350000,
        status: "ACTIVE",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        paymentStatus: "PAID",
        paymentMethod: "Bank Transfer",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      {
        id: "PKG002",
        studentId: "STD002",
        studentName: "Made Wirawan",
        packageName: "Computer Premium Package",
        packageType: "PREMIUM",
        programName: "Komputer",
        duration: 6,
        price: 3000000,
        discount: 300000,
        finalPrice: 2700000,
        status: "ACTIVE",
        startDate: "2024-01-15",
        endDate: "2024-07-15",
        paymentStatus: "PAID",
        paymentMethod: "Credit Card",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15",
      },
      {
        id: "PKG003",
        studentId: "STD003",
        studentName: "Putu Devi",
        packageName: "English VIP Package",
        packageType: "VIP",
        programName: "Bahasa Inggris",
        duration: 12,
        price: 6000000,
        discount: 600000,
        finalPrice: 5400000,
        status: "PENDING",
        startDate: "2024-02-01",
        endDate: "2025-01-31",
        paymentStatus: "PENDING",
        createdAt: "2024-02-01",
        updatedAt: "2024-02-01",
      },
    ];
    setPackages(mockPackages);
  }, []);

  const filteredPackages = packages.filter(
    (pkg) =>
      (pkg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || pkg.status === statusFilter) &&
      (typeFilter === "all" || pkg.packageType === typeFilter)
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = filteredPackages.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  // Define columns for DataTable
  const columns: ColumnDef<StudentPackage>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "id",
      header: () => <div>ID Paket</div>,
      cell: ({ row }) => {
        const packageId = row.getValue("id") as string;
        return (
          <div>
            <Link href={`/dashboard/payments/student-packages/detail/${packageId}`} className="font-medium text-[#C40503] hover:underline">
              {packageId}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "studentName",
      header: () => <div>Nama Siswa</div>,
      cell: ({ row }) => {
        const studentName = row.getValue("studentName") as string;
        const programName = row.original.programName;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              {studentName.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{studentName}</div>
              <div className="text-xs text-gray-500">{programName}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "packageName",
      header: () => <div>Nama Paket</div>,
      cell: ({ row }) => {
        const packageName = row.getValue("packageName") as string;
        const packageType = row.original.packageType;
        return (
          <div>
            <div className="font-medium">{packageName}</div>
            <Badge 
              className={
                packageType === "VIP" 
                  ? "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors"
                  : packageType === "PREMIUM"
                  ? "bg-[#DAA625]/10 text-[#DAA625] border border-[#DAA625]/20 hover:bg-[#DAA625]/20 transition-colors"
                  : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              }
            >
              {packageType}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "duration",
      header: () => <div>Durasi</div>,
      cell: ({ row }) => {
        const duration = row.getValue("duration") as number;
        return (
          <div className="text-sm">
            {duration} bulan
          </div>
        );
      },
    },
    {
      accessorKey: "finalPrice",
      header: () => <div>Harga</div>,
      cell: ({ row }) => {
        const finalPrice = row.getValue("finalPrice") as number;
        const originalPrice = row.original.price;
        const discount = row.original.discount;
        return (
          <div>
            <div className="font-medium text-green-600">
              Rp {finalPrice.toLocaleString()}
            </div>
            {discount > 0 && (
              <div className="text-xs text-gray-500">
                <span className="line-through">Rp {originalPrice.toLocaleString()}</span>
                <span className="text-red-500 ml-1">-{discount.toLocaleString()}</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return status === "ACTIVE" ? (
          <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">
            Aktif
          </Badge>
        ) : status === "EXPIRED" ? (
          <Badge className="bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors">
            Expired
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
      accessorKey: "paymentStatus",
      header: () => <div>Pembayaran</div>,
      cell: ({ row }) => {
        const paymentStatus = row.getValue("paymentStatus") as string;
        return paymentStatus === "PAID" ? (
          <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">
            Lunas
          </Badge>
        ) : paymentStatus === "PENDING" ? (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors">
            Pending
          </Badge>
        ) : (
          <Badge className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors">
            Gagal
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Aksi</div>,
      cell: ({ row }) => {
        const packageData = row.original;
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
                  onClick={() => window.open(`/dashboard/payments/student-packages/detail/${packageData.id}`, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open(`/dashboard/payments/student-packages/edit/${packageData.id}`, '_blank')}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
                      // Handle delete logic here
                      alert('Fitur hapus paket akan segera tersedia');
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


  return (
    <Header
      header={{
        title: "Manajemen Paket Program",
        description: "Kelola paket program yang dibeli oleh siswa",
        actions: [
          {
            label: "Tambah Paket",
            href: "/dashboard/payments/student-packages/add",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <TableLayout
        title="Daftar Paket Program Siswa"
        description="Kelola dan lihat daftar paket program yang dibeli siswa"
        data={currentPackages}
        columns={columns}
        searchQuery={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Cari nama siswa, ID paket, atau nama paket..."
        filters={[
          {
            key: "status",
            label: "Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "Semua Status" },
              { value: "ACTIVE", label: "Aktif" },
              { value: "EXPIRED", label: "Expired" },
              { value: "PENDING", label: "Pending" },
              { value: "CANCELLED", label: "Dibatalkan" },
            ],
          },
          {
            key: "type",
            label: "Tipe Paket",
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { value: "all", label: "Semua Tipe" },
              { value: "BASIC", label: "Basic" },
              { value: "PREMIUM", label: "Premium" },
              { value: "VIP", label: "VIP" },
            ],
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredPackages.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        stats={[
          {
            title: "Total Paket",
            value: filteredPackages.length,
            description: "Data yang ditampilkan",
            icon: <Package className="h-5 w-5 text-[#C40001]" />,
            color: "bg-[#C40001]",
            bgColor: "bg-red-50",
          },
          {
            title: "Paket Aktif",
            value: filteredPackages.filter(p => p.status === "ACTIVE").length,
            description: "Paket yang sedang aktif",
            icon: <Users className="h-5 w-5 text-green-600" />,
            color: "bg-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Pending Payment",
            value: filteredPackages.filter(p => p.paymentStatus === "PENDING").length,
            description: "Menunggu pembayaran",
            icon: <CreditCard className="h-5 w-5 text-orange-600" />,
            color: "bg-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "Total Revenue",
            value: `Rp ${filteredPackages.filter(p => p.paymentStatus === "PAID").reduce((sum, p) => sum + p.finalPrice, 0).toLocaleString()}`,
            description: "Total pendapatan",
            icon: <Calendar className="h-5 w-5 text-blue-600" />,
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
