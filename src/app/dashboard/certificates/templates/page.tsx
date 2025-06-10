import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui-admin/shared/Heading";
import { TemplateGrid } from "@/components/ui-admin/certificates/template-grid";
import { Plus } from "lucide-react";

export default function CertificateTemplatesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Certificate Templates"
          description="Manage and create certificate templates"
        />
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>
      <div className="mt-6">
        <Card className="p-6">
          <TemplateGrid />
        </Card>
      </div>
    </div>
  );
}
