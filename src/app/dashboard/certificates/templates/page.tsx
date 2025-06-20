import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui-admin/shared/Heading";
import { TemplateGrid } from "@/components/ui-admin/certificates/template-grid";
import { NewTemplateButton } from "@/components/ui-admin/certificates/new-template-button";

export default function CertificateTemplatesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title="Certificate Templates"
          description="Manage and create certificate templates"
        />{" "}
        <NewTemplateButton />
      </div>
      <div className="mt-6">
        <Card className="p-6">
          <TemplateGrid />
        </Card>
      </div>
    </div>
  );
}
