import * as React from 'react'
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { SnipcartContext } from '../store/cartStore';
const { useContext } = React;

const Avatar = styled(Img)({
  width: 150,
  height: 150,
  "@media(max-width:600px)": {
    width: 75,
    height: 75
  }
});

const Logo = styled(Img)({
  width: 230,
  height: 65,
});

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem 0",
  margin: "1rem 0",
  borderBottom: "solid thin rgb(239,239,239)",
  position: 'relative'
});

const StyledDescription = styled.div({
  marginLeft: '2rem' 
});

const StyledParagraph = styled.p({
  marginTop: '10px' 
});

const StyledCartQuantity = styled.span({
    position: 'absolute',
    right: 0,
    bottom: -1,
    width: 20,
    height: 18,
    fontWeight: 700,
    lineHeight: '1em',
    textAlign: 'center',
    color: 'red',
    backgroundColor: '#fff',
    ':hover': {
      backgroundColor: '#dadada'
    }
});

const StyledCartButton = styled.a({
    position: 'absolute' ,
    top: 10,
    right: 20,
    background: 'transparent url("/static/images/shopping-cart.svg") center center no-repeat',
    backgroundSize: '80% 80%',
    border: '2px solid transparent',
    width: 30,
    height: 30,
    padding: 20,
    cursor: 'pointer',
    ':hover, :hover span': {
      borderColor: '#dadada',
      backgroundColor: '#dadada'
    },
    ':active': {
      backgroundSize: '50% 50%'
    }
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
              fluid(maxHeight: 65, maxWidth: 230) {
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

  const { state }: any = useContext(SnipcartContext);
  const { cartQuantity } = state;
  
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
      <StyledCartButton
        onClick={(e) => e.preventDefault()} 
        className="snipcart-checkout"
      >
        {cartQuantity > 0 && <StyledCartQuantity>{cartQuantity}</StyledCartQuantity>}
      </StyledCartButton>
    </Container>
  ): null;
};

export default Header;