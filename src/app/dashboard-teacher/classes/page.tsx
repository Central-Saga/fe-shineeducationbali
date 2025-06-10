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
import { Plus, Search } from "lucide-react";
import Link from "next/link";

// Mock data for testing
const mockClasses = [
  {
    id: "CLS001",
    name: "Mathematics Grade 10",
    teacher: "Mr. John Smith",
    schedule: "Monday & Wednesday, 09:00 - 10:30",
    students: 25,
    status: "Active",
  },
  {
    id: "CLS002",
    name: "Physics Grade 11",
    teacher: "Mrs. Sarah Johnson",
    schedule: "Tuesday & Thursday, 10:00 - 11:30",
    students: 22,
    status: "Active",
  },
  {
    id: "CLS003",
    name: "English Grade 10",
    teacher: "Ms. Emily Davis",
    schedule: "Monday & Friday, 13:00 - 14:30",
    students: 28,
    status: "Active",
  },
];

export default function ClassList() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Classes
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search classes..."
                className="pl-8 h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Class
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">
                    {classItem.name}
                  </TableCell>
                  <TableCell>{classItem.teacher}</TableCell>
                  <TableCell>{classItem.schedule}</TableCell>
                  <TableCell>{classItem.students}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        classItem.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {classItem.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/dashboard-teacher/classes/${classItem.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        Edit
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
