import * as React from "react";
import { useSelector } from 'react-redux';
import TrackHeader from '../containers/track/track-header';
import IndexLayout from '../layouts';
import styled from "@emotion/styled";
import TrackContent from "../containers/track/track-content";
import { getCartItems } from '../containers/cart/cart-selectors';
import TrackCover from "../containers/track/track-cover";
import { TrackAddedCartButton, TrackNotAddedCartButton } from '../containers/tracks/track-details';

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
  pageContext: any;
}

const Track: React.FC<TrackOwnProps> = ({ pageContext: { track, id, slug } }: any) => {
  if (!track) {
    return null;
  }
  
  const { description, title, digitalItemGuid, price, coverImage: { sourceUrl }} = track;
  const items = useSelector(getCartItems);
    const trackIsAdded = items && items[id] !== undefined;

  return (
    <IndexLayout>
      <TrackHeader />
      <TrackContainer>
        <TrackContent track={track} />
        <Card>
          <TrackCover track={track} />
          { trackIsAdded 
          ? <TrackAddedCartButton 
              sourceUrl={sourceUrl}
              uniqueId={items[id].uniqueId}
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
        </Card>
      </TrackContainer>
    </IndexLayout> 
  );
};

export default Track;
