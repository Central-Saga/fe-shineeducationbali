export interface JobVacancy {
  id: number;
  title: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  postedDate: string;
  applicants: number;
  description: string;
  requirements: string[];
  imageUrl: string;
  status: "ACTIVE" | "INACTIVE" | "CLOSED";
  department: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  benefits: string[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: number;
  applicant: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    address?: string;
    linkedin?: string;
  };
  position: string;
  jobId: number;
  appliedDate: string;
  status: "PENDING" | "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED";
  experience: string;
  education: string;
  coverletter: string;
  documents: string[];
  expectedSalary?: string;
  availability?: string;
  notes?: string;
  interviewDate?: string;
  interviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export const jobVacanciesData: JobVacancy[] = [
  {
    id: 1,
    title: "English Teacher",
    location: "Bali, Indonesia",
    type: "Full Time",
    experience: "2-3 years",
    salary: "IDR 5-8 million",
    postedDate: "2 days ago",
    applicants: 12,
    description: "We are looking for an experienced English teacher to join our growing team. The ideal candidate will have a passion for teaching and be able to create engaging lesson plans that help students improve their English language skills. Experience with both group and individual instruction is required.",
    requirements: [
      "Native level English",
      "Teaching certification",
      "Bachelor's degree",
      "Min. 2 years teaching experience",
      "Strong communication skills",
    ],
    imageUrl: "/images/careers/english-teacher.jpg",
    status: "ACTIVE",
    department: "Education",
    employmentType: "FULL_TIME",
    benefits: [
      "Health insurance",
      "Professional development",
      "Flexible schedule",
      "Performance bonus"
    ],
    skills: ["Teaching", "Communication", "Lesson Planning", "Classroom Management"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Mathematics Instructor",
    location: "Jakarta, Indonesia",
    type: "Part Time",
    experience: "1-2 years",
    salary: "IDR 4-6 million",
    postedDate: "1 week ago",
    applicants: 8,
    description: "Join us in shaping young minds through mathematics education. We're seeking a passionate Mathematics Instructor who can make complex concepts easy to understand. The role involves teaching various levels of mathematics and preparing students for academic excellence.",
    requirements: [
      "Mathematics degree",
      "Teaching experience",
      "Good communication skills",
      "Patient and detail-oriented",
      "Ability to work with different age groups",
    ],
    imageUrl: "/images/careers/math-teacher.jpg",
    status: "ACTIVE",
    department: "Education",
    employmentType: "PART_TIME",
    benefits: [
      "Flexible hours",
      "Professional development",
      "Work from home option"
    ],
    skills: ["Mathematics", "Teaching", "Problem Solving", "Student Assessment"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10"
  },
  {
    id: 3,
    title: "Science Teacher",
    location: "Surabaya, Indonesia",
    type: "Full Time",
    experience: "3-5 years",
    salary: "IDR 6-10 million",
    postedDate: "3 days ago",
    applicants: 15,
    description: "We are seeking a dedicated Science Teacher to inspire students in the field of science. The ideal candidate will have a strong background in science education and be able to conduct engaging laboratory experiments.",
    requirements: [
      "Science degree (Biology, Chemistry, or Physics)",
      "Teaching certification",
      "Min. 3 years teaching experience",
      "Laboratory experience",
      "Strong analytical skills",
    ],
    imageUrl: "/images/careers/science-teacher.jpg",
    status: "ACTIVE",
    department: "Education",
    employmentType: "FULL_TIME",
    benefits: [
      "Health insurance",
      "Professional development",
      "Laboratory equipment access",
      "Research opportunities"
    ],
    skills: ["Science", "Laboratory Work", "Teaching", "Research"],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12"
  },
  {
    id: 4,
    title: "Computer Science Instructor",
    location: "Bandung, Indonesia",
    type: "Contract",
    experience: "2-4 years",
    salary: "IDR 7-12 million",
    postedDate: "5 days ago",
    applicants: 20,
    description: "Join our technology team as a Computer Science Instructor. You will teach programming, software development, and computer science concepts to students of various levels.",
    requirements: [
      "Computer Science degree",
      "Programming experience",
      "Teaching experience preferred",
      "Knowledge of multiple programming languages",
      "Strong problem-solving skills",
    ],
    imageUrl: "/images/careers/cs-teacher.jpg",
    status: "ACTIVE",
    department: "Technology",
    employmentType: "CONTRACT",
    benefits: [
      "Competitive salary",
      "Latest technology access",
      "Professional development",
      "Remote work option"
    ],
    skills: ["Programming", "Computer Science", "Teaching", "Software Development"],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08"
  }
];

export const jobApplicationsData: JobApplication[] = [
  {
    id: 1,
    applicant: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+62 812-3456-7890",
      avatar: "/images/avatars/sarah.jpg",
      address: "Jl. Sudirman No. 123, Jakarta",
      linkedin: "linkedin.com/in/sarahjohnson"
    },
    position: "English Teacher",
    jobId: 1,
    appliedDate: "2023-06-18",
    status: "UNDER_REVIEW",
    experience: "3 years",
    education: "Master's in Education",
    coverletter: "I am writing to express my strong interest in the English Teacher position at SHINE Education. With my 3 years of teaching experience and Master's degree in Education, I am confident that I can contribute significantly to your team and help students achieve their language learning goals.",
    documents: ["Resume.pdf", "Certificate.pdf", "Portfolio.pdf"],
    expectedSalary: "IDR 6 million",
    availability: "Immediately",
    notes: "Strong candidate with excellent communication skills",
    createdAt: "2023-06-18",
    updatedAt: "2023-06-20"
  },
  {
    id: 2,
    applicant: {
      name: "Michael Chen",
      email: "michael.c@email.com",
      phone: "+62 812-9876-5432",
      avatar: "/images/avatars/michael.jpg",
      address: "Jl. Thamrin No. 456, Jakarta",
      linkedin: "linkedin.com/in/michaelchen"
    },
    position: "Mathematics Instructor",
    jobId: 2,
    appliedDate: "2023-06-15",
    status: "SHORTLISTED",
    experience: "5 years",
    education: "Ph.D. in Mathematics",
    coverletter: "With my strong background in mathematics education and research, I am excited about the opportunity to join SHINE Education as a Mathematics Instructor. My Ph.D. in Mathematics and 5 years of teaching experience make me an ideal candidate for this position.",
    documents: ["Resume.pdf", "Publications.pdf", "References.pdf"],
    expectedSalary: "IDR 5.5 million",
    availability: "2 weeks notice",
    notes: "Excellent academic background, shortlisted for interview",
    interviewDate: "2023-06-25",
    interviewNotes: "Scheduled for technical interview",
    createdAt: "2023-06-15",
    updatedAt: "2023-06-22"
  },
  {
    id: 3,
    applicant: {
      name: "Lisa Wang",
      email: "lisa.w@email.com",
      phone: "+62 813-1234-5678",
      avatar: "/images/avatars/lisa.jpg",
      address: "Jl. Gatot Subroto No. 789, Jakarta",
      linkedin: "linkedin.com/in/lisawang"
    },
    position: "Science Teacher",
    jobId: 3,
    appliedDate: "2023-06-20",
    status: "PENDING",
    experience: "2 years",
    education: "Bachelor's in Biology",
    coverletter: "I am very interested in the Science Teacher position at SHINE Education. My background in Biology and 2 years of teaching experience have prepared me well for this role. I am passionate about making science accessible and engaging for students.",
    documents: ["Resume.pdf", "Degree_Certificate.pdf"],
    expectedSalary: "IDR 7 million",
    availability: "1 month notice",
    notes: "New application, pending initial review",
    createdAt: "2023-06-20",
    updatedAt: "2023-06-20"
  },
  {
    id: 4,
    applicant: {
      name: "David Kumar",
      email: "david.k@email.com",
      phone: "+62 814-5678-9012",
      avatar: "/images/avatars/david.jpg",
      address: "Jl. Rasuna Said No. 321, Jakarta",
      linkedin: "linkedin.com/in/davidkumar"
    },
    position: "Computer Science Instructor",
    jobId: 4,
    appliedDate: "2023-06-22",
    status: "INTERVIEWED",
    experience: "4 years",
    education: "Master's in Computer Science",
    coverletter: "I am excited to apply for the Computer Science Instructor position. With my Master's degree in Computer Science and 4 years of industry experience, I bring both theoretical knowledge and practical skills to the classroom.",
    documents: ["Resume.pdf", "Portfolio.pdf", "Certifications.pdf"],
    expectedSalary: "IDR 9 million",
    availability: "Immediately",
    notes: "Interviewed, strong technical skills",
    interviewDate: "2023-06-28",
    interviewNotes: "Technical interview completed, good performance",
    createdAt: "2023-06-22",
    updatedAt: "2023-06-30"
  }
];
