import React from 'react';

import scss from './PreviewModeSelector.module.scss';

import { PreviewMode } from './PreviewModeSelector.components';
import { PreviewModeSelectorProps } from './PreviewModeSelector.type';

export function PreviewModeSelector(
  props: PreviewModeSelectorProps
): React.JSX.Element {
  return (
    <div className={scss.containerPreview}>
      {props.list.map((item) => (
        <PreviewMode item={item} key={item.id} />
      ))}
    </div>
  );
}
