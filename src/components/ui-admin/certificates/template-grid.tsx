"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { certificateTemplates } from "@/data/data-admin/certificates-data/certificate-templates";
import type { CertificateTemplate } from "@/types/template";
import { TemplateActions } from "./template-actions";

export function TemplateGrid() {
  const [templates] = useState(certificateTemplates);

  const handlePreview = (_template: CertificateTemplate) => {
    // TODO: Implement preview functionality
  };

  const handleDuplicate = (_template: CertificateTemplate) => {
    // TODO: Implement duplicate functionality
  };

  const handleDelete = (_template: CertificateTemplate) => {
    // TODO: Implement delete functionality
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <div className="relative group">
            <div className="aspect-[1.4] relative">
              <Image
                src={template.thumbnail}
                alt={template.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <TemplateActions
                  templateId={template.id}
                  onPreview={() => handlePreview(template)}
                  onDuplicate={() => handleDuplicate(template)}
                  onDelete={() => handleDelete(template)}
                />
              </div>
            </div>
          </div>
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">
                  {template.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  {template.description}
                </CardDescription>
              </div>
              <Badge
                className={
                  template.status === "active"
                    ? "bg-[#C40503] hover:bg-[#DAA625]"
                    : template.status === "draft"
                    ? "bg-gray-500"
                    : "bg-gray-300"
                }
              >
                {template.status === "active"
                  ? "Aktif"
                  : template.status === "draft"
                  ? "Draft"
                  : "Arsip"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Digunakan</span>
              <span className="font-medium">{template.usageCount}x</span>
            </div>
            <div className="flex justify-between">
              <span>Dibuat oleh</span>
              <span className="font-medium">{template.createdBy.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Terakhir diubah</span>
              <span className="font-medium">
                {new Date(template.updatedAt).toLocaleDateString("id-ID")}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
