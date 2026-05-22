import type { Meta, StoryObj } from '@storybook/react-vite';
import { XiBadge } from './XiBadge';

const meta = {
  title: 'xi-io/Primitives/XiBadge',
  component: XiBadge,
  tags: ['autodocs'],
  args: {
    children: 'needs review',
    tone: 'warning',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'danger', 'info'],
    },
  },
} satisfies Meta<typeof XiBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {};

export const StatusSet: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <XiBadge tone="neutral">draft</XiBadge>
      <XiBadge tone="success">published</XiBadge>
      <XiBadge tone="warning">permission needed</XiBadge>
      <XiBadge tone="danger">blocked</XiBadge>
      <XiBadge tone="info">sensitive adjacent</XiBadge>
    </div>
  ),
};
