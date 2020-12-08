import * as React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const CardImage = styled(Img)(({ selected }: DivProps) => ({
  minWidth: 500,
  minHeight: 500,
  "@media (max-width:960px)": {
    minWidth: "100vw"
  },
  display: selected ? undefined : "none"
}));

const Dots = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem"
});

const Dot = styled.div(({ selected }: DivProps) => ({
  width: 8,
  height: 8,
  margin: "0 2px",
  borderRadius: "50%",
  backgroundColor: selected ? "#1976d2" : "rgba(0, 0, 0, 0.26)"
}));

export interface DivProps {
    selected: boolean;
    fluid?: any;
}

export interface TrackImagesOwnProps {
    track: any;
}

class TrackImages extends React.Component<TrackImagesOwnProps, {}> {
  state = {
    selectedImageIndex: 0
  };

  render() {
    const { selectedImageIndex } = this.state;
    const { track } = this.props;
    return (
      <div>
        <BindKeyboardSwipeableViews
            index={this.state.selectedImageIndex}
            onChangeIndex={index => this.setState({ selectedImageIndex: index })}
        >
          {track.coverImages.map((image: any, i: number) => (
            <CardImage
              selected={selectedImageIndex === i}
              fluid={image.fluid}
            />
          ))}
        </BindKeyboardSwipeableViews>
        {track.coverImages.length > 1 && (
          <Dots>
            {track.coverImages.map((image: any, i: number) => (
              <Dot selected={selectedImageIndex === i} />
            ))}
          </Dots>
        )}
      </div>
    );
  }
}

export default TrackImages;
