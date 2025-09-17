// Data dummy untuk detail kelas yang diajar oleh guru
export const classDetailsData = {
  id: "C001",
  name: "Kelas X-A",
  subject: "Matematika",
  level: "Dasar",
  schedule: "Senin, Rabu",
  time: "08:00 - 09:30",
  room: "Ruang 101",
  teacher: "Budi Santoso",
  studentCount: 28,
  progress: 75,
  status: "active",
  description: "Kelas matematika dasar untuk siswa kelas X semester 1",
  syllabus: [
    "Aljabar dasar",
    "Geometri",
    "Trigonometri",
    "Kalkulus dasar",
    "Statistika"
  ],
  students: [
    { id: "S001", name: "Ahmad Fadli", attendance: "90%", grade: "A" },
    { id: "S002", name: "Budi Pratama", attendance: "85%", grade: "A-" },
    { id: "S003", name: "Citra Dewi", attendance: "95%", grade: "A+" },
    { id: "S004", name: "Dian Purnama", attendance: "80%", grade: "B+" },
    { id: "S005", name: "Eko Wijaya", attendance: "75%", grade: "B" },
    { id: "S006", name: "Fitri Handayani", attendance: "88%", grade: "A-" },
    { id: "S007", name: "Gunawan", attendance: "92%", grade: "A" },
    { id: "S008", name: "Hana Putri", attendance: "87%", grade: "B+" }
  ],
  assignments: [
    { id: "A001", title: "Tugas Aljabar 1", dueDate: "2023-09-15", status: "completed" },
    { id: "A002", title: "Tugas Geometri", dueDate: "2023-09-22", status: "completed" },
    { id: "A003", title: "Tugas Trigonometri", dueDate: "2023-09-29", status: "ongoing" },
    { id: "A004", title: "Ujian Tengah Semester", dueDate: "2023-10-10", status: "upcoming" }
  ],
  materials: [
    { id: "M001", title: "Modul Aljabar Dasar", type: "PDF", uploadedDate: "2023-08-05" },
    { id: "M002", title: "Presentasi Geometri", type: "PPT", uploadedDate: "2023-08-12" },
    { id: "M003", title: "Worksheet Trigonometri", type: "PDF", uploadedDate: "2023-08-19" },
    { id: "M004", title: "Video Penjelasan Kalkulus", type: "Video", uploadedDate: "2023-08-26" }
  ]
};
