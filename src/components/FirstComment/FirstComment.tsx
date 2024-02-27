import { ReactNode, useState } from 'react';

import Accordion from '../Accordion/Accordion';
import Checkbox from '../Checkbox/Checkbox';
import ComposerEditor from '../ComposerEditor/ComposerEditor';

import styles from './FirstComment.module.scss';

import { TFirstCommentProps } from './FirstComment.types';

export function FirstComment(props: TFirstCommentProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion
      className={styles.container}
      content={
        <div className={styles.textarea}>
          <ComposerEditor value="" />
        </div>
      }
      duration={0.5}
      header={
        <Checkbox
          checked={isOpen}
          className={styles.checkbox}
          onChange={setIsOpen}
        >
          First Comment
        </Checkbox>
      }
      isOpen={isOpen}
      {...props}
    />
  );
}

export default FirstComment;
