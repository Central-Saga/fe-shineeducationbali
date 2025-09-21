"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Users,
  BriefcaseIcon,
  DollarSign,
} from "lucide-react";

interface JobDetailsDialogProps {
  job: {
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
  };
}

export function JobDetailsDialog({ job }: JobDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="h-48 overflow-hidden relative -mx-6 -mt-6">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Image
              src={job.imageUrl}
              alt={job.title}
              width={800}
              height={192}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 z-20 bg-[#C40503]">
              {job.type}
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-bold mt-4">
            {job.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <div className="space-y-4 md:col-span-2">
            <div>
              <h3 className="font-semibold text-lg mb-2">Job Description</h3>
              <p className="text-gray-600">{job.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Competitive salary package</li>
                <li>Health insurance coverage</li>
                <li>Professional development opportunities</li>
                <li>Work-life balance</li>
                <li>Collaborative work environment</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>Posted {job.postedDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>{job.applicants} applicants</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button className="w-full bg-[#C40503] hover:bg-[#A30402]">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
