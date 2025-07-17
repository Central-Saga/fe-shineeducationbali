"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ClipboardCheck, GraduationCap, ArrowRight, Award } from "lucide-react";

interface Assignment {
  title: string;
  dueIn: string;
}

interface Grade {
  subject: string;
  score: number;
  date: string;
}

interface AssignmentsAndGradesProps {
  assignments: Assignment[];
  grades: Grade[];
}

export function AssignmentsAndGrades({
  assignments,
  grades,
}: AssignmentsAndGradesProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-1">
      <Card className="p-6 bg-white shadow-md rounded-xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-[#C40503]" />
            <h2 className="text-xl font-semibold text-gray-800">
              Tugas Mendatang
            </h2>
          </div>
          
          <motion.button
            whileHover={{ x: 5 }}
            className="text-sm text-[#C40503] flex items-center"
          >
            Lihat Semua <ArrowRight className="h-4 w-4 ml-1" />
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, x: 5 }}
              className="p-4 rounded-lg border border-[#C40503]/10 bg-[#C40503]/5 hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-medium text-gray-800">{assignment.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm bg-white px-3 py-1 rounded-full text-[#C40503] font-medium shadow-sm">
                  {assignment.dueIn}
                </span>
                <button className="text-xs text-[#DAA625] font-medium">
                  Kerjakan Sekarang
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-md rounded-xl border border-gray-100 mt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[#DAA625]" />
            <h2 className="text-xl font-semibold text-gray-800">
              Nilai Terbaru
            </h2>
          </div>
          
          <motion.button
            whileHover={{ x: 5 }}
            className="text-sm text-[#DAA625] flex items-center"
          >
            Lihat Semua <ArrowRight className="h-4 w-4 ml-1" />
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {grades.map((grade, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, x: 5 }}
              className="p-4 rounded-lg border border-[#DAA625]/10 bg-[#DAA625]/5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{grade.subject}</h3>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-[#DAA625]" />
                  <span className="text-lg font-bold text-[#DAA625]">
                    {grade.score}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">{grade.date}</p>
                {grade.score >= 85 && (
                  <span className="text-xs bg-white px-2 py-1 rounded-full text-[#C40503] font-medium shadow-sm">
                    Sangat Baik
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
