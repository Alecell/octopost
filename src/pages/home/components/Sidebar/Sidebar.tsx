import { useRef, useState } from 'react';

import AccordionTab from '~components/AccordionTab/AccordionTab';
import Button from '~components/Button/Button';
import InputSearch from '~components/InputSearch/InputSearch';
import { TInputComponent } from '~components/InputSearch/InputSearch.types';
import Modal from '~components/Modal/Modal';
import SearchClue from '~components/SearchClue/SearchClue';

import { PlusIcon } from './components/PlusIcon';

import scss from './Sidebar.module.scss';

function Sidebar() {
  const [value, setValue] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const inputSearchRef = useRef<TInputComponent | null>(null);

  const handleToggleModal = () => {
    setOpen((isOpen) => !isOpen);
  };

  const renderSearchClue = () => (
    <SearchClue
      clearInput={inputSearchRef.current?.clearInput}
      label="Searching for"
      value={value}
    />
  );

  return (
    <AccordionTab
      className={
        scss.mobile + ' ' + (mobileIsOpen ? scss.openMobile : scss.closeMobile)
      }
      hideCloseButton
      title="Select Social Media"
    >
      <div className={scss.content}>
        <InputSearch
          className={scss.searchBar}
          error={false}
          onChange={(value) => setValue(value as string)}
          placeholder="Search for social media"
          ref={inputSearchRef}
        />

        {value ? null : renderSearchClue()}

        <div className={scss.items}>
          Item 1 <br /> Item2 <br /> Item 1 <br /> Item2 <br />
          Item 1 <br /> Item2 <br /> Item 1 <br /> Item2 <br />
          Item 1 <br /> Item2 <br /> Item 1 <br /> Item2 <br />
          Item 1 <br /> Item2 <br /> Item 1 <br /> Item2 <br />
          Item 1 <br /> Item2 <br /> Item 1 <br /> Item2 <br />
          Item 1 <br /> Item2 <br /> Item 1 <br /> Item2 <br />
          Item 1 <br /> Item2 <br /> Item 1 <br /> Item2 <br />
          Item 1 <br /> Item2 <br /> Item 1 <br /> Item2 <br />
        </div>

        <Button
          className={scss.newAccountButton}
          onClick={handleToggleModal}
          variant="container"
        >
          {' '}
          + &ensp; New Account
        </Button>

        <div className={scss.newAccountButtonMobileContainer}>
          <Button
            circle
            className={scss.newAccountButtonMobile}
            icon={<PlusIcon />}
            onClick={handleToggleModal}
            variant="container"
          />
        </div>

        <Modal
          footer={<div>footer</div>}
          isOpen={isOpen}
          onClickOutside={() => setOpen(false)}
          title="Adcionar Social"
        >
          Octopost
        </Modal>
      </div>
    </AccordionTab>
  );
}

export default Sidebar;
