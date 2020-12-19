import * as React from "react";
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import TrackBottom from './track-bottom';
import { getCartItems } from '../cart/cart-selectors';
import { trackUrlHelper } from '../../common/trackUrlHelper';
import { TrackAddedCartButton, TrackCover, TrackNotAddedCartButton } from "./track-details";

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

  return (
    <Grid>
      {tracks.map((track: any, key: number) => {
        const { id, slug } = track?.node;
        const url = trackUrlHelper(id, slug);
        const { title, description } = track?.node?.ortalioMusicTrack;
        const { sourceUrl, imageFile: { childImageSharp: { fixed }} } = track?.node?.ortalioMusicTrack?.coverImage;
        const trackIsAdded = items && items[id] !== undefined;
        const storeItem = trackIsAdded && items[id];

        return (
            <div key={key}>
              <SquareLayer>
                <TrackCover 
                  fixed={fixed} 
                  addedToCart={trackIsAdded} 
                  url={url}
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
