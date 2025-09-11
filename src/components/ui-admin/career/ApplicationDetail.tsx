"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  FileText,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  ArrowLeft,
  Edit,
  Trash2,
} from "lucide-react";
import { Header } from "@/components/ui-admin/layout";
import { jobApplicationsData, JobApplication } from "@/data/data-admin/career-data";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ApplicationDetailProps {
  applicationId: string;
}

export default function ApplicationDetail({ applicationId }: ApplicationDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");

  const application = jobApplicationsData.find(app => app.id === parseInt(applicationId));

  if (!application) {
    return (
      <Header
        header={{
          title: "Application Not Found",
          description: "The requested job application could not be found",
          showBackButton: true,
          backHref: "/dashboard/career/applications",
        }}
      >
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Application Not Found</h3>
          <p className="text-gray-500">The application you're looking for doesn't exist or has been removed.</p>
        </div>
      </Header>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      case "UNDER_REVIEW":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case "SHORTLISTED":
        return <Badge className="bg-green-100 text-green-800">Shortlisted</Badge>;
      case "INTERVIEWED":
        return <Badge className="bg-blue-100 text-blue-800">Interviewed</Badge>;
      case "ACCEPTED":
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4" />;
      case "UNDER_REVIEW":
        return <Clock className="h-4 w-4" />;
      case "SHORTLISTED":
        return <CheckCircle2 className="h-4 w-4" />;
      case "INTERVIEWED":
        return <Calendar className="h-4 w-4" />;
      case "ACCEPTED":
        return <CheckCircle2 className="h-4 w-4" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Header
      header={{
        title: `${application.applicant.name} - ${application.position}`,
        description: `Applied on ${new Date(application.appliedDate).toLocaleDateString()}`,
        showBackButton: true,
        backHref: "/dashboard/career/applications",
        actions: [
          {
            label: "Update Status",
            onClick: () => console.log("Update status"),
            icon: <Edit className="h-4 w-4" />,
            variant: "outline",
          },
          {
            label: "Delete Application",
            onClick: () => console.log("Delete application"),
            icon: <Trash2 className="h-4 w-4" />,
            variant: "outline",
          },
        ],
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Applicant Information</CardTitle>
                {getStatusBadge(application.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={application.applicant.avatar}
                    alt={application.applicant.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {application.applicant.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-3 text-[#C40503]" />
                      <span className="text-sm">{application.applicant.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-3 text-[#C40503]" />
                      <span className="text-sm">{application.applicant.phone}</span>
                    </div>
                    {application.applicant.address && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-3 text-[#C40503]" />
                        <span className="text-sm">{application.applicant.address}</span>
                      </div>
                    )}
                    {application.applicant.linkedin && (
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-3 text-[#C40503]" />
                        <a 
                          href={application.applicant.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-3 text-[#C40503]" />
                  <div>
                    <span className="text-sm font-medium">Position</span>
                    <p className="text-sm">{application.position}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-3 text-[#C40503]" />
                  <div>
                    <span className="text-sm font-medium">Applied Date</span>
                    <p className="text-sm">{new Date(application.appliedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-3 text-[#C40503]" />
                  <div>
                    <span className="text-sm font-medium">Experience</span>
                    <p className="text-sm">{application.experience}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-3 text-[#C40503]" />
                  <div>
                    <span className="text-sm font-medium">Education</span>
                    <p className="text-sm">{application.education}</p>
                  </div>
                </div>
                {application.expectedSalary && (
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-3 text-[#C40503]" />
                    <div>
                      <span className="text-sm font-medium">Expected Salary</span>
                      <p className="text-sm">{application.expectedSalary}</p>
                    </div>
                  </div>
                )}
                {application.availability && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-3 text-[#C40503]" />
                    <div>
                      <span className="text-sm font-medium">Availability</span>
                      <p className="text-sm">{application.availability}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          <Card>
            <CardHeader>
              <CardTitle>Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {application.coverletter}
              </p>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {application.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-3 text-[#C40503]" />
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle>Status Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Status</span>
                {getStatusBadge(application.status)}
              </div>
              <div className="space-y-2">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setStatus("SHORTLISTED")}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Shortlist
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setStatus("INTERVIEWED")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 hover:text-red-700"
                  onClick={() => setStatus("REJECTED")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-[#C40503] hover:bg-[#A30402]"
                onClick={() => console.log("Message applicant")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Applicant
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => console.log("Schedule interview")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => console.log("Download documents")}
              >
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </CardContent>
          </Card>

          {/* Interview Details */}
          {application.interviewDate && (
            <Card>
              <CardHeader>
                <CardTitle>Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-3 text-[#C40503]" />
                  <div>
                    <span className="text-sm font-medium">Interview Date</span>
                    <p className="text-sm">{new Date(application.interviewDate).toLocaleDateString()}</p>
                  </div>
                </div>
                {application.interviewNotes && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Notes</span>
                    <p className="text-sm text-gray-700 mt-1">{application.interviewNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {application.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{application.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Header>
  );
}
