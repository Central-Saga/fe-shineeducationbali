"use client";

import { Card } from "@/components/ui/card";

interface Assignment {
  title: string;
  dueIn: string;
}

interface Grade {
  subject: string;
  score: number;
  date: string;
}

interface AssignmentsAndGradesProps {
  assignments: Assignment[];
  grades: Grade[];
}

export function AssignmentsAndGrades({
  assignments,
  grades,
}: AssignmentsAndGradesProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Tugas Mendatang 📝
        </h2>
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-yellow-100 bg-yellow-50"
            >
              <h3 className="font-medium text-gray-800">{assignment.title}</h3>
              <p className="text-sm text-yellow-600 mt-1">
                ⏰ {assignment.dueIn}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Nilai Terbaru 🌟
        </h2>
        <div className="space-y-4">
          {grades.map((grade, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-yellow-100 bg-yellow-50"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{grade.subject}</h3>
                <span className="text-lg font-bold text-yellow-600">
                  {grade.score}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{grade.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
