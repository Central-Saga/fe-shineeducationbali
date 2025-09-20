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
import { Label } from "@/components/ui/label";

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

// A standalone select component that doesn't use form context
function StandaloneSelect({
  label,
  value,
  defaultValue,
  onChange,
}: {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const [selectedTemplate, setSelectedTemplate] = React.useState<
    TemplateOption | undefined
  >(templateOptions.find((t) => t.id === (value || defaultValue)));

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select
        value={value}
        onValueChange={(value) => {
          onChange?.(value);
          setSelectedTemplate(templateOptions.find((t) => t.id === value));
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
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {template.description}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTemplate && (
        <div className="mt-4">
          <div className="relative aspect-[1.414] w-full overflow-hidden rounded-lg border">
            <Image
              src={selectedTemplate.thumbnail.replace("-thumb", "")}
              alt={selectedTemplate.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {selectedTemplate.description}
          </div>
        </div>
      )}
    </div>
  );
}

export function TemplateSelect({
  name = "templateId",
  label = "Template",
  // description,
  value,
  defaultValue,
  onChange,
  useFormField = true,
}: TemplateSelectProps) {
  const formContext = useFormContext();

  // If we're not using form context or if there is no form context, use the standalone version
  if (!useFormField || !formContext) {
    return (
      <StandaloneSelect
        label={label}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
  }

  // Otherwise, use the form-connected version
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            value={field.value}
            onValueChange={field.onChange}
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
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {field.value && (
            <div className="mt-4">
              <div className="relative aspect-[1.414] w-full overflow-hidden rounded-lg border">
                <Image
                  src={
                    templateOptions
                      .find((t) => t.id === field.value)
                      ?.thumbnail.replace("-thumb", "") || ""
                  }
                  alt={
                    templateOptions.find((t) => t.id === field.value)?.name ||
                    ""
                  }
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {templateOptions.find((t) => t.id === field.value)?.description}
              </div>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
