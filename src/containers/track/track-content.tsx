import * as React from "react";
import styled from "@emotion/styled";

const CardContent = styled.div({
  width: 400,
  maxWidth: 400,
  padding: "0.5rem",
  flex: "1"
});

const StyledTitle = styled.h1({
  textAlign: "right",
  margin: "0.5rem 0",
});

const StyledDescription = styled.div({
  margin: "0.5rem 0",
  textAlign: "right"
});

export interface TrackContentOwnProps {
    track: any;
}

const TrackContent: React.FC<TrackContentOwnProps> = ({ track }) => {
  const { description, title } = track?.node?.ortalioMusicTrack;
  const trackDescription = {
    __html: description
  };
  return (
    <CardContent>
      <StyledTitle>
        {title}
      </StyledTitle>
      <StyledDescription
        dangerouslySetInnerHTML={trackDescription}
      />
    </CardContent>
  );
};

export default TrackContent;
