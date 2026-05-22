import type { Meta, StoryObj } from '@storybook/react-vite';
import { XiNotice } from './XiNotice';

const meta = {
  title: 'xi-io/Primitives/XiNotice',
  component: XiNotice,
  tags: ['autodocs'],
  args: {
    title: 'Library safety rule',
    tone: 'warning',
    children: 'Public library records are for blank forms only. Completed, signed, identity-bearing, legal, financial, or medical documents must not be published here.',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof XiNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {};

export const Info: Story = {
  args: {
    title: 'Route placeholder',
    tone: 'info',
    children: 'This route exists to lock the navigation contract before feature work begins.',
  },
};
