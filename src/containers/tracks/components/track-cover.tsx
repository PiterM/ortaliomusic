import * as React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const CardImage = styled(Img)({
  minWidth: 500,
  minHeight: 500,
  "@media (max-width:960px)": {
    minWidth: "100vw"
  },
});

const Dots = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem"
});

export interface TrackCoverOwnProps {
    track: any;
}

class TrackCover extends React.Component<TrackCoverOwnProps, {}> {
  state = {
    selectedImageIndex: 0
  };

  render() {
    const { track: { coverImage } } = this.props;
    const imageFluid = {
      aspectRatio: 1,
      src: coverImage.sourceUrl,
      srcSet: coverImage.sourceUrl,
      sizes: ''
    }

    return (
      <div>
        <BindKeyboardSwipeableViews
            index={this.state.selectedImageIndex}
            onChangeIndex={index => this.setState({ selectedImageIndex: index })}
        >
          <CardImage
            fluid={imageFluid}
            />
        </BindKeyboardSwipeableViews>
      </div>
    );
  }
}

export default TrackCover;
