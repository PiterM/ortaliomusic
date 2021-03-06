import * as React from 'react';
import { useDispatch } from 'react-redux';
import { stopPlayback } from '../containers/player/player-actions';
import styled from "@emotion/styled";


const StyledCartQuantity = styled.span({
    position: 'absolute',
    right: 0,
    bottom: -1,
    minWidth: 20,
    height: 18,
    padding: '0 2px',
    fontWeight: 700,
    lineHeight: '1em',
    textAlign: 'center',
    color: 'red',
    backgroundColor: '#fff',
    ':hover': {
      backgroundColor: '#dadada'
    }
});

const StyledCartButton = styled.div({
    position: 'absolute' ,
    top: 15,
    right: 20,
    background: 'transparent url("/images/shopping-cart.svg") center center no-repeat',
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

interface CartButtonProps {
    cartQuantity: number;
}

const CartButton: React.FC<CartButtonProps> = ({ cartQuantity }) => {
    const dispatch = useDispatch();
    const stopPlayer = (e: any) => {
        e.preventDefault();
        dispatch(stopPlayback());
    };

    return (
        <StyledCartButton
            onClick={stopPlayer} 
            className="snipcart-checkout"
        >
            {cartQuantity > 0 && <StyledCartQuantity>{cartQuantity}</StyledCartQuantity>}
        </StyledCartButton>
    );
}

export default CartButton;