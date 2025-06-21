"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  User, 
  Briefcase, 
  GraduationCap, 
  Calendar,
  FileText,
  MapPin,
  Clock
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  // Dummy data - In real app, fetch based on resolvedParams.id
  const application = {
    id: resolvedParams.id,
    applicant: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+62 812-3456-7890",
      avatar: "/images/avatars/sarah.jpg",
      location: "Bali, Indonesia",
      linkedin: "linkedin.com/in/sarahjohnson",
      website: "sarahjohnson.com"
    },
    position: "English Teacher",
    appliedDate: "2023-06-18",
    status: "Under Review",
    experience: "3 years",
    education: "Master's in Education",
    salary: "IDR 5-8 million",
    expectedSalary: "IDR 7-10 million",
    noticePeriod: "1 month",
    coverletter: `Dear Hiring Manager,

I am writing to express my strong interest in the English Teacher position at Shine Education. With my Master's degree in Education and three years of experience teaching English at various levels, I believe I would be a valuable addition to your team.

Throughout my career, I have demonstrated my ability to create engaging lesson plans and adapt my teaching methods to accommodate different learning styles. I am particularly proud of my track record in improving student performance and maintaining high student satisfaction rates.

I am excited about the opportunity to contribute to Shine Education's mission of providing quality education. Thank you for considering my application.

Best regards,
Sarah Johnson`,
    workHistory: [
      {
        position: "Senior English Teacher",
        company: "Global Language School",
        duration: "2021 - Present",
        responsibilities: [
          "Developed and implemented innovative teaching methods",
          "Conducted advanced English classes for 100+ students",
          "Achieved 95% student satisfaction rate"
        ]
      },
      {
        position: "English Language Instructor",
        company: "International Education Center",
        duration: "2019 - 2021",
        responsibilities: [
          "Taught business English to corporate clients",
          "Created customized learning materials",
          "Conducted regular progress assessments"
        ]
      }
    ],
    documents: [
      { name: "Resume.pdf", size: "2.4 MB" },
      { name: "Cover_Letter.pdf", size: "1.1 MB" },
      { name: "Teaching_Certificate.pdf", size: "3.2 MB" }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link href="/dashboard/career/applications" className="inline-flex items-center text-[#C40503] hover:text-[#A30402] mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Applications
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Section */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 rounded-full overflow-hidden">
                <img
                  src={application.applicant.avatar}
                  alt={application.applicant.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {application.applicant.name}
                    </h1>
                    <p className="text-gray-500">{application.position}</p>
                  </div>
                  <Badge className={
                    application.status === "Shortlisted"
                      ? "bg-green-100 text-green-800"
                      : application.status === "Under Review"
                      ? "bg-[#C40503] text-white"
                      : "bg-red-100 text-red-800"
                  }>
                    {application.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{application.applicant.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{application.applicant.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{application.applicant.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Applied {application.appliedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Work History */}
          <section className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Work History</h2>
            <div className="space-y-6">
              {application.workHistory.map((work, index) => (
                <div key={index} className="border-l-2 border-[#C40503] pl-4">
                  <h3 className="font-semibold">{work.position}</h3>
                  <p className="text-gray-500">{work.company} • {work.duration}</p>
                  <ul className="mt-2 space-y-1">
                    {work.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-gray-600 text-sm">• {resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Cover Letter */}
          <section className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Cover Letter</h2>
            <div className="prose max-w-none">
              {application.coverletter.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-100 sticky top-6 space-y-6">
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-[#C40503] hover:bg-[#A30402]">
                Schedule Interview
              </Button>
              <Button variant="outline" className="w-full">
                Send Message
              </Button>
              <Button variant="outline" className="w-full">
                Reject Application
              </Button>
            </div>

            {/* Documents */}
            <div>
              <h3 className="font-semibold mb-3">Documents</h3>
              <div className="space-y-2">
                {application.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-[#C40503]" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{doc.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-4 w-4 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{application.experience}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <GraduationCap className="h-4 w-4 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="font-medium">{application.education}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Notice Period</p>
                  <p className="font-medium">{application.noticePeriod}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
