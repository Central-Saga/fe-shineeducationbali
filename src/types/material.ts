export interface Material {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'video' | 'image' | 'document' | 'audio' | 'presentation';
  uploadedBy: string;
  uploadDate: string;
  thumbnailUrl?: string;
  size?: string;
  duration?: string;
  isNew?: boolean;
  downloads?: number;
}

export interface SubTopic {
  id: string;
  title: string;
  materials: Material[];
  isCompleted: boolean;
}

export interface Topic {
  id: number;
  title: string;
  subtopics: SubTopic[];
  completed: number;
  totalMaterials: number;
}

export interface Subject {
  id: string;
  name: string;
  status: string;
  icon: string;
  progress: number;
  description: string;
  topics: Topic[];
  level?: string;
  category?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  instructor: string;
  instructorAvatar: string;
  subjects: Subject[];
  level: string;
  category: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  duration: string;
  startDate: string;
  endDate: string;
  materials: Material[];
  instructor: string;
  instructorAvatar: string;
  courses: Course[];
  level: string;
}

export interface Catalog {
  id: string;
  name: string;
  level: string;
  description: string;
  icon: string;
  programs: Program[];
}
