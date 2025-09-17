import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  status?: 'present' | 'absent' | 'late' | 'excused';
}

interface Class {
  id: string;
  name: string;
}

interface AttendanceTrackerProps {
  classes: Class[];
  students?: Student[];
  onSubmit: (data: any) => void;
}

export function AttendanceTracker({ classes, students = [], onSubmit }: AttendanceTrackerProps) {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [attendance, setAttendance] = useState<Record<string, Student["status"]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load students when a class is selected
  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    // Reset attendance when changing class
    setAttendance({});
  };

  // Update student attendance status
  const updateAttendance = (studentId: string, status: Student["status"]) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedClass || !selectedDate) {
      alert("Please select a class and date");
      return;
    }

    if (Object.keys(attendance).length === 0) {
      alert("No attendance data to submit");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const attendanceData = {
        classId: selectedClass,
        date: selectedDate,
        records: Object.entries(attendance).map(([studentId, status]) => ({
          studentId,
          status
        }))
      };

      await onSubmit(attendanceData);
      
      // Reset form after successful submission
      // setSelectedClass("");
      // setAttendance({});
      alert("Attendance recorded successfully");
    } catch (error) {
      console.error("Failed to submit attendance:", error);
      alert("Failed to record attendance");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick action buttons to mark all students
  const markAll = (status: Student["status"]) => {
    const newAttendance: Record<string, Student["status"]> = {};
    students.forEach(student => {
      newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="class-select">Select Class</Label>
            <Select value={selectedClass} onValueChange={handleClassChange}>
              <SelectTrigger id="class-select">
                <SelectValue placeholder="Choose a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {selectedClass && students.length > 0 ? (
          <>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => markAll('present')}>
                Mark All Present
              </Button>
              <Button variant="outline" size="sm" onClick={() => markAll('absent')}>
                Mark All Absent
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="text-center">Present</TableHead>
                  <TableHead className="text-center">Absent</TableHead>
                  <TableHead className="text-center">Late</TableHead>
                  <TableHead className="text-center">Excused</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={attendance[student.id] === 'present' ? 'default' : 'outline'}
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          attendance[student.id] === 'present' && "bg-green-500 hover:bg-green-600"
                        )}
                        onClick={() => updateAttendance(student.id, 'present')}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          attendance[student.id] === 'absent' && "bg-red-500 hover:bg-red-600"
                        )}
                        onClick={() => updateAttendance(student.id, 'absent')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          attendance[student.id] === 'late' && "bg-yellow-500 hover:bg-yellow-600"
                        )}
                        onClick={() => updateAttendance(student.id, 'late')}
                      >
                        <span className="text-xs font-bold">L</span>
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant={attendance[student.id] === 'excused' ? 'default' : 'outline'}
                        size="icon"
                        className={cn(
                          "h-8 w-8",
                          attendance[student.id] === 'excused' && "bg-blue-500 hover:bg-blue-600"
                        )}
                        onClick={() => updateAttendance(student.id, 'excused')}
                      >
                        <span className="text-xs font-bold">E</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : selectedClass ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No students found in this class</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Please select a class to view students</p>
          </div>
        )}
      </CardContent>
      
      {selectedClass && students.length > 0 && (
        <CardFooter>
          <Button 
            className="ml-auto" 
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(attendance).length === 0}
          >
            {isSubmitting ? "Saving..." : "Save Attendance"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
