import {
  Attendance,
  AttendanceReport,
  AttendanceSettings,
} from "@/types/attendance";
import { apiRequest } from "../api";

class AttendanceService {
  private attendanceRecords: Attendance[] = [];

  async markAttendance(
    data: Omit<Attendance, "id" | "createdAt" | "updatedAt">
  ): Promise<Attendance> {
    return apiRequest<Attendance>("POST", "/api/v1/attendance", data);
  }

  async getStudentAttendance(
    studentId: string,
    startDate: string,
    endDate: string
  ): Promise<Attendance[]> {
    const params = new URLSearchParams({
      studentId,
      startDate,
      endDate,
    });
    return apiRequest<Attendance[]>("GET", `/api/v1/attendance/student?${params}`);
  }

  async getClassAttendance(
    classId: string,
    date: string
  ): Promise<Attendance[]> {
    const params = new URLSearchParams({ classId, date });
    return apiRequest<Attendance[]>("GET", `/api/v1/attendance/class?${params}`);
  }

  async generateReport(
    classId: string,
    startDate: string,
    endDate: string
  ): Promise<AttendanceReport[]> {
    const params = new URLSearchParams({
      classId,
      startDate,
      endDate,
    });
    return apiRequest<AttendanceReport[]>("GET", `/api/v1/attendance/reports?${params}`);
  }

  async getSettings(): Promise<AttendanceSettings> {
    return apiRequest<AttendanceSettings>("GET", "/api/v1/attendance/settings");
  }

  async updateSettings(
    settings: Partial<AttendanceSettings>
  ): Promise<AttendanceSettings> {
    return apiRequest<AttendanceSettings>("PUT", "/api/v1/attendance/settings", settings);
  }
}

export const attendanceService = new AttendanceService();
