"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { 
  FileText, Download, Search, Presentation, Video, BookOpen, File, 
  ChevronDown, ChevronUp 
} from 'lucide-react';
import { ClassMaterial } from '@/data/data-student/class-detail-data';

interface ClassMaterialsProps {
  materials: ClassMaterial[];
  classId?: string;
}

export function ClassMaterials({ materials }: ClassMaterialsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'presentation':
        return <Presentation className="h-5 w-5 text-orange-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'exercise':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const documentMaterials = materials.filter(material => material.type === 'document');
  const presentationMaterials = materials.filter(material => material.type === 'presentation');
  const videoMaterials = materials.filter(material => material.type === 'video');
  const exerciseMaterials = materials.filter(material => material.type === 'exercise');
  // const otherMaterials = materials.filter(material => material.type === 'other');

  const filteredMaterials = materials.filter(material => 
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#C40503]" />
          Materi Pembelajaran
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Cari materi..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="document">Dokumen</TabsTrigger>
            <TabsTrigger value="presentation">Presentasi</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="exercise">Latihan</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredMaterials.length > 0 ? (
              <div className="space-y-3">
                {filteredMaterials.map((material) => (
                  <MaterialItem 
                    key={material.id}
                    material={material}
                    isExpanded={expandedItem === material.id}
                    onToggle={() => toggleExpand(material.id)}
                    getFileIcon={getFileIcon}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada materi yang ditemukan</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="document">
            {documentMaterials.length > 0 ? (
              <div className="space-y-3">
                {documentMaterials
                  .filter(material => 
                    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    material.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((material) => (
                    <MaterialItem 
                      key={material.id}
                      material={material}
                      isExpanded={expandedItem === material.id}
                      onToggle={() => toggleExpand(material.id)}
                      getFileIcon={getFileIcon}
                      formatDate={formatDate}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada dokumen yang ditemukan</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="presentation">
            {presentationMaterials.length > 0 ? (
              <div className="space-y-3">
                {presentationMaterials
                  .filter(material => 
                    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    material.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((material) => (
                    <MaterialItem 
                      key={material.id}
                      material={material}
                      isExpanded={expandedItem === material.id}
                      onToggle={() => toggleExpand(material.id)}
                      getFileIcon={getFileIcon}
                      formatDate={formatDate}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada presentasi yang ditemukan</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="video">
            {videoMaterials.length > 0 ? (
              <div className="space-y-3">
                {videoMaterials
                  .filter(material => 
                    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    material.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((material) => (
                    <MaterialItem 
                      key={material.id}
                      material={material}
                      isExpanded={expandedItem === material.id}
                      onToggle={() => toggleExpand(material.id)}
                      getFileIcon={getFileIcon}
                      formatDate={formatDate}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada video yang ditemukan</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="exercise">
            {exerciseMaterials.length > 0 ? (
              <div className="space-y-3">
                {exerciseMaterials
                  .filter(material => 
                    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    material.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((material) => (
                    <MaterialItem 
                      key={material.id}
                      material={material}
                      isExpanded={expandedItem === material.id}
                      onToggle={() => toggleExpand(material.id)}
                      getFileIcon={getFileIcon}
                      formatDate={formatDate}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada latihan yang ditemukan</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface MaterialItemProps {
  material: ClassMaterial;
  isExpanded: boolean;
  onToggle: () => void;
  getFileIcon: (type: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
}

function MaterialItem({ material, isExpanded, onToggle, getFileIcon, formatDate }: MaterialItemProps) {
  return (
    <div 
      className={`border rounded-lg transition-all ${isExpanded ? 'border-[#C40503]/50' : 'border-gray-200'}`}
    >
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          {getFileIcon(material.type)}
          <div>
            <h4 className="font-medium text-gray-800">{material.title}</h4>
            <p className="text-sm text-gray-500">
              Diupload: {formatDate(material.uploadDate)} • {material.size}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{material.downloadCount} unduhan</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="pt-3 border-t border-gray-100">
            <p className="text-gray-700 mb-4">{material.description}</p>
            {material.thumbnailUrl && (
              <div className="mb-4">
                <Image 
                  src={material.thumbnailUrl} 
                  alt={material.title} 
                  width={300}
                  height={160}
                  className="rounded-md max-h-40 object-cover"
                />
              </div>
            )}
            {material.fileUrl && (
              <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#C40503] hover:bg-[#a60402]">
                  <Download className="h-4 w-4 mr-2" />
                  Unduh Materi
                </Button>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
