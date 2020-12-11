import * as React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";
import TrackBottom from './track-bottom';
import { SnipcartContext } from 'gatsby-plugin-snipcart-advanced/context';
const { useContext } = React;

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
  gridAutoRows: "1fr",
  gridGap: "8px",
  alignItems: "stretch",
  margin: "28px 0"
});

const SquareLayer = styled.div({
  position: 'relative',
  bottom: '10px',
  right: '10px'
});

const SquareImage = styled(Img)({
  maxHeight: 300,
  height: "100%",
  border: '2px solid transparent',
  transition: 'all 0.5s ease',
  ":hover": {
    opacity: 0.5,
    borderColor: '#ddd',
  },
  ":active": {
    opacity: 0
  }
});

const ImageLayer = styled.div({
  background: 'transparent url("/static/images/play-icon.svg") center center no-repeat',
  backgroundSize: '50% 50%',
  transition: 'all 0.05s ease',
  position: 'relative'
});

const CartIcon = styled.div({
  background: '#dadada url("/static/images/shopping-cart.svg") center center no-repeat',
  backgroundSize: '70% 70%',
  bottom: 2,
  right: 2,
  width: '70px',
  height: '70px',
  transition: 'all 0.5s ease',
  position: 'absolute',
  ":hover": {
    backgroundColor: '#fff'
  },
  ":active": {
    backgroundSize: '50% 50%',
  }
});

const StyledLink = styled(Link)({
  backgroundImage: "none",
  textDecoration: 'none',
  position: 'relative',
  ":hover p": {
    borderColor: '#000',
  },
  ":active > div > div:first-child": {
    backgroundSize: '45% 45%',
    backgroundColor: '#fff'
  }
});

type TrackGridOwnProps = any;

const TrackGrid: React.FC<TrackGridOwnProps> = ({ tracks }) => {
  const { state } = useContext(SnipcartContext);
  const {userStatus, cartQuantity} = state;
  console.log('state', state);

  return (
    <Grid>
      {tracks.map((track: any, key: number) => (
        <StyledLink key={key} to={`/tracks/${track.node.id}`}>
          <SquareLayer>
            <ImageLayer>
              <SquareImage fluid={track.node.coverImages[0].fluid} />
            </ImageLayer>
            <CartIcon 
              onClick={(e) => { e.preventDefault(); console.log("cart") }}
            />
          </SquareLayer>
          <TrackBottom title={track.node.title} />
        </StyledLink>
      ))}
    </Grid>
  );
};

export default TrackGrid;
