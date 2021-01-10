import * as React from 'react'
import { useSelector } from 'react-redux';
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Link from 'gatsby-link';
import CartButton from './header-cart-button';
import { getCartQuantity } from '../containers/cart/cart-selectors';
import styles from '../gatsby-plugin-theme-ui/index';
const { colors } = styles;

const Avatar = styled.div({
  margin: 0,
  padding: 0,
  width: 150,
  height: 150,
  position: "relative",
  transition: 'all 0.1s ease-in-out',
  ":hover": {
    borderRadius: "50% 50%",
    "& img": {
      borderRadius: "50% 50%",
    },
    "& > div": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: "50% 50%",
    },
    "& > div > p": {
      backgroundColor: "#fff",
      opacity: 1,
    }
  },
  "@media(max-width:600px)": {
    width: 75,
    height: 75
  }
});

const AvatarImage = styled(Img)({
  position: "absolute",
  margin: 0,
  padding: 0,
  top: 0,
  left: 0,
  width: 150,
  height: 150,
  transition: 'all 0.1s ease-in-out',
});

const AvatarLayer = styled.div({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  width: 150,
  height: 150,
  cursor: "pointer",
  transition: 'all 0.1s ease-in-out',
  "& p": {
    width: "100%",
    textAlign: "center",
    opacity: 0,
    transition: 'all 0.1s ease-in-out',
    fontWeight: 900
  },
});

const MyMusicLink = styled.a({
  textDecoration: 'none',
  ":hover, :active": {
    color: colors.cartButton
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
  marginTop: '10px',
  lineHeight: '1em' 
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
                defaultPrice
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
              }
            }
          }
        }    
      }
    }
  `);

  const cartQuantity = useSelector(getCartQuantity);
  const siteData = data?.ortl?.ortalioMusicSiteData?.edges[0]?.node?.data;
  
  if (!siteData) {
    return null;
  }

  const avatarFixed = siteData.avatar?.imageFile?.childImageSharp?.fixed;
  const logoFixed = siteData.logo?.imageFile?.childImageSharp?.fixed;

  const { siteDescription, defaultPrice } = siteData;
  const description = siteDescription.replace('%%defaultPrice%%', `$${defaultPrice}`)
  
  return (
    <Container>
      <Avatar>
        <AvatarImage fixed={avatarFixed} />
        <AvatarLayer>
          <p>
            <MyMusicLink
              href="https://ortalio.pl"
              target="_blank"
            >
              my music
            </MyMusicLink>
          </p>
        </AvatarLayer>
      </Avatar>
      <StyledDescription>
        <Link to={'/'}>
          <Logo fixed={logoFixed} />
        </Link>
        <StyledInfo
          dangerouslySetInnerHTML={{__html: `<div>${description}</div>`}}
        />
      </StyledDescription>
      <CartButton cartQuantity={cartQuantity} />
    </Container>
  );
};

export default Header;
