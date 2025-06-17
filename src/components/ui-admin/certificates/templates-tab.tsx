"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Edit, Image, Trash, LayoutTemplate, Upload } from "lucide-react";
import { certificateTemplates } from "@/data/data-admin/certificates-data/certificate-templates";
import { CertificateTemplate } from "@/types/template";

export function TemplatesTab() {
  const [templates, setTemplates] =
    useState<CertificateTemplate[]>(certificateTemplates);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Template Sertifikat</h2>
        <Button className="bg-black hover:bg-gray-800">
          <Upload className="mr-2 h-4 w-4" />
          Upload Template Baru
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-lg font-bold">
                {template.name}
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                {template.description}
              </p>
              <div className="aspect-[4/3] relative mb-4 border rounded-lg overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  <span>Diupload oleh: {template.createdBy.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Tanggal upload: {new Date(template.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  <span>Terakhir diubah: {new Date(template.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Badge
                    variant={
                      template.status === "active"
                        ? "success"
                        : template.status === "draft"
                        ? "secondary"
                        : "outline"
                    }
                    className="capitalize"
                  >
                    {template.status === "active" ? "Aktif" : 
                     template.status === "draft" ? "Draft" : "Diarsipkan"}
                  </Badge>
                  <span>Digunakan: {template.usageCount}x</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
