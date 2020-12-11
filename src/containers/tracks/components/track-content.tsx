import * as React from "react";
import styled from "@emotion/styled";
import { Styled } from "theme-ui";

const CardContent = styled.div({
  padding: "0.5rem",
  flex: "1"
});

export interface TrackContentOwnProps {
    track: any;
}

const TrackContent: React.FC<TrackContentOwnProps> = ({ track }) => {
  const bodyContent = {
    __html: track.body.childMarkdownRemark.html
  };
  return (
    <CardContent>
      <Styled.h1
        sx={{
          textAlign: "center",
          margin: 0
        }}
      >
        {track.title}
      </Styled.h1>
      <Styled.p
        sx={{
          textAlign: "center",
          marginTop: "0.5rem"
        }}
      >
        {new Date(track.publishDate)
          .toUTCString()
          .split(" ")
          .splice(0, 4)
          .join(" ")}
      </Styled.p>
      <Styled.p
        sx={{
          margin: "0.5rem 1rem",
          textAlign: "center"
        }}
        dangerouslySetInnerHTML={bodyContent}
      />
    </CardContent>
  );
};

export default TrackContent;
