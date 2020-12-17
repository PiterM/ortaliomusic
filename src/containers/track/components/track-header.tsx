import * as React from 'react'
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Link from 'gatsby-link';

const LogoLink = styled(Link)({
    transition: 'all 0.5s ease',
    ":hover, :active": {
        opacity: 0.5
    }
});

const LogoContainer = styled.div({
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

const Logo = styled(Img)({
    width: 151,
    height: 42,
  "@media(max-width:600px)": {
    width: 75,
    height: 75
  }
});


const TrackHeader: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      ortl {
        ortalioMusicSiteData {
          edges {
            node {
              data {
                logo {
                  altText
                  sourceUrl(size: MEDIUM)
                  imageFile {
                    childImageSharp {
                      fixed(width: 151, height: 42) {
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

  const siteData = data?.ortl?.ortalioMusicSiteData?.edges[0]?.node?.data;
  if (!siteData) {
    return null;
  }

  const logoFixed = siteData.logo?.imageFile?.childImageSharp?.fixed;

  return (
    <LogoContainer>
        <LogoLink to={'/'}>
            <Logo fixed={logoFixed} />
        </LogoLink>
    </LogoContainer>
  );
};

export default TrackHeader;
