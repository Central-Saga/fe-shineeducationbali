import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Clock, 
  MoreVertical, 
  Users, 
  BookOpen, 
  FileText
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Class {
  id: string;
  name: string;
  subject: string;
  schedule: string;
  time: string;
  studentCount: number;
  progress: number;
  status: "active" | "upcoming" | "completed";
}

interface ClassOverviewProps {
  classes: Class[];
  onViewDetails: (id: string) => void;
  onViewStudents: (id: string) => void;
  onViewMaterials: (id: string) => void;
  onViewAssignments: (id: string) => void;
}

export function ClassOverview({
  classes,
  onViewDetails,
  onViewStudents,
  onViewMaterials,
  onViewAssignments
}: ClassOverviewProps) {
  // Function to render status badge with appropriate color
  const renderStatusBadge = (status: Class["status"]) => {
    let color = "";
    
    switch (status) {
      case "active":
        color = "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
        break;
      case "upcoming":
        color = "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
        break;
      case "completed":
        color = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
        break;
    }

    return (
      <Badge className={color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classes</CardTitle>
        <CardDescription>Manage your teaching classes</CardDescription>
      </CardHeader>
      <CardContent>
        {classes.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No classes assigned</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{cls.subject}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{cls.schedule}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{cls.time}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{cls.studentCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full space-y-1">
                      <Progress value={cls.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground">{cls.progress}% completed</span>
                    </div>
                  </TableCell>
                  <TableCell>{renderStatusBadge(cls.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetails(cls.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewStudents(cls.id)}>
                          <Users className="mr-2 h-4 w-4" />
                          Students
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewMaterials(cls.id)}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Materials
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewAssignments(cls.id)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Assignments
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
