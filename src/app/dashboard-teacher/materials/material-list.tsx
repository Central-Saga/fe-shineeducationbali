"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { materialsData } from "@/data/data-teacher/materials/materials-data";
import { Plus, Download, FileText, Video } from "lucide-react";

export default function MaterialList() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Learning Materials
          </CardTitle>
          <Button className="bg-[#C40503] hover:bg-[#b30402]">
            <Plus className="mr-2 h-4 w-4" />
            Upload New Material
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materialsData.map((material) => (
              <Card key={material.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    {material.type === "document" ? (
                      <FileText className="h-8 w-8 text-blue-500" />
                    ) : (
                      <Video className="h-8 w-8 text-red-500" />
                    )}
                    <Button variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="mt-4 font-semibold">{material.title}</h3>
                  <p className="text-sm text-gray-500">{material.subject}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>Uploaded: {material.uploadedDate}</span>
                    <span>{material.fileSize}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
