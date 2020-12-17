import * as React from "react";
import styled from "@emotion/styled";
import TrackBottom from './track-bottom';
import { SnipcartContext } from '../../../store/cartStore';
import * as TrackUrlHelper from '../../../common/trackUrlHelper';
import { TrackAddedCartButton, TrackCover, TrackNotAddedCartButton } from "./track-cart-button";
const { useContext } = React;

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
  console.log('tracks', tracks);
  // const { state }: any = useContext(SnipcartContext);
  // const { items } = state;
  // const alreadyAddedTracks = items.length > 0 && items.map((item: any) => item.id);

  return (
    <Grid>
      {tracks.map((track: any, key: number) => {
        const { id, slug } = track?.node;
        const { title, description } = track?.node?.ortalioMusicTrack;
        const { sourceUrl, imageFile: { childImageSharp: { fixed }} } = track?.node?.ortalioMusicTrack?.coverImage;
        const trackIsAdded = false //alreadyAddedTracks && alreadyAddedTracks.length > 0 && alreadyAddedTracks.includes(id);
        // const storeItem = items && items.length > 0 && items.find((item: any) => item.id === id);

        return (
            <div key={key}>
              <SquareLayer>
                <TrackCover fixed={fixed} addedToCart={trackIsAdded} />
                { trackIsAdded 
                  ? <TrackAddedCartButton 
                      sourceUrl={sourceUrl}
                      uniqueId={'storeItem.uniqueId'}
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
              <TrackBottom title={title} url={TrackUrlHelper(id, slug)} />
            </div>
        );
      })}
    </Grid>
  );
};

export default TrackGrid;
