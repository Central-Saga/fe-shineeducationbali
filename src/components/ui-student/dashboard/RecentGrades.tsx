"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Grade {
  subject: string;
  score: number;
  date: string;
}

interface RecentGradesProps {
  grades: Grade[];
}

export function RecentGrades({ grades }: RecentGradesProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Nilai Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {grades.map((grade, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {grade.subject}
                </p>
                <p className="text-sm text-muted-foreground">{grade.date}</p>
              </div>
              <span
                className={`font-bold ${
                  grade.score >= 90
                    ? "text-green-600"
                    : grade.score >= 80
                    ? "text-blue-600"
                    : grade.score >= 70
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {grade.score}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
