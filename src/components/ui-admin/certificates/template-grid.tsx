"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { certificateTemplates } from "@/data/data-admin/certificates-data/certificate-templates";
import type { CertificateTemplate } from "@/types/template";

export function TemplateGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificateTemplates.map((template: CertificateTemplate) => (
        <Card key={template.id}>
          <CardHeader className="relative">
            <div className="aspect-[1.4] relative rounded-lg overflow-hidden border mb-4">
              <Image
                src={template.thumbnail}
                alt={template.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {" "}
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Template
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplikat
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              {" "}
              <Badge
                variant={
                  template.status === "active"
                    ? "success"
                    : template.status === "draft"
                    ? "secondary"
                    : "outline"
                }
                className="capitalize"
              >
                {template.status}
              </Badge>
              <span className="text-muted-foreground">
                Used {template.usageCount} times
              </span>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            {" "}
            Terakhir diubah: {new Date(template.updatedAt).toLocaleDateString()}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
