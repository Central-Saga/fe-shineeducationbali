"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/ui-admin/grades/Overview";
import { GradeList } from "@/components/ui-admin/grades/GradeList";

export default function GradesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Manajemen Nilai</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-grades">Semua Nilai</TabsTrigger>
          <TabsTrigger value="by-course">Per Mata Pelajaran</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>

        <TabsContent value="all-grades">
          <GradeList />
        </TabsContent>

        <TabsContent value="by-course">
          <Card>
            <CardHeader>
              <CardTitle>Nilai Per Mata Pelajaran</CardTitle>
              <CardDescription>
                Lihat dan kelola nilai berdasarkan mata pelajaran
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Course-based grade content will be implemented */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
