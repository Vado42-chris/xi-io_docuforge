import type { Meta, StoryObj } from '@storybook/react-vite';
import { XiEmptyState } from './XiEmptyState';

const meta = {
  title: 'xi-io/Primitives/XiEmptyState',
  component: XiEmptyState,
  tags: ['autodocs'],
  args: {
    title: 'No matching blank forms yet',
    children: 'Try another keyword, or start an upload declaration when that workflow is enabled.',
  },
} satisfies Meta<typeof XiEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NextSlice: Story = {
  args: {
    title: 'Next controlled slice',
    children: 'DOCUFORGE-UPLOAD-01 will build this as a state machine, not a backend upload shortcut.',
  },
};
