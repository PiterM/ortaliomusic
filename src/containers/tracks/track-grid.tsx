import * as React from "react";
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import TrackBottom from './track-bottom';
import { getCartItems } from '../cart/cart-selectors';
import { getCurrentTrack } from '../player/player-selectors';
import { trackUrlHelper } from '../../common/trackUrlHelper';
import { TrackAddedCartButton, TrackCover, TrackNotAddedCartButton } from "./track-details";
import { TrackPlayStatus } from './tracks-models';

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
  gridAutoRows: "1fr",
  gridGap: "8px",
  alignItems: "stretch",
  margin: "28px 0"
});

const SquareLayer = styled.div({
  position: 'relative',
  transition: 'all 0.5s ease',
  opacity: 1,
});

type TrackGridOwnProps = any;

const TrackGrid: React.FC<TrackGridOwnProps> = ({ tracks }) => {
  const items = useSelector(getCartItems);
  const currentTrack = useSelector(getCurrentTrack);

  return (
    <Grid>
      {tracks.map((track: any, key: number) => {
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
            <div key={key}>
              <SquareLayer>
                <TrackCover 
                  id={id}
                  fixed={fixed} 
                  addedToCart={trackIsAdded} 
                  url={url}
                  trackStatus={trackStatus}
                />
                { trackIsAdded 
                  ? <TrackAddedCartButton 
                      sourceUrl={sourceUrl}
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
              <TrackBottom title={title} url={url} />
            </div>
        );
      })}
    </Grid>
  );
};

export default TrackGrid;
