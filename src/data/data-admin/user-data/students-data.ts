// Data dummy untuk siswa
export const studentsData = [
  {
    id: "STD001",
    name: "Alex Johnson",
    class: "X-A",
    email: "alex.j@shineedu.com",
    status: "Active",
    enrollmentDate: "2025-01-15",
    parent: {
      name: "Mr. Robert Johnson",
      phone: "+62812xxxx3456",
    },
    programs: [
      {
        id: "CRS001",
        name: "Mathematics Grade 10",
      },
      {
        id: "CRS002",
        name: "English Basic",
      },
    ],
  },
  {
    id: "STD002",
    name: "Sarah Smith",
    class: "X-A",
    email: "sarah.s@shineedu.com",
    status: "Active",
    enrollmentDate: "2025-01-15",
    parent: {
      name: "Mrs. Jane Smith",
      phone: "+62812xxxx7890",
    },
    programs: [
      {
        id: "CRS001",
        name: "Mathematics Grade 10",
      },
      {
        id: "CRS003",
        name: "Science Basic",
      },
    ],
  },
  {
    id: "STD003",
    name: "Mike Brown",
    class: "X-B",
    email: "mike.b@shineedu.com",
    status: "Inactive",
    enrollmentDate: "2025-01-20",
    parent: {
      name: "Mr. David Brown",
      phone: "+62812xxxx1234",
    },
    programs: [
      {
        id: "CRS002",
        name: "English Basic",
      },
    ],
  },
];
