import * as React from "react";
import TrackHeader from '../containers/track/track-header';
import IndexLayout from '../layouts';
import styled from "@emotion/styled";
import TrackContent from "../containers/track/track-content";
import TrackCard from "../containers/track/track-cover";
import { setTracksData } from '../containers/player/player-actions';
import { useDispatch } from 'react-redux';
const { useEffect } = React;

const TrackContainer = styled.div({
  margin: "auto",
  display: "flex",
  minHeight: "80vh",
  justifyContent: 'center',
  "@media(min-width:960px)": {
    alignItems: "center"
  }
});

const Card = styled.div({
  maxWidth: 400,
  maxHeight: 400,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  position: 'relative',
  boxShadow:
    "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
  "@media (max-width:960px)": {
    boxShadow: "none"
  }
});

export interface TrackOwnProps {
  pageContext: any;
}

const Track: React.FC<TrackOwnProps> = ({ pageContext: { track, tracks } }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTracksData(tracks));
  }, [dispatch]);

  if (!track) {
    return null;
  }
  
  return (
    <IndexLayout>
      <TrackHeader />
      <TrackContainer>
        <TrackContent track={track} />
        <Card>
          <TrackCard track={track} />
        </Card>
      </TrackContainer>
    </IndexLayout> 
  );
};

export default Track;
