import * as React from "react";
import TrackGrid from "./track-grid";

export interface TracksProps {
  tracks: any;
}

const Tracks: React.FC<TracksProps> = ({ tracks }: any) => {
  return tracks ? (
      <TrackGrid tracks={tracks} />
  ) : null;
};

export default Tracks;
