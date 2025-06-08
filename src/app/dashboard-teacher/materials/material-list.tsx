"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MaterialList() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Teaching Materials</h1>
        <Button className="bg-[#C40503] hover:bg-[#b30402]">
          Upload New Material
        </Button>
      </div>

      <div className="grid gap-4">
        {/* Recent Materials */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Mathematics Fundamentals",
                  subject: "Mathematics",
                  grade: "Grade 10",
                  uploadedAt: "2 days ago",
                  type: "PDF",
                },
                {
                  title: "Physics Lab Guide",
                  subject: "Physics",
                  grade: "Grade 11",
                  uploadedAt: "1 week ago",
                  type: "PDF",
                },
              ].map((material, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">{material.title}</h3>
                    <p className="text-sm text-gray-500">
                      {material.subject} - {material.grade}
                    </p>
                    <p className="text-xs text-gray-400">
                      Uploaded {material.uploadedAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Material Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Material Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Lecture Notes", count: 15 },
                { name: "Presentations", count: 8 },
                { name: "Worksheets", count: 12 },
                { name: "Video Lectures", count: 5 },
                { name: "Practice Tests", count: 10 },
                { name: "Study Guides", count: 7 },
              ].map((category, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.count} items
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
