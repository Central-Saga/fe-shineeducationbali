// Data dummy untuk laporan
export const reportsData = [
  {
    id: "REP001",
    title: "Laporan Prestasi Akademik Semester Genap",
    type: "academic",
    date: "2025-06-25",
    classId: "C001",
    className: "Kelas X-A",
    status: "published",
    metrics: {
      averageScore: 82.5,
      highestScore: 98,
      lowestScore: 65,
      passingRate: 95, // dalam persen
    },
    subjectBreakdown: [
      {
        subject: "Matematika",
        averageScore: 78,
        highestScore: 95,
        lowestScore: 60
      },
      {
        subject: "Bahasa Inggris",
        averageScore: 85,
        highestScore: 98,
        lowestScore: 72
      },
      {
        subject: "Coding",
        averageScore: 80,
        highestScore: 96,
        lowestScore: 65
      }
    ]
  },
  {
    id: "REP002",
    title: "Laporan Kehadiran Semester Genap",
    type: "attendance",
    date: "2025-06-20",
    classId: "C001",
    className: "Kelas X-A",
    status: "published",
    metrics: {
      attendanceRate: 92.5, // dalam persen
      absentRate: 5.8,
      lateRate: 1.7,
      perfectAttendanceCount: 15 // jumlah siswa dengan kehadiran sempurna
    }
  },
  {
    id: "REP003",
    title: "Laporan Prestasi Akademik Semester Genap",
    type: "academic",
    date: "2025-06-25",
    classId: "C002",
    className: "Kelas X-B",
    status: "draft",
    metrics: {
      averageScore: 80.2,
      highestScore: 96,
      lowestScore: 62,
      passingRate: 90, // dalam persen
    },
    subjectBreakdown: [
      {
        subject: "Matematika",
        averageScore: 75,
        highestScore: 92,
        lowestScore: 62
      },
      {
        subject: "Bahasa Inggris",
        averageScore: 83,
        highestScore: 96,
        lowestScore: 70
      },
      {
        subject: "Coding",
        averageScore: 79,
        highestScore: 94,
        lowestScore: 65
      }
    ]
  },
  {
    id: "REP004",
    title: "Laporan Kehadiran Semester Genap",
    type: "attendance",
    date: "2025-06-20",
    classId: "C002",
    className: "Kelas X-B",
    status: "draft",
    metrics: {
      attendanceRate: 90.0, // dalam persen
      absentRate: 7.5,
      lateRate: 2.5,
      perfectAttendanceCount: 12 // jumlah siswa dengan kehadiran sempurna
    }
  },
  {
    id: "REP005",
    title: "Laporan Prestasi Akademik Semester Genap",
    type: "academic",
    date: "2025-06-25",
    classId: "C003",
    className: "Kelas XI-A",
    status: "published",
    metrics: {
      averageScore: 85.5,
      highestScore: 99,
      lowestScore: 68,
      passingRate: 97, // dalam persen
    },
    subjectBreakdown: [
      {
        subject: "Matematika",
        averageScore: 82,
        highestScore: 97,
        lowestScore: 68
      },
      {
        subject: "Bahasa Inggris",
        averageScore: 88,
        highestScore: 99,
        lowestScore: 75
      },
      {
        subject: "Coding",
        averageScore: 85,
        highestScore: 98,
        lowestScore: 72
      }
    ]
  },
  {
    id: "REP006",
    title: "Laporan Evaluasi Project Akhir",
    type: "project",
    date: "2025-06-15",
    classId: "C003",
    className: "Kelas XI-A",
    status: "published",
    metrics: {
      averageScore: 87.5,
      highestScore: 100,
      lowestScore: 75,
      passingRate: 100, // dalam persen
    },
    projectDetails: {
      name: "Website Portfolio",
      description: "Membuat website portfolio menggunakan HTML, CSS, dan JavaScript",
      submissionRate: 100, // dalam persen
      qualitySummary: "Secara umum, kualitas project sangat baik dengan 75% siswa mendapatkan nilai A."
    }
  }
];

// Data ringkasan untuk dashboard
export const reportsSummary = {
  totalReports: 6,
  publishedReports: 4,
  draftReports: 2,
  averageScores: {
    "Kelas X-A": 82.5,
    "Kelas X-B": 80.2,
    "Kelas XI-A": 86.5
  },
  attendanceRates: {
    "Kelas X-A": 92.5,
    "Kelas X-B": 90.0,
    "Kelas XI-A": 95.5
  }
};
