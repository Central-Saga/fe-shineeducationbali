"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScheduleView() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Teaching Schedule</h1>
      
      <div className="grid gap-4">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Mathematics - Grade 10</h3>
                  <p className="text-sm text-gray-500">Room 301</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">08:00 - 09:30</p>
                  <span className="text-sm text-green-600">In Progress</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Physics - Grade 11</h3>
                  <p className="text-sm text-gray-500">Room 205</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">10:00 - 11:30</p>
                  <span className="text-sm text-gray-600">Upcoming</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Schedule items would go here */}
              {/* This would typically be populated from an API */}
              <div className="grid gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <div key={day} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold">{day}</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">08:00 - 09:30</span> - Mathematics (Grade 10)
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">10:00 - 11:30</span> - Physics (Grade 11)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
