"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, XCircle, Calendar, UserCheck } from "lucide-react";
import { attendanceDummy, AttendanceMeeting } from "@/data/data-student/attendance-dummy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AttendanceTablePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="../"
          className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Detail Kelas
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#C40503]/10 rounded-lg">
            <UserCheck className="h-6 w-6 text-[#C40503]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Rekap Kehadiran Anda</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#C40503]" />
              Daftar Kehadiran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceDummy.map((item: AttendanceMeeting, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.meeting}</h3>
                      {item.date && (
                        <p className="text-sm text-gray-600">
                          {new Date(item.date).toLocaleDateString('id-ID', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {item.hadir ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Hadir
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
                        <XCircle className="h-4 w-4 mr-1" />
                        Tidak Hadir
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Keterangan Status</h4>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 font-medium">Hadir</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-700 font-medium">Tidak Hadir</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
