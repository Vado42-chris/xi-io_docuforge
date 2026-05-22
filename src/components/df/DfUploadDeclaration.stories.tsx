import type { Meta, StoryObj } from '@storybook/react-vite';
import { DfUploadDeclaration } from './DfUploadDeclaration';
import { initialUploadDeclarationDraft } from '../../domain/uploadDeclaration';

const meta = {
  title: 'DocuForge/Workflows/DfUploadDeclaration',
  component: DfUploadDeclaration,
  tags: ['autodocs'],
} satisfies Meta<typeof DfUploadDeclaration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PublicReviewBlocked: Story = {
  args: {
    initialDraft: {
      ...initialUploadDeclarationDraft,
      attestation: {
        confirmedBlank: true,
        hasPermissionToStore: true,
      },
      routing: {
        visibility: 'public_review',
        submitForPublicReview: true,
      },
      simulation: {
        filledContentDetected: true,
      },
    },
  },
};

export const PublicReviewReady: Story = {
  args: {
    initialDraft: {
      ...initialUploadDeclarationDraft,
      fileName: 'blank-family-law-form.pdf',
      attestation: {
        confirmedBlank: true,
        hasPermissionToStore: true,
      },
      source: {
        sourceType: 'official_url',
        sourceUrl: 'https://example.invalid/official-form.pdf',
        issuingBody: 'Official source pending verification',
        jurisdiction: 'Saskatchewan, Canada',
      },
      routing: {
        visibility: 'public_review',
        submitForPublicReview: true,
      },
      simulation: {
        filledContentDetected: false,
      },
    },
  },
};
