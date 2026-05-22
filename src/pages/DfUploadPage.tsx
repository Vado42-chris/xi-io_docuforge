import { DfUploadDeclaration } from '../components/df/DfUploadDeclaration';
import { XiNotice } from '../components/xi/XiNotice';
import { XiPageHeader } from '../components/xi/XiPageHeader';

export function DfUploadPage() {
  return (
    <div className="df-page-stack">
      <XiPageHeader
        eyebrow="Upload declaration"
        title="Declare safety before any file handling."
        description="This front-end workflow proves the blank-form attestation, source metadata, and routing decision before DocuForge adds real upload storage or PDF processing."
      />

      <XiNotice title="No file persistence in this slice" tone="info">
        DOCUFORGE-UPLOAD-01 does not upload, store, analyze, or process a real file. It only models the declaration workflow users must complete later.
      </XiNotice>

      <DfUploadDeclaration />
    </div>
  );
}
