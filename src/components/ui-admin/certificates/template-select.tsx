import React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface TemplateOption {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

const templateOptions: TemplateOption[] = [
  {
    id: "template1",
    name: "Template Default",
    thumbnail: "/certificates/english-basic-thumb.jpg",
    description: "Template standar untuk sertifikat penyelesaian kursus",
  },
  {
    id: "template2",
    name: "Template Prestasi",
    thumbnail: "/certificates/achievement-thumb.jpg",
    description: "Template khusus untuk sertifikat prestasi",
  },
  {
    id: "template3",
    name: "Template Penyelesaian",
    thumbnail: "/certificates/completion-thumb.jpg",
    description: "Template untuk sertifikat penyelesaian program",
  },
];

interface TemplateSelectProps {
  name?: string;
  label?: string;
  description?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  useFormField?: boolean;
}

export function TemplateSelect({
  name = "templateId",
  label = "Template",
  description,
  value,
  defaultValue,
  onChange,
  useFormField = true,
}: TemplateSelectProps) {
  const formContext = useFormContext();
  const [selectedTemplate, setSelectedTemplate] = React.useState<
    TemplateOption | undefined
  >(templateOptions.find((t) => t.id === (value || defaultValue)));

  if (useFormField && formContext) {
    return (
      <FormField
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedTemplate(
                  templateOptions.find((t) => t.id === value)
                );
              }}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templateOptions.map((template) => (
                  <SelectItem
                    key={template.id}
                    value={template.id}
                    className="py-2"
                  >
                    <div className="flex items-center">
                      <div className="relative h-12 w-16 mr-3">
                        <Image
                          src={template.thumbnail}
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{template.name}</span>
                        <span className="text-sm text-gray-500">
                          {template.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <div className="space-y-2">
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        value={value}
        onValueChange={(newValue) => {
          onChange?.(newValue);
          setSelectedTemplate(templateOptions.find((t) => t.id === newValue));
        }}
        defaultValue={defaultValue}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          {templateOptions.map((template) => (
            <SelectItem key={template.id} value={template.id} className="py-2">
              <div className="flex items-center">
                <div className="relative h-12 w-16 mr-3">
                  <Image
                    src={template.thumbnail}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{template.name}</span>
                  <span className="text-sm text-gray-500">
                    {template.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
