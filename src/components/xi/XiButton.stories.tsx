import type { Meta, StoryObj } from '@storybook/react-vite';
import { XiButton } from './XiButton';

const meta = {
  title: 'xi-io/Primitives/XiButton',
  component: XiButton,
  tags: ['autodocs'],
  args: {
    children: 'Continue',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
  },
} satisfies Meta<typeof XiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    children: 'Review source',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Upload workflow pending',
    variant: 'secondary',
    disabled: true,
  },
};
