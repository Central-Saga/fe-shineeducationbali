"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, MoreHorizontal, Users, Calendar, BookOpen, GraduationCap } from "lucide-react";

// Dummy type, replace with your actual type
interface Class {
  id: string;
  class_name: string;
  schedule: string;
  capacity: number;
  current_enrollment: number;
  teacher_name: string;
  course_name: string;
  program_name: string;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED" | "DRAFT";
  room?: string;
}

export function ClassList() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy data, replace with API call
    const dummyClasses: Class[] = [
      {
        id: "1",
        class_name: "English Beginner A1",
        schedule: "Mon, Wed, Fri - 09:00-11:00",
        capacity: 20,
        current_enrollment: 15,
        teacher_name: "John Smith",
        course_name: "Basic English",
        program_name: "English Learning Program",
        status: "ACTIVE",
        room: "A1",
      },
      {
        id: "2",
        class_name: "Mathematics Advanced",
        schedule: "Tue, Thu - 14:00-16:00",
        capacity: 15,
        current_enrollment: 12,
        teacher_name: "Sarah Johnson",
        course_name: "Advanced Mathematics",
        program_name: "Mathematics Excellence Program",
        status: "ACTIVE",
        room: "B2",
      },
    ];
    setClasses(dummyClasses);
    setLoading(false);
  }, []);

  const filteredClasses = classes.filter(
    (cls) =>
      cls.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: any = {
      ACTIVE: "bg-green-100 text-green-800",
      INACTIVE: "bg-gray-100 text-gray-800",
      COMPLETED: "bg-blue-100 text-blue-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
    };
    return variants[status] || variants.DRAFT;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search and Create */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search classes, teachers, or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button className="bg-[#C40503] hover:bg-[#A30402]">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Class
        </Button>
      </div>

      {/* Classes Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Course/Program</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.map((classData) => (
              <TableRow key={classData.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{classData.class_name}</div>
                    <div className="text-sm text-gray-500">{classData.room}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{classData.course_name}</div>
                    <div className="text-sm text-gray-500">{classData.program_name}</div>
                  </div>
                </TableCell>
                <TableCell>{classData.teacher_name}</TableCell>
                <TableCell>
                  <div className="text-sm">{classData.schedule}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {classData.current_enrollment}/{classData.capacity}
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{
                          width: `${(classData.current_enrollment / classData.capacity) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(classData.status)}>
                    {classData.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
