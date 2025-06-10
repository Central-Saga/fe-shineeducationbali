"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Users, Calendar, Book } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  attendance: number;
  grade: string;
}

interface Material {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
}

interface ClassDetailsProps {
  classId: string;
  className: string;
  teacher: string;
  schedule: string;
  totalStudents: number;
  averageGrade: string;
  students: Student[];
  materials: Material[];
}

export function ClassDetails({
  classId,
  className,
  teacher,
  schedule,
  totalStudents,
  averageGrade,
  students,
  materials,
}: ClassDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageGrade}</div>
          </CardContent>
        </Card>
      </div>

      {/* Class Information */}
      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Class Name</p>
                <p className="font-medium">{className}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teacher</p>
                <p className="font-medium">{teacher}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Schedule</p>
                <p className="font-medium">{schedule}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class ID</p>
                <p className="font-medium">{classId}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Students</CardTitle>
          <Button>Add Student</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Class Materials */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Class Materials</CardTitle>
          <Button>Upload Material</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">
                    {material.title}
                  </TableCell>
                  <TableCell>{material.type}</TableCell>
                  <TableCell>{material.uploadDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
