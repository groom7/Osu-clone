import React from 'react';
import IMapData from '../mapsDataTypes/mapsDataTypes';

export interface ISongData {
  mapName: string;
  audio: string;
  albumCover: string;
  topPlayers: string[];
  additionalAudio: string[];
  additionalPictures: string[];
}
export interface ISongListItem {
  songData: IMapData;
  clickedSongListItemID: string;
  setClickedSongListItemID: React.Dispatch<React.SetStateAction<string>>;
  setClickedSongListData: React.Dispatch<React.SetStateAction<IMapData>>;
  setBackgroundSource: React.Dispatch<React.SetStateAction<string>>;
  currentPageAudio: HTMLAudioElement;
}
export interface IStarAnimation {
  songID: string | null;
  clickedSongListItemID: string;
}
export interface IPlayersStatisticList {
  clickedSongListData: IMapData;
}
