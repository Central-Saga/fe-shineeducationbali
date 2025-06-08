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

export default function GradeList() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Grades</h1>
        <Button className="bg-[#C40503] hover:bg-[#b30402]">
          Add New Grades
        </Button>
      </div>

      <div className="grid gap-4">
        {/* Class Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Grade 10A", "Grade 10B", "Grade 11A", "Grade 11B"].map(
                (className, index) => (
                  <Button key={index} variant="outline" className="w-full">
                    {className}
                  </Button>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Grade Table */}
        <Card>
          <CardHeader>
            <CardTitle>Grade 10A - Mathematics</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Assignment 1</TableHead>
                  <TableHead>Assignment 2</TableHead>
                  <TableHead>Mid Term</TableHead>
                  <TableHead>Final</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "John Doe",
                    id: "STD001",
                    grades: [85, 90, 88, 92],
                  },
                  {
                    name: "Jane Smith",
                    id: "STD002",
                    grades: [92, 88, 95, 90],
                  },
                ].map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.id}</TableCell>
                    {student.grades.map((grade, gradeIndex) => (
                      <TableCell key={gradeIndex}>{grade}</TableCell>
                    ))}
                    <TableCell>
                      {Math.round(
                        student.grades.reduce((a, b) => a + b) /
                          student.grades.length
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Grade Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#C40503]">89.5%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Highest Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">95%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lowest Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">85%</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
