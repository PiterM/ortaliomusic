import * as React from "react";
import TrackGrid from "./track-grid";

export interface TracksOwnProps {
  tracks: any;
}

const Tracks: React.FC<TracksOwnProps> = ({ tracks }: any) => {
  return tracks ? (
      <TrackGrid tracks={tracks} />
  ) : null;
};

export default Tracks;
