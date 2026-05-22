import type { Meta, StoryObj } from '@storybook/react-vite';
import { seedForms } from '../../data/seedForms';
import { DfLibraryResults } from './DfLibraryResults';

const meta = {
  title: 'DocuForge/Organisms/DfLibraryResults',
  component: DfLibraryResults,
  tags: ['autodocs'],
  args: {
    records: seedForms,
  },
} satisfies Meta<typeof DfLibraryResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeedRecords: Story = {};

export const Empty: Story = {
  args: {
    records: [],
  },
};

export const ReviewRequiredOnly: Story = {
  args: {
    records: seedForms.filter((record) => !record.security.publicEligible),
  },
};
