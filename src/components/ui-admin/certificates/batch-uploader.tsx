"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BatchUploader() {
  const [uploading, setUploading] = useState(false);
  const [template, setTemplate] = useState("");

  const onDrop = useCallback(async (_acceptedFiles: File[]) => {
    setUploading(true);
    try {
      // TODO: Implement file upload and processing
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6">
      <div>
        <Label>Certificate Template</Label>
        <Select value={template} onValueChange={setTemplate}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select a certificate template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic Certificate</SelectItem>
            <SelectItem value="advanced">Advanced Certificate</SelectItem>
            <SelectItem value="professional">
              Professional Certificate
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <Cloud className="h-10 w-10 text-muted-foreground" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <p>Drag & drop files here, or click to select files</p>
              <p className="text-sm text-muted-foreground">
                Supported formats: CSV, XLSX, XLS
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button disabled={uploading || !template}>
          {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Start Processing
        </Button>
      </div>
    </div>
  );
}
