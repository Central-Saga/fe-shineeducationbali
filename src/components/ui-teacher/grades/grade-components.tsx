"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { gradesData } from "@/data/data-teacher/grades/grades-data";

// Student type after processing
interface ProcessedStudent {
  id: string;
  name: string;
  grades: {
    id: string;
    subject: string;
    className: string;
    score: number;
    maxScore: number;
    assignmentTitle: string;
    feedback: string;
    submissionDate: string;
  }[];
  subjects: string[];
}

// Convert the flat grades data into a student-centered structure
export function useProcessedGradesData() {
  const [processedData, setProcessedData] = useState<ProcessedStudent[]>([]);
  
  useEffect(() => {
    // Group grades by student
    const studentMap = new Map<string, ProcessedStudent>();
    
    gradesData.forEach(grade => {
      if (!studentMap.has(grade.studentId)) {
        studentMap.set(grade.studentId, {
          id: grade.studentId,
          name: grade.studentName,
          grades: [],
          subjects: new Set<string>() as unknown as string[]
        });
      }
      
      const student = studentMap.get(grade.studentId)!;
      
      // Add subject to the student's subjects
      if (Array.isArray(student.subjects)) {
        if (!student.subjects.includes(grade.subject)) {
          student.subjects.push(grade.subject);
        }
      } else {
        student.subjects = [grade.subject];
      }
      
      // Add grade information
      if (grade.status === "graded") {
        student.grades.push({
          id: grade.id,
          subject: grade.subject,
          className: grade.className,
          score: grade.score || 0,
          maxScore: grade.maxScore || 100,
          assignmentTitle: grade.assignmentTitle,
          feedback: grade.feedback || '',
          submissionDate: grade.submissionDate
        });
      }
    });
    
    // Convert Map to array
    setProcessedData(Array.from(studentMap.values()));
  }, []);
  
  return processedData;
}

// Grade Card component for the dashboard
export function GradeCard({ className, stats }: { className: string, stats: { average: number; totalStudents: number; passed: number; failed: number; highest: number } }) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium text-[#C40503]">{className}</h3>
      <div className="mt-2 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold">{stats.average.toFixed(1)}</span>
          <p className="text-xs text-gray-500">Rata-rata</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-green-600">{stats.highest.toFixed(1)}</div>
          <p className="text-xs text-gray-500">Tertinggi</p>
        </div>
      </div>
      <Progress value={stats.average} className="h-2 mt-2" />
    </div>
  );
}

// Top Student Card component
export function TopStudentCard({ 
  student, 
  className, 
  score 
}: { 
  student: { name: string, id: string }, 
  className: string, 
  score: number 
}) {
  return (
    <div className="p-4 border rounded-lg hover:border-[#DAA625] transition-colors">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`/avatars/student-${student.id.slice(-1)}.png`} alt={student.name} />
          <AvatarFallback className="bg-[#DAA625] text-white">
            {student.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{student.name}</h3>
          <p className="text-sm text-gray-500">{className}</p>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Nilai Rata-rata</span>
          <span className="font-semibold">{score.toFixed(1)}</span>
        </div>
        <Progress value={score} className="h-2" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Badge variant="outline" className="bg-[#f8f4e5] border-[#DAA625] text-[#DAA625] flex items-center">
          <Star className="h-3 w-3 mr-1 fill-[#DAA625] text-[#DAA625]" />
          Top Student
        </Badge>
        <Button variant="ghost" className="h-8 text-xs text-[#C40503]">
          Lihat Detail
        </Button>
      </div>
    </div>
  );
}
