import * as React from "react";
import Helmet from 'react-helmet';
import TrackHeader from '../containers/track/track-header';
import IndexLayout from '../layouts';
import styled from "@emotion/styled";
import { trackUrlHelper } from '../common/trackUrlHelper';
import TrackContent from "../containers/track/track-content";
import TrackCover from "../containers/track/track-cover";

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
  const { description, title, coverImage: { sourceUrl }} = track;

  return (
    <>
      <Helmet
        title="Gatsby Default Starter"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <IndexLayout>
        <TrackHeader />
        <TrackContainer>
          <TrackContent track={track} />
          <Card
            onClick={(e) => e.preventDefault()}
            className="snipcart-add-item"
            data-item-id={id}
            data-item-price="0.01"
            data-item-url={trackUrlHelper(id, slug)}
            data-item-description={description}
            data-item-image={sourceUrl}
            data-item-name={title}
            data-item-file-guid="3139360f-f3ab-49d5-8668-7dc222508729"
          >
            <TrackCover track={track} />
          </Card>
        </TrackContainer>
      </IndexLayout>
    </>      
  );
};

export default Track;
