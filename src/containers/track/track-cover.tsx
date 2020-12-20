import * as React from "react";
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import Img from "gatsby-image";
import { Track } from '../tracks/track-grid';
import { getCartItems } from '../cart/cart-selectors';
import { getCurrentTrack } from '../player/player-selectors';

const Card = styled.div({
  minWidth: 400,
  minHeight: 400,
  "@media (max-width:960px)": {
    minWidth: "100vw"
  },
});

export interface TrackCoverOwnProps {
    track: any;
}

const TrackCard: React.FC<TrackCoverOwnProps> = ({ track }) => {
  const { coverImage: { imageFile: { childImageSharp: { fixed }}}} = track?.node?.ortalioMusicTrack;

  const items = useSelector(getCartItems);
  const currentTrack = useSelector(getCurrentTrack);

  return (
    <Card>
      <Track 
        track={track}
        items={items}
        currentTrack={currentTrack}
        isTrackPage={true}
      />
    </Card>
  );
}

export default TrackCard;
