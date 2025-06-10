"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CertificateTemplate } from "@/types/certificate";
import { Edit, Trash, LayoutTemplate } from "lucide-react";

// Mock data
const mockTemplates: CertificateTemplate[] = [
  {
    id: "template1",
    name: "Standard Certificate",
    description: "Default template for course completion certificates",
    html: `<div>Certificate HTML here</div>`,
    previewImageUrl: "/preview1.png",
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T08:00:00Z",
    status: "active",
    metadata: {
      placeholders: [
        "{student_name}",
        "{course_name}",
        "{completion_date}",
        "{certificate_id}",
      ],
      dimensions: {
        width: 800,
        height: 600,
      },
    },
  },
  {
    id: "template2",
    name: "Achievement Certificate",
    description: "Template for special achievements and awards",
    html: `<div>Certificate HTML here</div>`,
    previewImageUrl: "/preview2.png",
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-01-20T08:00:00Z",
    status: "active",
    metadata: {
      placeholders: [
        "{student_name}",
        "{achievement_name}",
        "{date}",
        "{certificate_id}",
      ],
      dimensions: {
        width: 800,
        height: 600,
      },
    },
  },
];

export default function TemplatesTab() {
  const [templates, setTemplates] =
    useState<CertificateTemplate[]>(mockTemplates);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Certificate Templates</h2>
          <p className="text-muted-foreground">
            Manage certificate templates and designs
          </p>
        </div>
        <Button>
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Create New Template
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <div className="aspect-[1.414/1] relative overflow-hidden rounded-t-lg">
              {/* Will be replaced with actual template preview */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <LayoutTemplate className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    template.status === "active"
                      ? "bg-green-100 text-green-800"
                      : template.status === "draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {template.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Placeholders</p>
                  <div className="flex flex-wrap gap-1">
                    {template.metadata.placeholders.map(
                      (placeholder, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {placeholder}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
