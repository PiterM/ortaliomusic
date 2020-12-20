import * as React from "react";
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { getCartItems } from '../cart/cart-selectors';
import { getCurrentTrack } from '../player/player-selectors';
import { trackUrlHelper } from '../../common/trackUrlHelper';
import { TrackAddedCartButton, TrackCover, TrackNotAddedCartButton } from "./track-details";
import { TrackPlayStatus } from './tracks-models';
import TrackBottom from './track-bottom';

interface SquareLayerOwnProps {
  isTrackPage?: boolean;
}

const SquareLayer = styled.div((props: SquareLayerOwnProps) => {
  const position = props.isTrackPage ? 'static' : 'relative';
  return {
    position,
    transition: 'all 0.5s ease',
    opacity: 1,
}});

export interface TrackOwnProps {
  track: any;
  key?: number;
  items: any;
  currentTrack: any;
  isTrackPage?: boolean;
}

export const TrackCard: React.FC<TrackOwnProps> = ({ track, items, currentTrack, isTrackPage }) => {
  const { id, slug } = track?.node;
  const url = trackUrlHelper(id, slug);
  const { title, description, digitalItemGuid, price } = track?.node?.ortalioMusicTrack;
  const { sourceUrl, imageFile: { childImageSharp: { fixed }} } = track?.node?.ortalioMusicTrack?.coverImage;
  const trackIsAdded = items && items[id] !== undefined;
  const storeItem = trackIsAdded && items[id];

  let trackStatus = TrackPlayStatus.None;
  if (currentTrack?.details?.id === id) {
    if (currentTrack?.actionPending) {
      trackStatus = TrackPlayStatus.Loading;
    } else {
      if (currentTrack?.playing) {
        trackStatus = TrackPlayStatus.Playing;
      } else if (currentTrack?.paused) {
        trackStatus = TrackPlayStatus.Paused;
      }
    }
  }

  return (
      <div>
        <SquareLayer isTrackPage={isTrackPage} >
          <TrackCover 
            id={id}
            fixed={fixed} 
            addedToCart={trackIsAdded} 
            url={url}
            trackStatus={trackStatus}
            isTrackPage={isTrackPage}
          />
          { trackIsAdded 
            ? <TrackAddedCartButton 
                uniqueId={storeItem.uniqueId}
              />
            : <TrackNotAddedCartButton
                id={id}
                slug={slug}
                title={title}
                description={description}
                sourceUrl={sourceUrl}
                digitalItemGuid={digitalItemGuid}
                price={price}
              />
          }
        </SquareLayer>
        { !isTrackPage && <TrackBottom title={title} url={url} /> }
      </div>
  );
}

const Card = styled.div({
  minWidth: 400,
  minHeight: 400,
  "@media (max-width:960px)": {
    minWidth: "100vw"
  },
});

export interface TrackContainerOwnProps {
    track: any;
}

const TrackCardContainer: React.FC<TrackContainerOwnProps> = ({ track }) => {
  const items = useSelector(getCartItems);
  const currentTrack = useSelector(getCurrentTrack);

  return (
    <Card>
      <TrackCard 
        track={track}
        items={items}
        currentTrack={currentTrack}
        isTrackPage={true}
      />
    </Card>
  );
}

export default TrackCardContainer;
