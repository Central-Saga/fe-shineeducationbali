"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit2, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Users as UsersIcon,
  CalendarCheck,
  BookOpen,
  BookOpenCheck,
  Award
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { classesData } from "@/data/data-teacher/classes/classes-data";

export default function ClassList() {
  return (
    <div className="space-y-8">
      {/* Page Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#C40503]/10 to-[#C40503]/5 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Total Classes</p>
              <p className="text-3xl font-bold text-[#C40503]">{classesData.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#DAA625]/10 to-[#DAA625]/5 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Active Classes</p>
              <p className="text-3xl font-bold text-[#DAA625]">
                {classesData.filter(c => c.status === "active").length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-3xl font-bold text-purple-700">
                {classesData.reduce((sum, c) => sum + c.studentCount, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Subjects Taught</p>
              <p className="text-3xl font-bold text-blue-700">
                {new Set(classesData.map(c => c.subject)).size}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#C40503]/5 to-[#DAA625]/5 border-b">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Class List
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search classes..."
                className="pl-10 h-10 w-64 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm transition-colors focus:border-[#DAA625] focus:outline-none focus:ring-1 focus:ring-[#DAA625]"
              />
            </div>
            <Button className="bg-gradient-to-r from-[#C40503] to-[#DAA625] hover:from-[#A60000] hover:to-[#C09015] rounded-full shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Create New Class
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium text-gray-700">Class Name</TableHead>
                <TableHead className="font-medium text-gray-700">Subject</TableHead>
                <TableHead className="font-medium text-gray-700">Schedule</TableHead>
                <TableHead className="font-medium text-gray-700">Students</TableHead>
                <TableHead className="font-medium text-gray-700">Status</TableHead>
                <TableHead className="font-medium text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classesData.map((classItem, index) => (
                <TableRow 
                  key={classItem.id}
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#C40503]/10 to-[#DAA625]/10 flex items-center justify-center mr-3 text-[#C40503] font-semibold">
                        {classItem.name.substring(0, 2)}
                      </div>
                      <span>{classItem.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{classItem.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#DAA625] mr-2"></div>
                      {classItem.schedule}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-md text-xs font-medium">
                        {classItem.studentCount} students
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        classItem.status === "active"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {classItem.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/dashboard-teacher/classes/${classItem.id}`}>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8 rounded-full border-[#C40503]/20 text-[#C40503] hover:bg-[#C40503]/5 hover:text-[#C40503] transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View class details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-8 w-8 rounded-full border-gray-200 text-gray-700 hover:bg-gray-50"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit class</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/dashboard-teacher/students?class=${classItem.id}`}>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8 rounded-full border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                <UsersIcon className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View students</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/dashboard-teacher/materials?class=${classItem.id}`}>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8 rounded-full border-purple-200 text-purple-600 hover:bg-purple-50"
                              >
                                <BookOpenCheck className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Class materials</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-900">1</span> to{" "}
          <span className="font-medium text-gray-900">{classesData.length}</span> of{" "}
          <span className="font-medium text-gray-900">{classesData.length}</span> classes
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="rounded-full px-3 bg-[#C40503]/5 text-[#C40503] border-[#C40503]/20">
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
