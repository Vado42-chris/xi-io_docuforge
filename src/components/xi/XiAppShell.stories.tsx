import type { Meta, StoryObj } from '@storybook/react-vite';
import { XiAppShell } from './XiAppShell';
import { XiPageHeader } from './XiPageHeader';

const meta = {
  title: 'xi-io/Primitives/XiAppShell',
  component: XiAppShell,
  tags: ['autodocs'],
  args: {
    currentPath: '/library',
    children: (
      <div className="df-page-stack">
        <XiPageHeader
          eyebrow="Shell preview"
          title="Shared shell keeps product pages consistent."
          description="This story verifies navigation, workspace spacing, focus states, and shell composition without DocuForge page logic."
        />
      </div>
    ),
  },
} satisfies Meta<typeof XiAppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LibraryRoute: Story = {};

export const UploadRoute: Story = {
  args: {
    currentPath: '/upload',
  },
};
