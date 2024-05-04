import { Story } from '@ladle/react';

import Preview from '~components/Preview/Preview';

import PreviewContainer from './PreviewContainer';

export const PreviewContainerStories: Story = () => (
  <div>
    <PreviewContainer>
      <Preview>Preview Imaginário</Preview>
    </PreviewContainer>
  </div>
);
