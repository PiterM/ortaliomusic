import * as React from 'react';
import { TrackAddedCartButton, TrackNotAddedCartButton } from "../containers/track/track-details";
import { trackTitleHelper } from '../common/trackTitleHelper';

interface CartButtonProps {
    trackIsAdded: boolean;
    uniqueId: string;
    id: string;
    shortTitle: string;
    title: string;
    description: string;
    sourceUrl: string;
    digitalItemGuid: string;
    free: boolean;
    price: number;
    url: string;
    isTrackButton: boolean;
}

const CartButton: React.FC<CartButtonProps> = (
    { trackIsAdded, uniqueId, id, shortTitle, title, description, sourceUrl, digitalItemGuid, free, price, url, isTrackButton }
) => {
    return (
        trackIsAdded 
            ? <TrackAddedCartButton 
                uniqueId={uniqueId}
                isTrackButton={isTrackButton}
              />
            : <TrackNotAddedCartButton
                id={id}
                title={trackTitleHelper(shortTitle, title, true, free)}
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