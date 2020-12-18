import * as React from 'react';
import Link from 'gatsby-link';
import Img from "gatsby-image";
import * as TrackUrlHelper from '../../../common/trackUrlHelper';
import styled from "@emotion/styled";
import styles from 'gatsby-plugin-theme-ui';
const { colors } = styles;

interface AddedToCartProps {
    addedToCart?: boolean;
}
  
const SquareImage = styled(Img)((props: AddedToCartProps) => {
  const { addedToCart } = props;
  const opacity = addedToCart ? 0.5 : 1;
  const borderColor = addedToCart ? colors.cartButton : colors.grey;

  return {
    maxHeight: 288,
    maxWidth: 288,
    border: `2px solid ${borderColor}`,
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

const ImageLayer = styled.div({
  background: `${colors.neutral} url("/images/play-icon.svg") center center no-repeat`,
  backgroundSize: '102% 102%',
  opacity: 0,
  transition: 'all 0.5s ease, background 0.05s ease',
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
    backgroundSize: '45% 45%'
  }
});

const CartButton = styled.div((props: AddedToCartProps) => {
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
    sourceUrl: string;
    uniqueId: string;
}

export const TrackAddedCartButton: React.FC<TrackAddedCartButtonOwnProps> = ({sourceUrl, uniqueId}) => {
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
}

export const TrackNotAddedCartButton: React.FC<TrackNotAddedCartButtonOwnProps> = ({sourceUrl, id, slug, title, description}) => {
    return (
        <CartButton 
            onClick={(e) => e.preventDefault()}
            className="snipcart-add-item"
            data-item-id={id}
            data-item-price="0.01"
            data-item-url={TrackUrlHelper(id, slug)}
            data-item-description={description}
            data-item-image={sourceUrl}
            data-item-name={title}
            data-item-file-guid="3139360f-f3ab-49d5-8668-7dc222508729"
        />
    );
};

interface TrackCoverOwnProps {
    addedToCart?: boolean;
    fixed: any;
    url: string;
}

export const TrackCover: React.FC<TrackCoverOwnProps> = ({ addedToCart, fixed, url }) => {
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
                  />
              </ImageContainer>
            </StyledLink>
          </StyledContainer>
          <ImageLayer 
            onClick={(e) => { console.log('play!')}}
          />
        </>
    );
};