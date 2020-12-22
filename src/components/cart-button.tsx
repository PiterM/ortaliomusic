import * as React from 'react';
import { TrackAddedCartButton, TrackNotAddedCartButton } from "../containers/track/track-details";

interface CartButtonProps {
    trackIsAdded: boolean;
    uniqueId: string;
    id: string;
    title: string;
    description: string;
    sourceUrl: string;
    digitalItemGuid: string;
    price: number;
    url: string;
    isTrackButton: boolean;
}

const CartButton: React.FC<CartButtonProps> = (
    { trackIsAdded, uniqueId, id, title, description, sourceUrl, digitalItemGuid, price, url, isTrackButton }
) => {
    return (
        trackIsAdded 
            ? <TrackAddedCartButton 
                uniqueId={uniqueId}
                isTrackButton={isTrackButton}
              />
            : <TrackNotAddedCartButton
                id={id}
                title={title}
                description={description}
                sourceUrl={sourceUrl}
                digitalItemGuid={digitalItemGuid}
                price={price}
                url={url}
                isTrackButton={isTrackButton}
              />
    );
};

export default CartButton;