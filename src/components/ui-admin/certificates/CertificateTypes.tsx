"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  certificateTypes,
  CourseType,
} from "@/data/data-admin/certificates-data/certificate-types";
import { CertificateTypeCard } from "./CertificateTypeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { EducationLevel } from "@/types/student";
import {
  GraduationCap,
  School2,
  BookOpen,
  Users,
  GanttChartSquare,
  Globe,
  LucideIcon,
} from "lucide-react";

type LevelFilter = EducationLevel | "ALL";

export function CertificateTypes() {
  // const router = useRouter();
  const [selectedType] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseType>("ENGLISH");
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>("ALL");

  const EDUCATION_LEVELS: Array<{
    id: LevelFilter;
    label: string;
    icon: LucideIcon;
  }> = [
    { id: "ALL", label: "ALL", icon: GanttChartSquare },
    { id: "TK", label: "TK", icon: School2 },
    { id: "SD", label: "SD", icon: BookOpen },
    { id: "SMP", label: "SMP", icon: Users },
    { id: "SMA/SMK", label: "SMA/SMK", icon: GraduationCap },
    { id: "UMUM", label: "UMUM", icon: Globe },
  ];

  // Filter certificates by education level and course type
  const filteredCertificates = certificateTypes.filter((type) => {
    const matchesLevel =
      selectedLevel === "ALL" || type.levels.includes(selectedLevel);
    const matchesCourse = type.courseType === selectedCourse;
    return matchesLevel && matchesCourse;
  });

  const handleCreateClick = (typeId: string) => {
    console.log("Create clicked for type:", typeId);
  };

  return (
    <div className="space-y-6">
      {/* Education Level Filter */}{" "}
      <div className="flex gap-2 mb-4">
        {EDUCATION_LEVELS.map((level) => {
          const Icon = level.icon;
          return (
            <Button
              key={level.id}
              variant={selectedLevel === level.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLevel(level.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {level.label}
            </Button>
          );
        })}
      </div>
      <Tabs
        defaultValue="ENGLISH"
        value={selectedCourse}
        onValueChange={(value) => setSelectedCourse(value as CourseType)}
        className="w-full"
      >
        {" "}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="ENGLISH"
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white hover:bg-[#DAA625]"
          >
            Bahasa Inggris
          </TabsTrigger>
          <TabsTrigger
            value="COMPUTER"
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white hover:bg-[#DAA625]"
          >
            Komputer
          </TabsTrigger>
          <TabsTrigger
            value="CODING"
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white hover:bg-[#DAA625]"
          >
            Coding
          </TabsTrigger>
        </TabsList>{" "}
        <TabsContent value="ENGLISH" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCertificates.map((type) => (
              <CertificateTypeCard
                key={type.id}
                type={type}
                onCreateClick={() => handleCreateClick(type.id)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="COMPUTER" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCertificates.map((type) => (
              <CertificateTypeCard
                key={type.id}
                type={type}
                onCreateClick={() => handleCreateClick(type.id)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="CODING" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCertificates.map((type) => (
              <CertificateTypeCard
                key={type.id}
                type={type}
                onCreateClick={() => handleCreateClick(type.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
