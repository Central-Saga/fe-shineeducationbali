"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CircleSlash, Settings, TableProperties } from "lucide-react";
import { CertificateTypes } from "@/components/ui-admin/certificates/CertificateTypes";
import { IssueCertificateModal } from "@/components/ui-admin/certificates/issue-certificate-modal";

export default function CertificatesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Manajemen Sertifikat
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Pengaturan
          </Button>
        </div>
      </div>
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">
            <Award className="mr-2 h-4 w-4" />
            Jenis Sertifikat
          </TabsTrigger>
          <TabsTrigger value="records">
            <TableProperties className="mr-2 h-4 w-4" />
            Catatan Penerbitan
          </TabsTrigger>
          <TabsTrigger value="invalid">
            <CircleSlash className="mr-2 h-4 w-4" />
            Sertifikat Tidak Valid
          </TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Jenis-Jenis Sertifikat</CardTitle>
                  <CardDescription>
                    Kelola berbagai jenis sertifikat yang dapat diterbitkan untuk
                    siswa
                  </CardDescription>
                </div>                <IssueCertificateModal
                  onSubmit={async (data) => {
                    console.log("Creating certificate:", data);
                  }}
                />
              </div>
            </CardHeader>
            <CardContent className="pl-2">              <CertificateTypes />
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
              {/* Add certificate records component here */}
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
