"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Users,
  BriefcaseIcon,
  GraduationCap,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function JobVacancyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  // Dummy data - In real app, fetch based on resolvedParams.id
  const job = {
    id: resolvedParams.id,
    title: "English Teacher",
    location: "Bali, Indonesia",
    type: "Full Time",
    experience: "2-3 years",
    salary: "IDR 5-8 million",
    postedDate: "2 days ago",
    applicants: 12,
    description:
      "We are looking for an experienced English teacher to join our growing team. The ideal candidate will have a passion for teaching and be able to create engaging lesson plans that help students improve their English language skills.",
    fullDescription: [
      "As an English Teacher at Shine Education, you will be responsible for:",
      "• Creating and delivering engaging English lessons for students of various levels",
      "• Developing curriculum and learning materials",
      "• Assessing student progress and maintaining accurate records",
      "• Providing regular feedback to students and parents",
      "• Participating in school events and teacher development programs",
    ],
    requirements: [
      "Native level English proficiency",
      "Bachelor's degree in Education or related field",
      "Valid teaching certification",
      "Minimum 2 years of teaching experience",
      "Strong communication and interpersonal skills",
      "Experience with modern teaching methodologies",
    ],
    benefits: [
      "Competitive salary package",
      "Health insurance coverage",
      "Annual performance bonus",
      "Professional development opportunities",
      "Work-life balance",
      "Modern teaching facilities",
    ],
    imageUrl: "/images/careers/english-teacher.jpg",
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link
        href="/dashboard/career/vacancies"
        className="inline-flex items-center text-[#C40503] hover:text-[#A30402] mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Vacancies
      </Link>

      {/* Header Section */}
      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={job.imageUrl}
          alt={job.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 z-20 text-white">
          <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
          <div className="flex items-center gap-4">
            <Badge className="bg-[#C40503]">{job.type}</Badge>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">About the Position</h2>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <div className="space-y-2">
              {job.fullDescription.map((desc, index) => (
                <p key={index} className="text-gray-600">
                  {desc}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-600">
                  {req}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
            <ul className="list-disc list-inside space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-600">
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Salary Range</p>
                  <p className="font-semibold">{job.salary}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <BriefcaseIcon className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold">{job.experience}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-semibold">{job.postedDate}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Applications</p>
                  <p className="font-semibold">{job.applicants} candidates</p>
                </div>
              </div>

              <Button className="w-full bg-[#C40503] hover:bg-[#A30402] mt-4">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
