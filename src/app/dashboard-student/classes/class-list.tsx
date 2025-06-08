"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClassList() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Classes</h1>

      {/* Active Classes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            subject: "Mathematics",
            teacher: "Mr. John Smith",
            schedule: "Monday & Wednesday, 08:00 - 09:30",
            progress: 75,
          },
          {
            subject: "Physics",
            teacher: "Mrs. Sarah Johnson",
            schedule: "Tuesday & Thursday, 10:00 - 11:30",
            progress: 68,
          },
          {
            subject: "English",
            teacher: "Ms. Emily Davis",
            schedule: "Monday & Friday, 13:00 - 14:30",
            progress: 82,
          },
        ].map((classItem, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{classItem.subject}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Teacher</p>
                  <p className="font-medium">{classItem.teacher}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Schedule</p>
                  <p className="font-medium">{classItem.schedule}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Progress</p>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#C40503] rounded-full"
                      style={{ width: `${classItem.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-right mt-1">{classItem.progress}%</p>
                </div>
                <Button className="w-full">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Classes */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "08:00 - 09:30",
                subject: "Mathematics",
                teacher: "Mr. John Smith",
                room: "Room 301",
                status: "Completed",
              },
              {
                time: "10:00 - 11:30",
                subject: "Physics",
                teacher: "Mrs. Sarah Johnson",
                room: "Room 205",
                status: "In Progress",
              },
              {
                time: "13:00 - 14:30",
                subject: "English",
                teacher: "Ms. Emily Davis",
                room: "Room 102",
                status: "Upcoming",
              },
            ].map((schedule, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{schedule.subject}</p>
                  <p className="text-sm text-gray-500">{schedule.teacher}</p>
                  <p className="text-sm text-gray-500">{schedule.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{schedule.time}</p>
                  <span
                    className={`text-sm ${
                      schedule.status === "Completed"
                        ? "text-green-600"
                        : schedule.status === "In Progress"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {schedule.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
