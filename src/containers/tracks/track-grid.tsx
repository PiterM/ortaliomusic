import * as React from "react";
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { getCartItems } from '../cart/cart-selectors';
import { getCurrentTrack } from '../player/player-selectors';
import { TrackCard } from '../track/track-card';

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
  gridAutoRows: "1fr",
  gridGap: "8px",
  alignItems: "stretch",
  margin: "28px 0"
});

type TrackGridProps = any;

const TrackGrid: React.FC<TrackGridProps> = ({ tracks }) => {
  const items = useSelector(getCartItems);
  const currentTrack = useSelector(getCurrentTrack);

  return (
    <Grid>
      {tracks.map((track: any, key: number) => (
        <TrackCard 
          key={key}
          track={track}
          items={items}
          currentTrack={currentTrack}
        />
      ))}
    </Grid>
  );
};

export default TrackGrid;
