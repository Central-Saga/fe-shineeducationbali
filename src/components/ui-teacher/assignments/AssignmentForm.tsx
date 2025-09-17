import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AssignmentFormProps {
  onSubmit: (data: any) => void;
  classes?: { id: string; name: string }[];
  initialData?: any;
}

export function AssignmentForm({ onSubmit, classes = [], initialData }: AssignmentFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [classId, setClassId] = useState(initialData?.classId || "");
  const [dueDate, setDueDate] = useState<Date | undefined>(initialData?.dueDate ? new Date(initialData.dueDate) : undefined);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !description || !classId || !dueDate) {
      alert("Please fill all required fields");
      return;
    }

    // Prepare data for submission
    const formData = {
      title,
      description,
      classId,
      dueDate,
      file
    };

    onSubmit(formData);

    // Reset form if not editing
    if (!initialData) {
      setTitle("");
      setDescription("");
      setClassId("");
      setDueDate(undefined);
      setFile(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Assignment" : "Create New Assignment"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Assignment Title</Label>
            <Input
              id="title"
              placeholder="Enter assignment title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select value={classId} onValueChange={setClassId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Assignment Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the assignment details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Assignment File (Optional)</Label>
            <Input
              id="file"
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setFile(files[0]);
                }
              }}
            />
            {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Assignment" : "Create Assignment"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
