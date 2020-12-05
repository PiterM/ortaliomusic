import * as React from 'react'
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

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

const StyledDiv = styled.div({
    marginLeft: "2rem"
});

const StyledHeader = styled.h1({
    margin: 0
});

const StyledParagraph = styled.h1({
    margin: "0.25rem 0"
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
  console.log('data', data);
  const ortalioMusic = data.allContentfulOrtalioMusic.edges[0].node;
  return (
    <Container>
      <Avatar fluid={ortalioMusic.avatar.fluid} />
      <StyledDiv>
        <StyledHeader>{`${ortalioMusic.firstName}`}</StyledHeader>
        <StyledParagraph>
          {ortalioMusic.shortDescription.shortDescription}
        </StyledParagraph>
      </StyledDiv>
    </Container>
  );
};

export default Header;
