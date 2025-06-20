export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "SICK" | "PERMISSION";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceReport {
  studentId: string;
  studentName: string;
  className: string;
  totalDays: number;
  present: number;
  absent: number;
  late: number;
  sick: number;
  permission: number;
  attendancePercentage: number;
}

export interface AttendanceSettings {
  lateThresholdMinutes: number;
  allowLateEntry: boolean;
  requireNotes: boolean;
  notifyParents: boolean;
  autoMarkAbsent: boolean;
}
