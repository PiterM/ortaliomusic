import * as React from "react";
import styled from '@emotion/styled';
import TrackGrid from "./track-grid";

const NoTracksInfo = styled.p({
  textAlign: 'center',
  width: '100%',
  marginTop: 100
})

export interface TracksProps {
  tracks: any;
}

const Tracks: React.FC<TracksProps> = ({ tracks }: any) => {
  return !tracks || !tracks.length 
    ? <NoTracksInfo>Sorry. No content here yet.</NoTracksInfo>
    : <TrackGrid tracks={tracks} />;
};

export default Tracks;
