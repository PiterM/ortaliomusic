import * as React from 'react'
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Styled } from "theme-ui";

const Avatar = styled(Img)({
  width: 150,
  height: 150,
  "@media(max-width:600px)": {
    width: 75,
    height: 75
  }
});

const Logo = styled(Img)({
  width: 314,
  height: 90,
});

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem 0",
  margin: "1rem 0",
  borderBottom: "solid thin rgb(239,239,239)"
});

const StyledDescription = styled.div({
  marginLeft: '2rem' 
});

const StyledParagraph = styled.p({
  marginTop: '10ox' 
});

const Header: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulOrtalioMusic {
        edges {
          node {
            id
            firstName
            shortDescription {
              shortDescription
            }
            avatar {
              fluid(maxHeight: 250, maxWidth: 250) {
                src
                srcSet
                aspectRatio
                sizes
              }
            }
            logo {
              fluid(maxHeight: 90, maxWidth: 314) {
                src
                srcSet
                aspectRatio
                sizes
              }
            }
          }
        }
      }
    }
  `);
  const ortalioMusic = data?.allContentfulOrtalioMusic?.edges[0]?.node;
  return ortalioMusic ? (
    <Container>
      <Avatar fluid={ortalioMusic.avatar.fluid} />
      <StyledDescription>
        <Logo fluid={ortalioMusic.logo.fluid} />
        <StyledParagraph>
          {ortalioMusic.shortDescription.shortDescription}
        </StyledParagraph>
      </StyledDescription>
    </Container>
  ): null;
};

export default Header;
