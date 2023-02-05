/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
import React, { useRef, useEffect, useState } from 'react';
import parallaxCreate from '../../utils/parallaxCreate';
import './SelectMapPageStyles.scss';
import throttle from '../../utils/throttle';
import songsData from './songsData';
import SongListItem from '../../components/selectMap/songList/SongListItem';
import { useDispatch, useSelector } from 'react-redux';
import IReducers from '../../types/reducers/reducersType';
import setNewMap from '../../store/actionCreators/mapsData/setNewMap';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import useUnSub from '../../customHooks/useUnSub';

function SelectMap() {
  const throttleInProgress = useRef(false);
  const [clickedSongListItemID, setClickedSongListItemID] = useState('1011011');
  const [backgroundSource, setBackgroundSource] = useState(songsData[1011011].background);
  const dispatch = useDispatch();
  useUnSub();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const state = useSelector((state: IReducers) => state.mapsDataReducer);
  const stateUsers = useSelector((state: IReducers) => state.userDataReducer);
  console.log(state);
  console.log(stateUsers);
  useEffect(() => {
    const background = document.querySelector('.select-map-page-container__background') as HTMLDivElement;
    document.addEventListener('mousemove', (event) => {
      throttle(() => parallaxCreate(event, background), throttleInProgress, 25);
    });
    const getDat = async () => {
      const querySnapshot = await getDocs(collection(db, 'maps'));
      querySnapshot.forEach((document) => {
        const mapsData = document.data();
        console.log(mapsData);
        dispatch(setNewMap({
          mapName: mapsData.mapName,
          audio: mapsData.audio,
          albumCover: mapsData.albumCover,
          topPlayers: mapsData.topPlayers,
          additionalAudio: mapsData.additionalAudio,
          additionalPictures: mapsData.additionalPictures,
          id: mapsData.id,
        }));
      });
    };
    getDat();
  }, []);

  return (
    <div className="select-map-page-container">
      <div
        className="select-map-page-container__background"
        style={{
          backgroundImage: `url(${backgroundSource})`,
        }}
      />
      <ul className="select-map-page-container__songs-list">
        {Object.values(songsData).map((songData) => (
          <SongListItem
            songData={songData}
            clickedSongListItemID={clickedSongListItemID}
            setClickedSongListItemID={setClickedSongListItemID}
            setBackgroundSource={setBackgroundSource}
            key={window.crypto.randomUUID()}
          />
        ))}
      </ul>
    </div>
  );
}

export default SelectMap;
