import FirstComment from '~components/FirstComment';
import MainComposer from '~components/MainComposer/MainComposer';
import MediaInputs from '~components/MediaInputs/MediaInput';
import SavBar from '~components/SavBar/SavBar';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

import scss from './home.module.scss';

const Home = () => {
  return (
    <>
      <Header />
      <div className={scss.mainContainer}>
        <div className={scss.gridContainer}>
          <div className={scss.gridSwitches}>
            <Sidebar />
          </div>
          <div className={scss.gridInput}>
            <MainComposer />
            <MediaInputs />
            <FirstComment
              multine={false}
              labelProps={{ style: { maxWidth: 150 } }}
            >
              Id laboris quis veniam minim qui officia amet non labore anim
              excepteur quis sint.Esse ex aute voluptate qui velit ipsum.
            </FirstComment>
          </div>
          <div className={scss.gridTabs} />
        </div>
        <SavBar />
      </div>
    </>
  );
};

export default Home;
