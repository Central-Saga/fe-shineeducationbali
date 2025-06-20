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
                ? "bg-emerald-50 text-emerald-700"
                : status === "PENDING"
                ? "bg-amber-50 text-amber-700"
                : "bg-rose-50 text-rose-700"
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-secondary"
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
          <div className="flex items-center justify-between">
            <div className="inline-flex rounded-lg border p-1">
              <Button
                variant={
                  selectedType === "STUDENT_PAYMENT" ? "default" : "ghost"
                }
                className="flex-1"
                onClick={() => setSelectedType("STUDENT_PAYMENT")}
              >
                Pembayaran Siswa
              </Button>
              <Button
                variant={
                  selectedType === "TEACHER_SALARY" ? "default" : "ghost"
                }
                className="flex-1"
                onClick={() => setSelectedType("TEACHER_SALARY")}
              >
                Gaji Guru
              </Button>
            </div>

            <Button className="bg-primary text-white hover:bg-primary/90">
              Input {selectedType === "STUDENT_PAYMENT" ? "Pembayaran" : "Gaji"}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="PAID">Lunas</SelectItem>
                <SelectItem value="UNPAID">Belum Lunas</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter Jenjang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenjang</SelectItem>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA">SMA</SelectItem>
              </SelectContent>
            </Select>

            <CalendarDateRangePicker />

            <div>
              <Input
                placeholder={`Cari ${
                  selectedType === "STUDENT_PAYMENT" ? "siswa" : "guru"
                }...`}
                type="search"
                className="w-full"
              />
            </div>
          </div>{" "}
          <DataTable columns={columns} data={transactions} />
        </div>
      </Card>
    </div>
  );
};

export default PaymentManagement;
