import * as React from "react";
import { useDispatch } from 'react-redux';
import { setTracksData } from '../player/player-actions';
import TrackGrid from "./components/track-grid";
const { useEffect } = React;

export interface TracksOwnProps {
  tracks: any;
}

const Tracks: React.FC<TracksOwnProps> = ({ tracks }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTracksData(tracks));
  }, [dispatch]);

  return tracks ? (
      <TrackGrid tracks={tracks} />
  ) : null;
};

export default Tracks;
