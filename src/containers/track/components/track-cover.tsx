import * as React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";

const CardImage = styled(Img)({
  minWidth: 400,
  minHeight: 400,
  "@media (max-width:960px)": {
    minWidth: "100vw"
  },
});

export interface TrackCoverOwnProps {
    track: any;
}

class TrackCover extends React.Component<TrackCoverOwnProps, {}> {
  render() {
    const { track: { coverImage } } = this.props;
    const imageFluid = {
      aspectRatio: 1,
      src: coverImage.sourceUrl,
      srcSet: coverImage.sourceUrl,
      sizes: ''
    }

    return <CardImage fluid={imageFluid} />;
  }
}

export default TrackCover;
