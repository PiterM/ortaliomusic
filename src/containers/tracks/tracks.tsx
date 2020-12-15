import * as React from "react";
// import Layout from "./components/layout";
// import SEO from "./components/seo";
// import Header from "../../components/header";
import TrackGrid from "./components/track-grid";
import { useStaticQuery, graphql } from "gatsby";

const Tracks: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      ortl {
        ortalioMusicTracks {
          edges {
            node {
              id
              ortalioMusicTrack {
                body
                description
                previewUrl
                title
                coverImage {
                  sourceUrl(size: LARGE)
                  altText
                }
              }
            }
          }
        }
      }
    }
  `);

  const tracks = data?.ortl?.ortalioMusicTracks?.edges;
  return tracks ? (
      <TrackGrid tracks={tracks} />
  ) : null;
};

export default Tracks;
