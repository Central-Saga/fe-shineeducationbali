"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  Clock4,
  User,
  Briefcase,
  Mail,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function JobApplicationsPage() {
  // Dummy data untuk contoh
  const applications = [
    {
      id: 1,
      applicant: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+62 812-3456-7890",
        avatar: "/images/avatars/sarah.jpg",
      },
      position: "English Teacher",
      appliedDate: "2023-06-18",
      status: "Under Review",
      experience: "3 years",
      education: "Master's in Education",
      coverletter:
        "I am writing to express my strong interest in the English Teacher position...",
      documents: ["Resume.pdf", "Certificate.pdf"],
    },
    {
      id: 2,
      applicant: {
        name: "Michael Chen",
        email: "michael.c@email.com",
        phone: "+62 812-9876-5432",
        avatar: "/images/avatars/michael.jpg",
      },
      position: "Mathematics Instructor",
      appliedDate: "2023-06-15",
      status: "Shortlisted",
      experience: "5 years",
      education: "Ph.D. in Mathematics",
      coverletter:
        "With my strong background in mathematics education and research...",
      documents: ["Resume.pdf", "Publications.pdf"],
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-500 mt-1">
            Manage and track job applications
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search applications..."
              className="pl-10 w-full"
            />
          </div>
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Status Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="review">Under Review</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={application.applicant.avatar}
                    alt={application.applicant.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {application.applicant.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {application.position}
                  </p>
                </div>
              </div>
              <Badge
                className={
                  application.status === "Shortlisted"
                    ? "bg-green-100 text-green-800"
                    : application.status === "Under Review"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {application.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{application.applicant.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">{application.applicant.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-4 w-4 mr-2" />
                <span className="text-sm">{application.experience}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  Applied {application.appliedDate}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
              <div className="flex gap-2">
                {application.documents.map((doc, index) => (
                  <Button key={index} variant="outline" size="sm">
                    {doc}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm">
                Message
              </Button>
              <Button variant="outline" size="sm">
                Schedule Interview
              </Button>{" "}
              <Link href={`/dashboard/career/applications/${application.id}`}>
                <Button className="bg-[#C40503] hover:bg-[#A30402]" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
