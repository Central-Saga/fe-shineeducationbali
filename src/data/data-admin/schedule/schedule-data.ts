import { Schedule } from "@/types/schedule";

export const scheduleData: Schedule[] = [
  {
    id: "SCH/2025/06/001",
    title: "Jadwal Kelas Reguler - Semester 1",
    description:
      "Jadwal pembelajaran reguler untuk semester ganjil tahun ajaran 2025/2026",
    schedule_type: "REGULAR",
    education_level: "SMP",
    academic_year: "2025/2026",
    semester: 1,
    start_date: "2025-07-01",
    end_date: "2025-12-31",
    day_of_week: "MONDAY",
    start_time: "08:00",
    end_time: "15:00",
    teacher_schedules: [
      {
        teacher_id: 1,
        teacher_name: "Ni Putu Devi",
        subject: "Matematika",
      },
      {
        teacher_id: 2,
        teacher_name: "I Made Wirawan",
        subject: "Bahasa Inggris",
      },
    ],
    class_schedules: [
      {
        class_id: 1,
        class_name: "7A",
        room: "R.101",
      },
      {
        class_id: 2,
        class_name: "7B",
        room: "R.102",
      },
    ],
    status: "ACTIVE",
    created_at: "2025-06-15T10:00:00Z",
    updated_at: "2025-06-15T10:00:00Z",
  },
  {
    id: "SCH/2025/06/002",
    title: "Jadwal Ujian Tengah Semester",
    description: "Jadwal UTS Semester 1 Tahun Ajaran 2025/2026",
    schedule_type: "EXAM",
    education_level: "SMA",
    academic_year: "2025/2026",
    semester: 1,
    start_date: "2025-09-15",
    end_date: "2025-09-26",
    teacher_schedules: [
      {
        teacher_id: 3,
        teacher_name: "I Nyoman Artha",
        subject: "Fisika",
      },
    ],
    class_schedules: [
      {
        class_id: 5,
        class_name: "10A",
        room: "R.201",
      },
    ],
    status: "DRAFT",
    created_at: "2025-06-16T09:00:00Z",
    updated_at: "2025-06-16T09:00:00Z",
  },
  {
    id: "SCH/2025/06/003",
    title: "Jadwal Les Tambahan",
    description: "Program Bimbingan Belajar Tambahan",
    schedule_type: "REGULAR",
    education_level: "SD",
    academic_year: "2025/2026",
    semester: 1,
    start_date: "2025-07-15",
    end_date: "2025-12-15",
    day_of_week: "WEDNESDAY",
    start_time: "15:30",
    end_time: "17:00",
    teacher_schedules: [
      {
        teacher_id: 4,
        teacher_name: "I Wayan Dharma",
        subject: "Matematika Dasar",
      },
    ],
    class_schedules: [
      {
        class_id: 8,
        class_name: "6A",
        room: "R.301",
      },
    ],
    status: "ACTIVE",
    created_at: "2025-06-14T11:00:00Z",
    updated_at: "2025-06-14T11:00:00Z",
  },
];
