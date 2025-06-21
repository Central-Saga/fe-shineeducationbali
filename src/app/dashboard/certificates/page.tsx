"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CircleSlash, Plus, Settings, TableProperties } from "lucide-react";
import { CertificateTypes } from "@/components/ui-admin/certificates/CertificateTypes";
import { CertificateRecords } from "@/components/ui-admin/certificates/certificate-records";
import { InvalidCertificates } from "@/components/ui-admin/certificates/invalid-certificates";
import { useRouter } from "next/navigation";
export default function CertificatesPage() {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Manajemen Sertifikat
        </h2>
        <div className="flex items-center space-x-2">
          {" "}
          <Button
            variant="outline"
            size="sm"
            className="bg-[#C40503] text-white hover:bg-[#DAA625]"
            onClick={() =>
              (window.location.href = "/dashboard/certificates/settings")
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            Pengaturan
          </Button>
        </div>
      </div>
      <Tabs defaultValue="templates" className="space-y-4">
        {" "}
        <TabsList className="border-b">
          <TabsTrigger
            value="templates"
            className="data-[state=active]:text-[#C40503]"
          >
            <Award className="mr-2 h-4 w-4" />
            Jenis Sertifikat
          </TabsTrigger>
          <TabsTrigger
            value="records"
            className="data-[state=active]:text-[#C40503]"
          >
            <TableProperties className="mr-2 h-4 w-4" />
            Catatan Penerbitan
          </TabsTrigger>
          <TabsTrigger
            value="invalid"
            className="data-[state=active]:text-[#C40503]"
          >
            <CircleSlash className="mr-2 h-4 w-4" />
            Sertifikat Tidak Valid
          </TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Jenis-Jenis Sertifikat</CardTitle>
                  <CardDescription>
                    Kelola berbagai jenis sertifikat yang dapat diterbitkan
                    untuk siswa
                  </CardDescription>
                </div>{" "}
                  <Button
                    onClick={() => router.push("/dashboard/certificates/input")}
                    className="bg-[#C40503] hover:bg-[#DAA625] text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Terbitkan Sertifikat
                  </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CertificateTypes />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catatan Penerbitan Sertifikat</CardTitle>
              <CardDescription>
                Riwayat penerbitan sertifikat untuk semua siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CertificateRecords />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invalid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sertifikat Tidak Valid</CardTitle>
              <CardDescription>
                Daftar sertifikat yang telah dicabut atau tidak berlaku
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvalidCertificates />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catatan Penerbitan Sertifikat</CardTitle>
              <CardDescription>
                Riwayat penerbitan sertifikat untuk semua siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CertificateRecords />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="invalid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sertifikat Tidak Valid</CardTitle>
              <CardDescription>
                Daftar sertifikat yang telah dicabut atau tidak berlaku
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add invalid certificates component here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
