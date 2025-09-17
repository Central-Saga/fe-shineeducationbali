export type ScheduleType = "REGULAR" | "EXAM" | "EVENT" | "HOLIDAY";
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
export type ScheduleStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export interface TeacherSchedule {
  teacher_id: number;
  teacher_name: string;
  subject: string;
}

export interface ClassSchedule {
  class_id: number;
  class_name: string;
  room?: string;
}

export interface Schedule {
  id: string;
  title: string;
  description?: string;
  schedule_type: ScheduleType;
  education_level: "SD" | "SMP" | "SMA";
  academic_year: string;
  semester: 1 | 2;
  start_date: string;
  end_date: string;
  day_of_week?: DayOfWeek;
  start_time?: string;
  end_time?: string;
  teacher_schedules: TeacherSchedule[];
  class_schedules: ClassSchedule[];
  status: ScheduleStatus;
  created_at: string;
  updated_at: string;
  notes?: string;
}
