import * as React from "react";
// import Layout from "./components/layout";
// import SEO from "./components/seo";
// import Header from "../../components/header";
import TrackGrid from "./components/track-grid";

export interface TracksOwnProps {
  pageContext: any;
}

const Tracks: React.FC<TracksOwnProps> = ({ pageContext: { tracks } }: any) => {
  console.log('tracks', tracks);
  return tracks ? (
      <TrackGrid tracks={tracks} />
  ) : null;
};

export default Tracks;
