"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scheduleInfo } from '@/data/data-teacher/attendance/teacher-attendance-data';
import { toast } from "@/components/ui/use-toast";

interface CheckInCardProps {
  defaultCheckedIn?: boolean;
  defaultCheckedOut?: boolean;
  className?: string;
}

export function CheckInCard({ defaultCheckedIn = false, defaultCheckedOut = false, className = '' }: CheckInCardProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [checkedIn, setCheckedIn] = useState(defaultCheckedIn);
  const [checkedOut, setCheckedOut] = useState(defaultCheckedOut);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), 'HH:mm:ss'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    setCheckedIn(true);
    
    const checkInTime = format(new Date(), 'HH:mm');
    
    // In a real app, you would send this data to your backend
    // const newAttendance = {
    //   date: new Date(),
    //   status: isLate ? 'late' : 'present',
    //   checkIn: checkInTime
    // };
    
    toast({
      title: "Berhasil Check In",
      description: `Anda telah check in pada ${checkInTime}`,
    });
  };

  const handleCheckOut = () => {
    setCheckedOut(true);
    const checkOutTime = format(new Date(), 'HH:mm');
    
    // In a real app, you would update your backend with check out time
    
    toast({
      title: "Berhasil Check Out",
      description: `Anda telah check out pada ${checkOutTime}`,
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3 py-5">
        <CardTitle>Check In / Check Out</CardTitle>
        <CardDescription>
          {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-3xl font-mono font-bold mb-4">{currentTime}</div>
          <div className="flex justify-center space-x-4 mb-4">
            <Badge variant="outline" className="px-3 py-2">Jam Masuk: {scheduleInfo.checkInTime}</Badge>
            <Badge variant="outline" className="px-3 py-2">Jam Pulang: {scheduleInfo.checkOutTime}</Badge>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4 pb-5">
          <Button 
            className="bg-green-600 hover:bg-green-700 py-6 text-base" 
            onClick={handleCheckIn}
            disabled={checkedIn}
          >
            <CheckCircle2 className="mr-3 h-5 w-5" />
            {checkedIn ? 'Sudah Check In' : 'Check In'}
          </Button>
          
          <Button 
            variant="outline" 
            className="border-red-200 text-red-600 hover:bg-red-50 py-6 text-base" 
            onClick={handleCheckOut}
            disabled={!checkedIn || checkedOut}
          >
            <Clock className="mr-3 h-5 w-5" />
            {checkedOut ? 'Sudah Check Out' : 'Check Out'}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 border-t pt-4 pb-3">
        Anda harus check in sebelum pukul {scheduleInfo.checkInTime} untuk tidak dianggap terlambat
      </CardFooter>
    </Card>
  );
}
