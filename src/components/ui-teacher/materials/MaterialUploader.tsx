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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileUpIcon, 
  Link2Icon, 
  XCircle, 
  Upload 
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface Class {
  id: string;
  name: string;
}

interface MaterialUploaderProps {
  classes: Class[];
  onSubmit: (data: any) => void;
}

export function MaterialUploader({ classes, onSubmit }: MaterialUploaderProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [classId, setClassId] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [uploadType, setUploadType] = useState<"file" | "link">("file");
  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileArray]);
    }
  };

  // Add link to the list
  const addLink = () => {
    if (linkInput.trim() === "") return;
    
    // Basic URL validation
    try {
      new URL(linkInput);
      setLinks(prev => [...prev, linkInput]);
      setLinkInput("");
    } catch (error) {
      alert("Please enter a valid URL");
    }
  };

  // Remove file from the list
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Remove link from the list
  const removeLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !description || !classId) {
      alert("Please fill all required fields");
      return;
    }

    if (uploadType === "file" && files.length === 0) {
      alert("Please upload at least one file");
      return;
    }

    if (uploadType === "link" && links.length === 0) {
      alert("Please add at least one link");
      return;
    }

    // Prepare data for submission
    const materialData = {
      title,
      description,
      classId,
      isPublished,
      type: uploadType,
      files: uploadType === "file" ? files : [],
      links: uploadType === "link" ? links : []
    };

    onSubmit(materialData);

    // Reset form
    setTitle("");
    setDescription("");
    setClassId("");
    setIsPublished(true);
    setFiles([]);
    setLinks([]);
    setLinkInput("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Learning Material</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Material Title</Label>
            <Input
              id="title"
              placeholder="Enter material title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select value={classId} onValueChange={setClassId} required>
              <SelectTrigger id="class">
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the learning material"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="published" 
              checked={isPublished} 
              onCheckedChange={(checked) => setIsPublished(checked as boolean)} 
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <Tabs defaultValue="file" value={uploadType} onValueChange={(value) => setUploadType(value as "file" | "link")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">Upload Files</TabsTrigger>
              <TabsTrigger value="link">Add Links</TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="material-files">Upload Files</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="material-files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Files</Label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div 
                        key={`${file.name}-${index}`} 
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <div className="flex items-center">
                          <FileUpIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFile(index)}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="link" className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="material-link">Add Link</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="material-link"
                    type="url"
                    placeholder="https://example.com/resource"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addLink}>
                    Add
                  </Button>
                </div>
              </div>

              {links.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Links</Label>
                  <div className="space-y-2">
                    {links.map((link, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <div className="flex items-center">
                          <Link2Icon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm truncate max-w-[250px]">{link}</span>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeLink(index)}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            <Upload className="mr-2 h-4 w-4" />
            Upload Material
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
