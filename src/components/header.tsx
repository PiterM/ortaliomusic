import * as React from 'react'
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Styled } from "theme-ui";

const Avatar = styled(Img)({
  width: 150,
  height: 150,
  borderRadius: "50%",
  "@media(max-width:600px)": {
    width: 75,
    height: 75
  }
});

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem 0",
  margin: "1rem 0",
  borderBottom: "solid thin rgb(239,239,239)"
});

const StyleDescription = styled.div({
  marginLeft: '2rem' 
});

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulOrtalioMusic {
        edges {
          node {
            id
            avatar {
              fluid(maxHeight: 250, maxWidth: 250) {
                src
                srcSet
                aspectRatio
                sizes
              }
            }
            firstName
            shortDescription {
              shortDescription
            }
          }
        }
      }
    }
  `);
  const ortalioMusic = data.allContentfulOrtalioMusic.edges[0].node;
  return (
    <Container>
      <Avatar fluid={ortalioMusic.avatar.fluid} />
      <StyleDescription>
        <Styled.h1
          sx={{
            margin: 0
          }}
        >{`${ortalioMusic.firstName}`}</Styled.h1>
        <Styled.p
          sx={{
            margin: '0.25rem 0'
          }}
        >
          {ortalioMusic.shortDescription.shortDescription}
        </Styled.p>
      </StyleDescription>
    </Container>
  );
};

export default Header;
