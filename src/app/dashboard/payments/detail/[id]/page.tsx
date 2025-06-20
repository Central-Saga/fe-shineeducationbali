"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { transactionsData } from "@/data/data-admin/payment/transactions-data";
import { Separator } from "@/components/ui/separator";

export default function TransactionDetail() {
  const params = useParams();
  const router = useRouter();
  const referenceId = params.id as string;

  const transaction = transactionsData.find(
    (t) => t.reference_id === referenceId
  );

  if (!transaction) {
    return (
      <div className="container mx-auto py-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Transaksi tidak ditemukan
          </h2>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
            Detail Transaksi
          </h2>
          <p className="text-muted-foreground">{transaction.reference_id}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <Button>
            <Printer className="h-4 w-4 mr-2" />
            Cetak Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Informasi{" "}
            {transaction.transaction_type === "STUDENT_PAYMENT"
              ? "Siswa"
              : "Guru"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nama</p>
                <p className="font-medium">{transaction.person_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ID</p>
                <p className="font-medium">{transaction.person_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jenjang</p>
                <p className="font-medium">{transaction.education_level}</p>
              </div>
              {transaction.program_name && (
                <div>
                  <p className="text-sm text-muted-foreground">Program</p>
                  <p className="font-medium">{transaction.program_name}</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Detail Pembayaran</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1
                ${
                  transaction.status === "PAID"
                    ? "bg-emerald-50 text-emerald-700"
                    : transaction.status === "PENDING"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {transaction.status}
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Jumlah</p>
              <p className="font-medium">
                Rp {transaction.total_amount.toLocaleString()}
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Metode Pembayaran
                </p>
                <p className="font-medium">
                  {transaction.details?.payment_method || "-"}
                </p>
              </div>
              {transaction.details?.bank_name && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Bank</p>
                    <p className="font-medium">
                      {transaction.details.bank_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Nomor Rekening
                    </p>
                    <p className="font-medium">
                      {transaction.details.account_number}
                    </p>
                  </div>
                </>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Periode</p>
                <p className="font-medium">
                  {transaction.details?.month_period || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Tanggal Transaksi
                </p>
                <p className="font-medium">{transaction.transaction_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jatuh Tempo</p>
                <p className="font-medium">{transaction.due_date}</p>
              </div>
            </div>

            {transaction.details?.additional_info && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Informasi Tambahan
                  </p>
                  <p className="font-medium">
                    {transaction.details.additional_info}
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
