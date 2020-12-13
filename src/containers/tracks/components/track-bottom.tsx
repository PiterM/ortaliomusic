import * as React from 'react';
import styled from "@emotion/styled";

const TrackLabel = styled.p({
    color: '#000',
    borderBottom: '1px solid transparent'
  });

export interface TrackOwnProps {
    title: string;
}
  
const Track: React.FC<TrackOwnProps> = ({ title }: TrackOwnProps) => {
    return (
        <TrackLabel>{title}</TrackLabel>
    );
};

export default Track;