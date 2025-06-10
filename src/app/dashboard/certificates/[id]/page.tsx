import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui-admin/shared/Heading";
import { CertificatePreview } from "@/components/ui-admin/certificates/certificate-preview";
import { CertificateActions } from "@/components/ui-admin/certificates/certificate-actions";

export default function CertificateDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6">
      <Heading
        title="Certificate Details"
        description="View and manage certificate information"
      />
      <div className="grid gap-6 mt-6">
        <Card className="p-6">
          <CertificatePreview certificateId={params.id} />
        </Card>
        <Card className="p-6">
          <CertificateActions certificateId={params.id} />
        </Card>
      </div>
    </div>
  );
}
