import * as React from "react";
import styled from "@emotion/styled";

const CardContent = styled.div({
  padding: "0.5rem",
  flex: "1"
});

const StyledTitle = styled.h1({
  textAlign: "center",
  margin: "0.5rem 0",
});

const StyledDescription = styled.div({
  margin: "0.5rem 1rem",
  textAlign: "center"
});

export interface TrackContentOwnProps {
    track: any;
}

const TrackContent: React.FC<TrackContentOwnProps> = ({ track }) => {
  const description = {
    __html: track.description
  };
  return (
    <CardContent>
      <StyledTitle>
        {track.title}
      </StyledTitle>
      <StyledDescription
        dangerouslySetInnerHTML={description}
      />
    </CardContent>
  );
};

export default TrackContent;
