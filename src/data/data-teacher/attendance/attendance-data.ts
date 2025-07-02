// Data dummy untuk kehadiran siswa
export const attendanceData = [
  {
    id: "ATT001",
    date: "2025-07-01",
    classId: "C001",
    className: "Kelas X-A",
    subject: "Matematika",
    students: [
      { id: "S001", name: "Ahmad Rizky", status: "present", notes: "" },
      { id: "S002", name: "Putri Indah", status: "present", notes: "" },
      { id: "S003", name: "Budi Santoso", status: "absent", notes: "Sakit" },
      { id: "S004", name: "Dina Maulida", status: "present", notes: "" },
      { id: "S005", name: "Eko Prasetyo", status: "late", notes: "Terlambat 15 menit" },
    ]
  },
  {
    id: "ATT002",
    date: "2025-07-01",
    classId: "C002",
    className: "Kelas X-B",
    subject: "Bahasa Inggris",
    students: [
      { id: "S006", name: "Fajar Nugroho", status: "present", notes: "" },
      { id: "S007", name: "Gita Nirmala", status: "absent", notes: "Izin keluarga" },
      { id: "S008", name: "Hadi Santoso", status: "present", notes: "" },
      { id: "S009", name: "Indah Permata", status: "present", notes: "" },
      { id: "S010", name: "Joko Widodo", status: "absent", notes: "Tanpa keterangan" },
    ]
  },
  {
    id: "ATT003",
    date: "2025-07-01",
    classId: "C003",
    className: "Kelas XI-A",
    subject: "Coding",
    students: [
      { id: "S011", name: "Kartika Sari", status: "present", notes: "" },
      { id: "S012", name: "Lukman Hakim", status: "present", notes: "" },
      { id: "S013", name: "Mawar Melati", status: "present", notes: "" },
      { id: "S014", name: "Nugroho Adi", status: "late", notes: "Terlambat 10 menit" },
      { id: "S015", name: "Okta Pratama", status: "present", notes: "" },
    ]
  },
  {
    id: "ATT004",
    date: "2025-06-30",
    classId: "C001",
    className: "Kelas X-A",
    subject: "Matematika",
    students: [
      { id: "S001", name: "Ahmad Rizky", status: "present", notes: "" },
      { id: "S002", name: "Putri Indah", status: "present", notes: "" },
      { id: "S003", name: "Budi Santoso", status: "present", notes: "" },
      { id: "S004", name: "Dina Maulida", status: "absent", notes: "Sakit" },
      { id: "S005", name: "Eko Prasetyo", status: "present", notes: "" },
    ]
  },
  {
    id: "ATT005",
    date: "2025-06-30",
    classId: "C003",
    className: "Kelas XI-A",
    subject: "Coding",
    students: [
      { id: "S011", name: "Kartika Sari", status: "present", notes: "" },
      { id: "S012", name: "Lukman Hakim", status: "absent", notes: "Izin keluarga" },
      { id: "S013", name: "Mawar Melati", status: "present", notes: "" },
      { id: "S014", name: "Nugroho Adi", status: "present", notes: "" },
      { id: "S015", name: "Okta Pratama", status: "present", notes: "" },
    ]
  }
];

// Summary data untuk dashboard
export const attendanceSummary = {
  totalPresent: 85,
  totalAbsent: 12,
  totalLate: 3,
  attendanceRate: 87.5, // in percentage
  absenteeismRate: 12.5, // in percentage
  latestRecords: [
    {
      date: "2025-07-01",
      className: "Kelas X-A",
      presentCount: 3,
      absentCount: 1,
      lateCount: 1,
    },
    {
      date: "2025-07-01",
      className: "Kelas X-B",
      presentCount: 3,
      absentCount: 2,
      lateCount: 0,
    },
    {
      date: "2025-07-01",
      className: "Kelas XI-A",
      presentCount: 4,
      absentCount: 0,
      lateCount: 1,
    }
  ]
};
