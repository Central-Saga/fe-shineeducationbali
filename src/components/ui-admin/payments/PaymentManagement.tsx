"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarDateRangePicker } from "./DateRangePicker";
import {
  transactionsData,
  TransactionData,
  TransactionType,
} from "@/data/data-admin/payment/transactions-data";
import { Eye, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentManagement = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] =
    useState<TransactionType>("STUDENT_PAYMENT");
  const router = useRouter();

  const columns: ColumnDef<TransactionData>[] = [
    {
      accessorKey: "reference_id",
      header: "Reference ID",
    },
    {
      accessorKey: "person_name",
      header: selectedType === "STUDENT_PAYMENT" ? "Nama Siswa" : "Nama Guru",
    },
    {
      accessorKey: "education_level",
      header: "Jenjang",
    },
    {
      accessorKey: "program_name",
      header: "Program/Course",
      cell: ({ row }) => row.original.program_name || "-",
    },
    {
      accessorKey: "total_amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("total_amount") as number;
        return `Rp ${amount.toLocaleString()}`;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
            ${
              status === "PAID"
                ? "bg-green-100 text-green-700"
                : status === "PENDING"
                ? "bg-[#DAA625]/10 text-[#DAA625]"
                : "bg-[#C40503]/10 text-[#C40503]"
            }`}
          >
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "due_date",
      header: "Jatuh Tempo",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div className="flex items-center gap-2">              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-gray-100 text-[#DAA625]"
                onClick={() =>
                  router.push(
                    `/dashboard/payments/detail/${transaction.reference_id}`
                  )
                }
              >
                <Eye className="h-4 w-4" />
              Detail
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-secondary"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    const filtered = transactionsData.filter(
      (transaction: TransactionData) =>
        transaction.transaction_type === selectedType
    );
    setTransactions(filtered);
    setLoading(false);
  }, [selectedType]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Payment Management</h2>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manajemen Pembayaran
              </h1>
              <p className="text-gray-500 mt-1">
                Kelola transaksi siswa dan gaji guru
              </p>
            </div>
            <Button
              onClick={() => router.push("/dashboard/payments/new")}
              className="bg-[#C40503] hover:bg-[#a50402] text-white"
            >
              Tambah Transaksi
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-none shadow-md bg-gradient-to-br from-[#C40503] to-[#ef4444] text-white">
              <div className="p-6">
                <div className="text-sm font-medium opacity-80">
                  Total Transaksi
                </div>
                <div className="text-2xl font-bold mt-2">
                  {transactions.length}
                </div>
                <div className="text-sm mt-2 opacity-80">
                  Periode bulan ini
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-md bg-gradient-to-br from-[#DAA625] to-[#fbbf24] text-white">
              <div className="p-6">
                <div className="text-sm font-medium opacity-80">
                  Total Pembayaran
                </div>
                <div className="text-2xl font-bold mt-2">
                  {`Rp ${transactions
                    .filter((t) => t.transaction_type === "STUDENT_PAYMENT")
                    .reduce((acc, t) => acc + t.total_amount, 0)
                    .toLocaleString()}`}
                </div>
                <div className="text-sm mt-2 opacity-80">
                  Pendapatan bulan ini
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-md bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="p-6">
                <div className="text-sm font-medium opacity-80">Lunas</div>
                <div className="text-2xl font-bold mt-2">
                  {transactions.filter((t) => t.status === "PAID").length}
                </div>
                <div className="text-sm mt-2 opacity-80">
                  Transaksi selesai
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-md bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <div className="p-6">
                <div className="text-sm font-medium opacity-80">Pending</div>
                <div className="text-2xl font-bold mt-2">
                  {transactions.filter((t) => t.status === "PENDING").length}
                </div>
                <div className="text-sm mt-2 opacity-80">
                  Menunggu pembayaran
                </div>
              </div>
            </Card>
          </div>

          <Card className="border border-gray-200 shadow-sm">
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">Transaksi</h3>
                  <p className="text-sm text-gray-500">
                    Daftar semua transaksi pembayaran dan penggajian
                  </p>
                </div>
                <CalendarDateRangePicker />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full max-w-sm">
                  <Input
                    placeholder="Cari nama atau ID..."
                    className="bg-white pl-10"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                </div>
                <Select
                  value={selectedType}
                  onValueChange={(value: TransactionType) => setSelectedType(value)}
                >
                  <SelectTrigger className="w-[200px] bg-white">
                    <SelectValue placeholder="Tipe Transaksi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STUDENT_PAYMENT">Pembayaran Siswa</SelectItem>
                    <SelectItem value="TEACHER_PAYMENT">Gaji Guru</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="PAID">Lunas</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CANCELED">Dibatalkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C40503]"></div>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={transactions.filter(
                    (transaction) => transaction.transaction_type === selectedType
                  )}
                />
              )}
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default PaymentManagement;
