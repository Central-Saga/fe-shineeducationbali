"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Certificate } from "@/types/certificate";
import { certificateService } from "@/lib/services/certificate.service";
import { Download, Loader2, ZoomIn } from "lucide-react";

interface CertificatePreviewProps {
  certificateId: string;
}

export function CertificatePreview({ certificateId }: CertificatePreviewProps) {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertificate = async () => {
      try {
        setLoading(true);
        const data = await certificateService.getCertificate(certificateId);
        setCertificate(data);
      } catch (error) {
        console.error("Error loading certificate:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCertificate();
  }, [certificateId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Certificate not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative aspect-[1.4] rounded-lg overflow-hidden border">
        <Image
          src={
            certificate.previewUrl || "/certificates/preview-placeholder.png"
          }
          alt={`Certificate for ${certificate.recipientName}`}
          fill
          className="object-contain"
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button size="sm" variant="secondary">
            <ZoomIn className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
