import type { Meta, StoryObj } from '@storybook/react-vite';
import { XiButton } from './XiButton';
import { XiPageHeader } from './XiPageHeader';

const meta = {
  title: 'xi-io/Primitives/XiPageHeader',
  component: XiPageHeader,
  tags: ['autodocs'],
  args: {
    eyebrow: 'Blank-form library',
    title: 'Find the form first. Fill it somewhere safe.',
    description:
      'DocuForge starts as a trusted library of blank forms, provenance notes, permissions status, and helper templates.',
  },
} satisfies Meta<typeof XiPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    actions: <XiButton variant="secondary">Review source</XiButton>,
  },
};
