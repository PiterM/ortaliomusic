import * as React from 'react'
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Link from 'gatsby-link';
import { SnipcartContext } from '../store/CartStore';
import CartButton from './cart-button';
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

const StyledInfo = styled.div({
  marginTop: '10px' 
});

const Header: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      ortl {
        ortalioMusicSiteData {
          edges {
            node {
              data {
                siteTitle
                siteDescription
                avatar {
                  altText
                  sourceUrl(size: MEDIUM)
                  imageFile {
                    childImageSharp {
                      fixed(width: 150, height: 150) {
                        width
                        height
                        src
                        srcSet
                      }
                    }
                  }
                }
                logo {
                  altText
                  sourceUrl(size: MEDIUM)
                  imageFile {
                    childImageSharp {
                      fixed(width: 230, height: 65) {
                        width
                        height
                        src
                        srcSet
                      }
                    }
                  }
                }
                defaultPrice
              }
            }
          }
        }    
      }
    }
  `);

  const { state }: any = useContext(SnipcartContext);
  const { cartQuantity } = state;
  
  const siteData = data?.ortl?.ortalioMusicSiteData?.edges[0]?.node?.data;
  
  if (!siteData) {
    return null;
  }

  const avatarFixed = siteData.avatar?.imageFile?.childImageSharp?.fixed;
  const logoFixed = siteData.logo?.imageFile?.childImageSharp?.fixed;
  
  return (
    <Container>
      <Avatar fixed={avatarFixed} />
      <StyledDescription>
        <Link to={'/'}>
          <Logo fixed={logoFixed} />
        </Link>
        <StyledInfo
          dangerouslySetInnerHTML={{__html: `<div>${siteData.siteDescription}</div>`}}
        />
      </StyledDescription>
      <CartButton cartQuantity={cartQuantity} />
    </Container>
  );
};

export default Header;
