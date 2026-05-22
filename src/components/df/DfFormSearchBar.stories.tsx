import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DfFormSearchBar } from './DfFormSearchBar';

const meta = {
  title: 'DocuForge/Organisms/DfFormSearchBar',
  component: DfFormSearchBar,
  tags: ['autodocs'],
} satisfies Meta<typeof DfFormSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => {
    const [query, setQuery] = useState('financial');
    return <DfFormSearchBar query={query} onQueryChange={setQuery} />;
  },
};

export const Empty: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return <DfFormSearchBar query={query} onQueryChange={setQuery} />;
  },
};
