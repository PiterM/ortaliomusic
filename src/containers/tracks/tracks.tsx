import * as React from "react";
// import Layout from "./components/layout";
// import SEO from "./components/seo";
// import Header from "../../components/header";
import TrackGrid from "./components/track-grid";
import { useStaticQuery, graphql } from "gatsby";

const Tracks: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBeatForSale(sort: { fields: publishDate, order: DESC }) {
        edges {
          node {
            id
            coverImages {
              fluid(maxWidth: 800, maxHeight: 800) {
                src
                srcSet
                aspectRatio
                sizes
              }
            }
            title
            description
            contentful_id
            publishDate
            body {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  `);

  const tracks = data?.allContentfulBeatForSale?.edges;
  return tracks ? (
      <TrackGrid tracks={tracks} />
  ) : null;
};

export default Tracks;
