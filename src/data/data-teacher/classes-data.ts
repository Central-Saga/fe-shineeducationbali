// Data dummy untuk kelas
export const classesData = [
  {
    id: "CLS001",
    name: "Mathematics Grade 10",
    teacher: "Mr. John Smith",
    schedule: "Monday & Wednesday, 09:00 - 10:30",
    totalStudents: 25,
    status: "Active",
  },
  {
    id: "CLS002",
    name: "Physics Grade 11",
    teacher: "Mrs. Sarah Johnson",
    schedule: "Tuesday & Thursday, 10:00 - 11:30",
    totalStudents: 22,
    status: "Active",
  },
  {
    id: "CLS003",
    name: "English Grade 10",
    teacher: "Ms. Emily Brown",
    schedule: "Friday, 13:00 - 15:00",
    totalStudents: 20,
    status: "Active",
  },
];

// Data dummy untuk detail kelas
export const classDetailsData = {
  classId: "CLS001",
  className: "Mathematics Grade 10",
  teacher: "Mr. John Smith",
  schedule: "Monday & Wednesday, 09:00 - 10:30",
  totalStudents: 25,
  averageGrade: "85%",
  students: [
    {
      id: "STD001",
      name: "Alex Johnson",
      email: "alex.j@student.com",
      attendance: 95,
      grade: "A",
    },
    {
      id: "STD002",
      name: "Sarah Smith",
      email: "sarah.s@student.com",
      attendance: 88,
      grade: "B+",
    },
    {
      id: "STD003",
      name: "Mike Brown",
      email: "mike.b@student.com",
      attendance: 92,
      grade: "A-",
    },
  ],
  materials: [
    {
      id: "MAT001",
      title: "Introduction to Algebra",
      type: "document",
      uploadDate: "2025-06-01",
    },
    {
      id: "MAT002",
      title: "Quadratic Equations",
      type: "video",
      uploadDate: "2025-06-05",
    },
  ],
};
