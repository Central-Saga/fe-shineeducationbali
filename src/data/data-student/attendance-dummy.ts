// src/data/data-student/attendance-dummy.ts

export interface AttendanceMeeting {
  meeting: string; // Nama/urutan pertemuan
  date?: string;   // Tanggal (opsional)
  hadir: boolean;  // true = hadir, false = tidak hadir
}

export const attendanceDummy: AttendanceMeeting[] = [
  { meeting: "Pertemuan 1", date: "2025-07-01", hadir: true },
  { meeting: "Pertemuan 2", date: "2025-07-03", hadir: true },
  { meeting: "Pertemuan 3", date: "2025-07-05", hadir: false },
  { meeting: "Pertemuan 4", date: "2025-07-08", hadir: true },
  { meeting: "Pertemuan 5", date: "2025-07-10", hadir: true },
  { meeting: "Pertemuan 6", date: "2025-07-12", hadir: true },
  { meeting: "Pertemuan 7", date: "2025-07-15", hadir: false },
  { meeting: "Pertemuan 8", date: "2025-07-17", hadir: true },
];
