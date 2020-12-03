import * as React from 'react'
import styled from "@emotion/styled";
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
  return (
    <Container>
      <Avatar fluid={`https://i1.sndcdn.com/avatars-000539177277-bwwa0m-t500x500.jpg`} />
      <StyledDiv>
        <StyledHeader>{`${`Piotr`} ${`Markiewicz`}`}</StyledHeader>
        <StyledParagraph>
          {`tagline tagline`}
        </StyledParagraph>
      </StyledDiv>
    </Container>
  );
};

export default Header;
