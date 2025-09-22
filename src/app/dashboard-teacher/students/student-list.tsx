"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StudentList } from "@/components/ui-teacher/students/StudentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { studentsData } from "@/data/data-teacher/students-data";

// Extract unique classes from the students data
const classes = studentsData.map((student) => ({
  id: student.id,
  name: student.class
})).filter((value, index, self) => 
  self.findIndex(v => v.name === value.name) === index
);

export default function StudentListPage() {
  // const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const handleViewProfile = (id: string) => {
    console.log("Viewing student profile:", id);
    // setSelectedStudent(id);
    // Here you would navigate to the student profile page or open a modal
  };

  const handleViewGrades = (id: string) => {
    console.log("Viewing student grades:", id);
    // Here you would navigate to the student grades page or open a modal
  };

  const handleViewAttendance = (id: string) => {
    console.log("Viewing student attendance:", id);
    // Here you would navigate to the student attendance page or open a modal
  };

  const handleContactStudent = (id: string) => {
    console.log("Contacting student:", id);
    // Here you would open a contact form or messaging interface
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Daftar Siswa
          </CardTitle>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Tambah Siswa
          </Button>
        </CardHeader>
        <CardContent>
          <StudentList
            students={studentsData.map(student => ({
              ...student,
              status: student.status === 'active' ? 'active' : 'inactive'
            }))}
            classes={classes}
            onViewProfile={handleViewProfile}
            onViewGrades={handleViewGrades}
            onViewAttendance={handleViewAttendance}
            onContactStudent={handleContactStudent}
          />
        </CardContent>
      </Card>
    </div>
  );
}
