"use client";

import { useState } from "react";
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
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  FileText,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/ui-admin/layout";
import { jobApplicationsData, JobApplication } from "@/data/data-admin/career-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Applications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter data
  const filteredApplications = jobApplicationsData.filter((application) => {
    const matchesSearch = 
      application.applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.applicant.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    
    let matchesTab = true;
    if (activeTab === "review") matchesTab = application.status === "UNDER_REVIEW";
    else if (activeTab === "shortlisted") matchesTab = application.status === "SHORTLISTED";
    else if (activeTab === "rejected") matchesTab = application.status === "REJECTED";
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  // Statistics
  const totalApplications = jobApplicationsData.length;
  const pendingApplications = jobApplicationsData.filter(app => app.status === "PENDING").length;
  const underReviewApplications = jobApplicationsData.filter(app => app.status === "UNDER_REVIEW").length;
  const shortlistedApplications = jobApplicationsData.filter(app => app.status === "SHORTLISTED").length;
  const rejectedApplications = jobApplicationsData.filter(app => app.status === "REJECTED").length;

  const statsData = [
    {
      title: "Total Applications",
      value: totalApplications,
      description: "Applications received",
      icon: FileText,
      color: "red" as const,
      bgColor: "bg-red-50",
      textColor: "text-[#C40503]"
    },
    {
      title: "Under Review",
      value: underReviewApplications,
      description: "Currently being reviewed",
      icon: Clock4,
      color: "amber" as const,
      bgColor: "bg-amber-50",
      textColor: "text-[#DAA625]"
    },
    {
      title: "Shortlisted",
      value: shortlistedApplications,
      description: "Selected for interview",
      icon: CheckCircle2,
      color: "blue" as const,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Rejected",
      value: rejectedApplications,
      description: "Not selected",
      icon: XCircle,
      color: "purple" as const,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

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
        return <Clock4 className="h-4 w-4" />;
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
        title: "Job Applications",
        description: "Manage and track job applications",
        actions: [
          {
            label: "Add Application",
            href: "/dashboard/career/applications/create",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
          },
          {
            label: "Export Data",
            onClick: () => console.log("Export applications"),
            icon: <FileText className="h-4 w-4" />,
            variant: "outline",
          },
        ],
      }}
    >
      <div className="space-y-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search applications..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                <SelectItem value="INTERVIEWED">Interviewed</SelectItem>
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Status Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="review">Under Review</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between mb-6">
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
                <div className="flex items-center gap-2">
                  {getStatusIcon(application.status)}
                  {getStatusBadge(application.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm truncate">{application.applicant.email}</span>
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
                    Applied {new Date(application.appliedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                <div className="flex gap-2 flex-wrap">
                  {application.documents.map((doc, index) => (
                    <Button key={index} variant="outline" size="sm">
                      {doc}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
                <Link href={`/dashboard/career/applications/${application.id}`}>
                  <Button className="bg-[#C40503] hover:bg-[#A30402]" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No applications found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Header>
  );
}
