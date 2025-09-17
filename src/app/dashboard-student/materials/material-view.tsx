"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video } from "lucide-react";

// Mock data untuk testing
const mockMaterials = [
  {
    title: "Pengenalan Algoritma",
    type: "document",
    subject: "Coding",
    uploadDate: "2025-06-01",
    size: "2.5 MB",
  },
  {
    title: "Tutorial Python Dasar",
    type: "video",
    subject: "Coding",
    uploadDate: "2025-06-03",
    size: "150 MB",
  },
  {
    title: "Latihan Soal Matematika",
    type: "document",
    subject: "Matematika",
    uploadDate: "2025-06-05",
    size: "1.2 MB",
  },
];

export default function MaterialView() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Materi Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockMaterials.map((material, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {material.type === "document" ? (
                      <FileText className="h-8 w-8 text-blue-500" />
                    ) : (
                      <Video className="h-8 w-8 text-red-500" />
                    )}
                    <div>
                      <h3 className="font-semibold">{material.title}</h3>
                      <p className="text-sm text-gray-500">
                        {material.subject} • {material.size} •
                        {new Date(material.uploadDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
