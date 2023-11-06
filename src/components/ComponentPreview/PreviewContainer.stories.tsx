import { Story } from '@ladle/react';

import Preview from '~components/Preview/Preview';

import PreviewContainer from './PreviewContainer';

export const PreviewContainerStories: Story = () => {
  return (
    <div>
      <PreviewContainer children={<Preview children="Preview Imaginário" />} />
    </div>
  );
};
