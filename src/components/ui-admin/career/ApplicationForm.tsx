"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/ui-admin/layout";
import { JobApplication, jobVacanciesData } from "@/data/data-admin/career-data";
import {
  Save,
  ArrowLeft,
  Upload,
  FileText,
  Plus,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ApplicationFormProps {
  applicationId?: string;
  isEdit?: boolean;
}

export default function ApplicationForm({ applicationId, isEdit = false }: ApplicationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    applicant: {
      name: "",
      email: "",
      phone: "",
      avatar: "/images/avatars/default-avatar.jpg",
      address: "",
      linkedin: "",
    },
    position: "",
    jobId: 0,
    appliedDate: new Date().toISOString().split('T')[0],
    status: "PENDING",
    experience: "",
    education: "",
    coverletter: "",
    documents: [],
    expectedSalary: "",
    availability: "",
    notes: "",
  });

  const [newDocument, setNewDocument] = useState("");
  const [loading, setLoading] = useState(false);

  // Load data for edit mode
  useEffect(() => {
    if (isEdit && applicationId) {
      // In real app, fetch application data by ID
      // For now, we'll use dummy data
      const dummyApplication: JobApplication = {
        id: parseInt(applicationId),
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
        coverletter: "I am writing to express my strong interest in the English Teacher position...",
        documents: ["Resume.pdf", "Certificate.pdf"],
        expectedSalary: "IDR 6 million",
        availability: "Immediately",
        notes: "Strong candidate with excellent communication skills",
        createdAt: "2023-06-18",
        updatedAt: "2023-06-20"
      };
      setFormData(dummyApplication);
    }
  }, [isEdit, applicationId]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    if (field.startsWith('applicant.')) {
      const applicantField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        applicant: {
          ...prev.applicant!,
          [applicantField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData(prev => ({
        ...prev,
        documents: [...(prev.documents || []), newDocument.trim()]
      }));
      setNewDocument("");
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In real app, submit to API
      console.log("Submitting application data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to applications page
      router.push("/dashboard/career/applications");
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Header
      header={{
        title: isEdit ? "Edit Application" : "Create New Application",
        description: isEdit ? "Update application information" : "Fill in the details to create a new application",
        showBackButton: true,
        backHref: "/dashboard/career/applications",
        actions: [
          {
            label: isEdit ? "Update Application" : "Create Application",
            onClick: () => {
              const form = document.getElementById("application-form") as HTMLFormElement;
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            },
            icon: <Save className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <form id="application-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Applicant Information */}
            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.applicant?.name || ""}
                      onChange={(e) => handleInputChange("applicant.name", e.target.value)}
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.applicant?.email || ""}
                      onChange={(e) => handleInputChange("applicant.email", e.target.value)}
                      placeholder="e.g., john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.applicant?.phone || ""}
                      onChange={(e) => handleInputChange("applicant.phone", e.target.value)}
                      placeholder="e.g., +62 812-3456-7890"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      value={formData.applicant?.linkedin || ""}
                      onChange={(e) => handleInputChange("applicant.linkedin", e.target.value)}
                      placeholder="e.g., linkedin.com/in/johndoe"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.applicant?.address || ""}
                    onChange={(e) => handleInputChange("applicant.address", e.target.value)}
                    placeholder="Enter full address..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Position Applied For *</Label>
                    <Input
                      id="position"
                      value={formData.position || ""}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      placeholder="e.g., English Teacher"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobId">Job ID</Label>
                    <Select
                      value={formData.jobId?.toString() || ""}
                      onValueChange={(value) => handleInputChange("jobId", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobVacanciesData.map((job) => (
                          <SelectItem key={job.id} value={job.id.toString()}>
                            {job.title} - {job.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      value={formData.experience || ""}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="e.g., 3 years"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Education Level *</Label>
                    <Input
                      id="education"
                      value={formData.education || ""}
                      onChange={(e) => handleInputChange("education", e.target.value)}
                      placeholder="e.g., Master's in Education"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedSalary">Expected Salary</Label>
                    <Input
                      id="expectedSalary"
                      value={formData.expectedSalary || ""}
                      onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                      placeholder="e.g., IDR 6 million"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      value={formData.availability || ""}
                      onChange={(e) => handleInputChange("availability", e.target.value)}
                      placeholder="e.g., Immediately, 2 weeks notice"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="appliedDate">Applied Date *</Label>
                  <Input
                    id="appliedDate"
                    type="date"
                    value={formData.appliedDate || ""}
                    onChange={(e) => handleInputChange("appliedDate", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cover Letter */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.coverletter || ""}
                  onChange={(e) => handleInputChange("coverletter", e.target.value)}
                  placeholder="Write the cover letter here..."
                  rows={6}
                />
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Add a document name..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDocument())}
                  />
                  <Button type="button" onClick={addDocument}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.documents?.map((doc, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {doc}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeDocument(index)}
                      />
                    </Badge>
                  ))}
                </div>
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Application Status */}
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <Select
                      value={formData.status || "PENDING"}
                      onValueChange={(value) => handleInputChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                        <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                        <SelectItem value="INTERVIEWED">Interviewed</SelectItem>
                        <SelectItem value="ACCEPTED">Accepted</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Add any notes about this application..."
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Form Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-[#C40503] hover:bg-[#A30402]"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : (isEdit ? "Update Application" : "Create Application")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/dashboard/career/applications")}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Header>
  );
}
