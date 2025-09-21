"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Share2,
  Bookmark,
} from "lucide-react";
import { Header } from "@/components/ui-admin/layout";
import { jobVacanciesData } from "@/data/data-admin/career-data";
import { useRouter } from "next/navigation";

interface VacancyDetailProps {
  jobId: string;
}

export default function VacancyDetail({ jobId }: VacancyDetailProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const job = jobVacanciesData.find(j => j.id === parseInt(jobId));

  if (!job) {
    return (
      <Header
        header={{
          title: "Job Not Found",
          description: "The requested job vacancy could not be found",
          showBackButton: true,
          backHref: "/dashboard/career/vacancies",
        }}
      >
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Job Not Found</h3>
          <p className="text-gray-500">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </Header>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "INACTIVE":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "CLOSED":
        return <Badge className="bg-red-100 text-red-800">Closed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <Header
      header={{
        title: job.title,
        description: `${job.department} • ${job.location}`,
        showBackButton: true,
        backHref: "/dashboard/career/vacancies",
        actions: [
          {
            label: "Edit Job",
            onClick: () => console.log("Edit job"),
            icon: <Edit className="h-4 w-4" />,
            variant: "outline",
          },
          {
            label: "Delete Job",
            onClick: () => console.log("Delete job"),
            icon: <Trash2 className="h-4 w-4" />,
            variant: "outline",
          },
        ],
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Image */}
          <div className="h-64 overflow-hidden rounded-xl relative">
            <Image
              src={job.imageUrl}
              alt={job.title}
              width={800}
              height={256}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {getStatusBadge(job.status)}
              <Badge className="bg-[#C40503]">
                {job.type}
              </Badge>
            </div>
          </div>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#C40503] mr-2">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#DAA625] mr-2">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-3 text-[#C40503]" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-4 w-4 mr-3 text-[#C40503]" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-3 text-[#C40503]" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-3 text-[#C40503]" />
                <span className="font-semibold text-[#C40503]">{job.salary}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-3 text-[#C40503]" />
                <span>Posted {job.postedDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-3 text-[#C40503]" />
                <span>{job.applicants} applicants</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-[#C40503] hover:bg-[#A30402]"
                onClick={() => router.push(`/dashboard/career/vacancies/edit/${job.id}`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Job
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share Job
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-red-600 hover:text-red-700"
                onClick={() => console.log("Delete job")}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Job
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <span className="font-semibold">{job.applicants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                {getStatusBadge(job.status)}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Department</span>
                <span className="font-semibold">{job.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employment Type</span>
                <span className="font-semibold">{job.employmentType.replace('_', ' ')}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Header>
  );
}
