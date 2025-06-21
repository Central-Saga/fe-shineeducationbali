"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Briefcase, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterDialog } from "@/components/ui-admin/career/FilterDialog";
import Link from "next/link";

export default function JobVacanciesPage() {
  // Dummy data untuk contoh
  const jobs = [
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
      requirements: ["Native level English", "Teaching certification", "Bachelor's degree", "Min. 2 years teaching experience", "Strong communication skills"],
      imageUrl: "/images/careers/english-teacher.jpg",
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
      requirements: ["Mathematics degree", "Teaching experience", "Good communication skills", "Patient and detail-oriented", "Ability to work with different age groups"],
      imageUrl: "/images/careers/math-teacher.jpg",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Vacancies</h1>
          <p className="text-gray-500 mt-1">Find and manage available positions</p>
        </div>
        <Button className="bg-[#C40503] hover:bg-[#A30402]">
          <PlusCircle className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search job positions..."
              className="pl-10 w-full"
            />
          </div>
        </div>
        <FilterDialog />
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            {/* Card Header with Image */}
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src={job.imageUrl}
                alt={job.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 z-20 bg-[#C40503]">
                {job.type}
              </Badge>
            </div>

            {/* Card Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{job.postedDate}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">{job.applicants} applicants</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {req}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#C40503] font-semibold">{job.salary}</span>
                <Link href={`/dashboard/career/vacancies/${job.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
