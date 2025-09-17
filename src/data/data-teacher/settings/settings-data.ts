// Data dummy untuk pengaturan guru
export const teacherSettings = {
  account: {
    id: "T001",
    name: "Budi Setiawan, S.Pd",
    email: "budi.setiawan@shineeducation.com",
    phone: "081234567890",
    address: "Jalan Pendidikan No. 123, Denpasar",
    avatar: "/avatars/teacher.png",
    joinDate: "2022-07-01",
    role: "teacher",
    bio: "Guru berpengalaman dengan spesialisasi di bidang Matematika dan Coding. Lulusan Universitas Pendidikan Indonesia dengan pengalaman mengajar selama 8 tahun.",
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    remindersBefore: 30, // dalam menit
    notifyOnStudentSubmission: true,
    notifyOnComment: true,
    notifyOnGradePublish: false,
    dailyDigest: true,
    weeklyReport: true
  },
  security: {
    lastPasswordChange: "2025-05-15",
    twoFactorEnabled: true,
    loginDevices: [
      {
        device: "Windows PC - Chrome",
        location: "Denpasar, Indonesia",
        lastLogin: "2025-07-01T08:30:00"
      },
      {
        device: "iPhone - Safari",
        location: "Denpasar, Indonesia",
        lastLogin: "2025-06-30T18:45:00"
      }
    ]
  },
  preferences: {
    language: "id",
    timezone: "Asia/Makassar",
    theme: "light",
    dashboardView: "compact",
    calendarDefaultView: "week",
  },
  classes: [
    {
      id: "C001",
      name: "Kelas X-A",
      subject: "Matematika",
      schedule: "Senin, 08:00 - 09:30"
    },
    {
      id: "C003",
      name: "Kelas XI-A",
      subject: "Coding",
      schedule: "Rabu, 13:00 - 14:30"
    }
  ]
};
