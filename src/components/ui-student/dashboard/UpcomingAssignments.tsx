"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Assignment {
  title: string;
  dueIn: string;
}

interface UpcomingAssignmentsProps {
  assignments: Assignment[];
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Tugas Mendatang</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <div key={index} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {assignment.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tenggat: {assignment.dueIn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
