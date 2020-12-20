import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/header';
import Tracks from '../containers/tracks/tracks';
import IndexLayout from '../layouts';
import TrackHeader from '../containers/track/track-header';
import styled from "@emotion/styled";
import TrackContent from "../containers/track/track-content";
import TrackCardContainer from "../containers/track/track-card";
import { setTracksData, stopPlayback } from '../containers/player/player-actions';
import { getTracks } from '../containers/player/player-selectors';
const { useEffect } = React;
// import Layout from "./components/layout";
// import SEO from "./components/seo";
// import Header from "../../components/header";

import './index.css';
import './custom.css';

export interface HomePageOwnProps {
  tracks: any;
}

const HomePage: React.FC<HomePageOwnProps> = ({ tracks }: any) => {
    if (!tracks) {
        return null;
    }

    return (
        <IndexLayout>
            <Header />
                <div
                    style={{
                    margin: '0 auto',
                    maxWidth: 960,
                    padding: '0px 1.0875rem 1.45rem',
                    paddingTop: 0,
                    }}
                >
                    <Tracks tracks={tracks} />
                </div>
        </IndexLayout>
    );
};

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
  track: any;
}

const TrackPage: React.FC<TrackOwnProps> = ({ track }: any) => {
  if (!track) {
    return null;
  }
  
  return (
    <IndexLayout>
      <TrackHeader />
      <TrackContainer>
        <TrackContent track={track} />
        <Card>
          <TrackCardContainer track={track} />
        </Card>
      </TrackContainer>
    </IndexLayout> 
  );
};

export interface PageOwnProps {
    pageContext: any;
}

const Page: React.FC<PageOwnProps> = ({ pageContext: { track, tracks } }: any) => {
    const reduxTracks = useSelector(getTracks);
    const dispatch = useDispatch();
    const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0 && obj.constructor === Object;

    useEffect(() => {
        isObjectEmpty(reduxTracks) && dispatch(setTracksData(tracks));
        dispatch(stopPlayback());
    }, [dispatch]);

    if (track === undefined) {
        return <HomePage tracks={tracks} />;
    }
    return <TrackPage track={track} />
};

export default Page;