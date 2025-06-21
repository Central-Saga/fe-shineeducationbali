"use client";

import React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CertificateTypeOption {
  value: string;
  label: string;
  thumbnail: string;
  description: string;
}

const certificateTypes: CertificateTypeOption[] = [
  {
    value: "COURSE_COMPLETION",
    label: "Penyelesaian Kursus",
    thumbnail: "/certificates/completion-thumb.jpg",
    description: "Sertifikat untuk penyelesaian program kursus",
  },
  {
    value: "ACHIEVEMENT",
    label: "Prestasi",
    thumbnail: "/certificates/achievement-thumb.jpg",
    description: "Sertifikat untuk pencapaian prestasi khusus",
  },
  {
    value: "PARTICIPATION",
    label: "Partisipasi",
    thumbnail: "/certificates/participation-thumb.jpg",
    description: "Sertifikat untuk partisipasi dalam kegiatan",
  },
];

interface CertificateTypeSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

export function CertificateTypeSelect({
  value,
  onValueChange,
  defaultValue,
}: CertificateTypeSelectProps) {
  const [selectedType, setSelectedType] = React.useState<
    CertificateTypeOption | undefined
  >(
    certificateTypes.find((t) => t.value === value || t.value === defaultValue)
  );

  const handleTypeChange = (typeValue: string) => {
    const type = certificateTypes.find((t) => t.value === typeValue);
    setSelectedType(type);
    onValueChange(typeValue);
  };

  return (
    <div className="space-y-4">
      <Select
        onValueChange={handleTypeChange}
        value={value}
        defaultValue={defaultValue}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pilih jenis sertifikat" />
        </SelectTrigger>
        <SelectContent>
          {certificateTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 relative">
                  <Image
                    src={type.thumbnail}
                    alt={type.label}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <div className="font-medium">{type.label}</div>
                  <div className="text-xs text-gray-500">
                    {type.description}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedType && (
        <div className="rounded-lg border overflow-hidden">
          <div className="aspect-[1.4] relative">
            <Image
              src={selectedType.thumbnail}
              alt={selectedType.label}
              fill
              className="object-contain"
            />
          </div>
          <div className="p-3 bg-gray-50">
            <h4 className="font-medium">{selectedType.label}</h4>
            <p className="text-sm text-gray-500">{selectedType.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
