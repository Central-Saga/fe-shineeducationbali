import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  Mail, 
  Phone,
  User,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  grade: string;
  attendance: number;
  status: "active" | "inactive";
  avatar?: string;
}

interface Class {
  id: string;
  name: string;
}

interface StudentListProps {
  students: Student[];
  classes: Class[];
  onViewProfile: (id: string) => void;
  onViewGrades: (id: string) => void;
  onViewAttendance: (id: string) => void;
  onContactStudent: (id: string) => void;
}

export function StudentList({
  students,
  classes,
  onViewProfile,
  onViewGrades,
  onViewAttendance,
  onContactStudent
}: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Filter students based on search term and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? student.class === selectedClass : true;
    const matchesStatus = statusFilter ? student.status === statusFilter : true;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>Manage and view student information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and filters */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="w-[180px]">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by class" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Student list */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No students found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Grades</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {student.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{student.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{student.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{student.grade}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span 
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          student.attendance >= 90 ? "bg-green-500" : 
                          student.attendance >= 75 ? "bg-yellow-500" : "bg-red-500"
                        }`} 
                      />
                      <span>{student.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      student.status === "active" 
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                        : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewProfile(student.id)}>
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewGrades(student.id)}>
                          <FileText className="mr-2 h-4 w-4" />
                          View Grades
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewAttendance(student.id)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          View Attendance
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onContactStudent(student.id)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Contact Student
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
