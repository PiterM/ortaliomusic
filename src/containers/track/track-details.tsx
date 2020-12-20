import * as React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'gatsby-link';
import Img from "gatsby-image";
import { trackUrlHelper } from '../../common/trackUrlHelper';
import styled from "@emotion/styled";
import styles from 'gatsby-plugin-theme-ui';
import { playPauseTrack } from '../player/player-actions';
import { TrackPlayStatus } from './tracks-models';
const { colors, images } = styles;

interface SquareImageOwnProps {
    addedToCart?: boolean;
    maxWidth: number;
    maxHeight: number;
}
  
const SquareImage = styled(Img)((props: SquareImageOwnProps) => {
  const { addedToCart, maxWidth, maxHeight } = props;
  const opacity = addedToCart ? 0.5 : 1;
  const borderColor = addedToCart ? colors.cartButton : colors.grey;

  return {
    maxHeight,
    maxWidth,
    border: `3px solid ${borderColor}`,
    opacity,
    transition: 'all 0.5s ease',
    cursor: 'pointer'
  };
});

const ImageContainer = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%'
});

interface ImageLayerOwnProps {
  trackStatus: TrackPlayStatus;
}

const ImageLayer = styled.div(({ trackStatus }: ImageLayerOwnProps) => {
  const opacity = [TrackPlayStatus.Playing, TrackPlayStatus.Loading].includes(trackStatus) ? 0.9 : 0;
  let backgroundImage;
  let backgroundSize = '102% 102%';
  let backgroundSizeLoadingActive = '45% 45%';
  switch (trackStatus) {
    case (TrackPlayStatus.Playing):
      backgroundImage = images.pauseIcon;
      break;
    case (TrackPlayStatus.Loading):
      backgroundImage = images.loaderIcon;
      backgroundSize = '140% 140%';
      backgroundSizeLoadingActive = backgroundSize;
      break;
    case (TrackPlayStatus.Paused):
    default:
      backgroundImage = images.playIcon;
  }
  
  return {
    background: `${colors.neutral} url('${backgroundImage}') center center no-repeat`,
    backgroundSize,
    opacity,
    transition: 'all 0.5s ease, background 0.1s ease-in-out',
    position: 'absolute',
    width: '45%',
    height: '45%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    borderRadius: '50% 50%',
    ':hover': {
      opacity: 0.9,
    },
    ":active": {
      backgroundSize: backgroundSizeLoadingActive
    }
}});

interface CartButtonOwnProps {
  addedToCart?: boolean;
}

const CartButton = styled.div((props: CartButtonOwnProps) => {
  const { addedToCart } = props;
  const backgroundColor = addedToCart ? colors.cartButton : colors.neutral;
  const borderColor = addedToCart ? colors.cartButton : colors.neutral;

  return {
    background: `${backgroundColor} url("/images/shopping-cart.svg") center center no-repeat`,
    border: `2px solid ${borderColor}`,
    backgroundSize: '70% 70%',
    bottom: 0,
    right: 0,
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
  width: '100%',
  height: '100%'
});

const StyledContainer = styled.div({
  backgroundImage: "none",
  textDecoration: 'none',
  position: 'relative',
  transition: 'all 0.5s ease',
  maxWidth: 288,
  maxHeight: 288,
  ":hover picture": {
    opacity: 0.7,
  },
  ":hover .gatsby-image-wrapper, :active .gatsby-image-wrapper": {
    borderColor: '#000'
  },
  ":active picture": {
    opacity: 0.5
  },
  "picture": {
    transition: 'all 0.5s ease',
  }
});

interface TrackAddedCartButtonOwnProps {
    uniqueId: string;
}

export const TrackAddedCartButton: React.FC<TrackAddedCartButtonOwnProps> = ({uniqueId}) => {
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
        <CartButton 
            onClick={(e) => removeItemFromCart(e, uniqueId)}
            addedToCart={true} 
        />
    );
};

interface TrackNotAddedCartButtonOwnProps {
    sourceUrl: string;
    id: string;
    slug: string;
    title: string;
    description: string;
    digitalItemGuid: string;
    price: number;
}

export const TrackNotAddedCartButton: React.FC<TrackNotAddedCartButtonOwnProps> = ({
  sourceUrl, id, slug, title, description, digitalItemGuid, price
}) => {
    return (
        <CartButton 
            onClick={(e) => e.preventDefault()}
            className="snipcart-add-item"
            data-item-id={id}
            data-item-price={price}
            data-item-url={trackUrlHelper(id, slug)}
            data-item-description={description}
            data-item-image={sourceUrl}
            data-item-name={title}
            data-item-file-guid={digitalItemGuid}
        />
    );
};

interface TrackCoverOwnProps {
    id: string;
    addedToCart?: boolean;
    fixed: any;
    url: string;
    trackStatus: TrackPlayStatus;
    isTrackPage?: boolean;
}

export const TrackCover: React.FC<TrackCoverOwnProps> = ({ id, addedToCart, fixed, url, trackStatus, isTrackPage }) => {
  const dispatch = useDispatch();
  const size = isTrackPage ? 400 : 288;

  return (
      <>
        <StyledContainer>
          <StyledLink
            to={url}
          >
            <ImageContainer>
                <SquareImage 
                  fixed={fixed} 
                  addedToCart={addedToCart} 
                  maxWidth={size}
                  maxHeight={size}
                />
            </ImageContainer>
          </StyledLink>
        </StyledContainer>
        <ImageLayer 
          onClick={() => trackStatus !== TrackPlayStatus.Loading && dispatch(playPauseTrack(id))}
          trackStatus={trackStatus}
        />
      </>
  );
};