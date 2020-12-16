import * as React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";
import TrackBottom from './track-bottom';
import { SnipcartContext } from '../../../store/cartStore';
import TrackUrlHelper from '../../../common/trackUrlHelper';
import styles from 'gatsby-plugin-theme-ui';
const { colors } = styles;
const { useContext } = React;

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
  gridAutoRows: "1fr",
  gridGap: "8px",
  alignItems: "stretch",
  margin: "28px 0"
});

interface AddedToCartProps {
  addedToCart?: boolean;
}

const SquareLayer = styled.div({
    position: 'relative',
    transition: 'all 0.5s ease',
    opacity: 1,
});

const SquareImage = styled(Img)((props: AddedToCartProps) => {
  const { addedToCart } = props;
  const opacity = addedToCart ? 0.5 : 1;
  const borderColor = addedToCart ? colors.cartButton : colors.neutral;

  return {
    maxHeight: 300,
    height: "100%",
    border: `2px solid ${borderColor}`,
    opacity,
    transition: 'all 0.5s ease',
  };
});

const ImageContainer = styled.div({
  position: 'relative',
});

const ImageLayer = styled.div({
  background: 'transparent url("/images/play-icon.svg") center center no-repeat',
  backgroundSize: '50% 50%',
  opacity: 0,
  transition: 'all 0.5s ease, background 0.05s ease',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  ':hover': {
    opacity: 0.9
  },
  ":active": {
    backgroundSize: '45% 45%'
  }
});

const CartIcon = styled.div((props: AddedToCartProps) => {
  const { addedToCart } = props;
  const backgroundColor = addedToCart ? colors.cartButton : colors.neutral;
  const borderColor = addedToCart ? colors.cartButton : colors.neutral;

  return {
    background: `${backgroundColor} url("/images/shopping-cart.svg") center center no-repeat`,
    border: `2px solid ${borderColor}`,
    backgroundSize: '70% 70%',
    bottom: 2,
    right: 2,
    width: '70px',
    height: '70px',
    transition: 'all 0.05s ease',
    position: 'absolute',
    cursor: 'pointer',
    ":hover": {
      backgroundColor: colors.cartButton,
      borderColor: '#fff'
    },
    ":active": {
      backgroundSize: '50% 50%',
      borderColor: '#000'
    }
  }
});

const StyledLink = styled(Link)({
  backgroundImage: "none",
  textDecoration: 'none',
  position: 'relative',
  transition: 'all 0.5s ease',
  ":hover picture": {
    opacity: 0.5
  },
  ":active picture": {
    opacity: 0.5
  },
  ":active > div > div:first-of-type": {
    backgroundSize: '45% 45%',
    backgroundColor: '#fff'
  },
  "picture": {
    transition: 'all 0.5s ease',
  }
});

type TrackGridOwnProps = any;

const TrackGrid: React.FC<TrackGridOwnProps> = ({ tracks }) => {
  const { state }: any = useContext(SnipcartContext);
  const { items } = state;
  const alreadyAddedTracks = items.length > 0 && items.map((item: any) => item.id);

  const removeItemFromCart = async (e: any, uniqueId: any) => {
    const { Snipcart }: any = window;
    if (!Snipcart) return;

    e.preventDefault();
    try {
      uniqueId && await Snipcart.api.cart.items.remove(uniqueId);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Grid>
      {tracks.map((track: any, key: number) => {
        const { id, slug } = track?.node;
        const { title, description } = track?.node?.ortalioMusicTrack;
        const { sourceUrl } = track?.node?.ortalioMusicTrack?.coverImage;
        const trackIsAdded = alreadyAddedTracks && alreadyAddedTracks.length > 0 && alreadyAddedTracks.includes(id);
        const storeItem = items && items.length > 0 && items.find((item: any) => item.id === id);

        const imageFluid = {
          aspectRatio: 1,
          src: sourceUrl,
          srcSet: sourceUrl,
          sizes: ''
        };

        return (
            <div key={key}>
              <SquareLayer>
                { trackIsAdded 
                ? <>
                    <StyledLink key={key} to={'#'}>
                      <ImageContainer>
                        <SquareImage fluid={imageFluid} addedToCart={true} />
                        <ImageLayer />
                      </ImageContainer>
                    </StyledLink>
                    <CartIcon 
                      onClick={(e) => removeItemFromCart(e, storeItem.uniqueId)}
                      addedToCart={true} 
                    />
                  </>
                : <>
                    <StyledLink key={key} to={'#'}>
                      <ImageContainer>
                        <SquareImage fluid={imageFluid} />
                        <ImageLayer />
                      </ImageContainer>
                    </StyledLink>
                    <CartIcon 
                        onClick={(e) => e.preventDefault()}
                        className="snipcart-add-item"
                        data-item-id={id}
                        data-item-price="0.01"
                        data-item-url={TrackUrlHelper(id, slug)}
                        data-item-description={description}
                        data-item-image={imageFluid.src}
                        data-item-name={title}
                        data-item-file-guid="3139360f-f3ab-49d5-8668-7dc222508729"
                      />
                  </>
                }
              </SquareLayer>
              <TrackBottom title={title} url={TrackUrlHelper(id, slug)} />
            </div>
        );
      })}
    </Grid>
  );
};

export default TrackGrid;
