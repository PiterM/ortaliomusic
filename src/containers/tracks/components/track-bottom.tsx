import * as React from 'react';
import styled from "@emotion/styled";
import { Link } from 'gatsby';

const TrackLink = styled(Link)({
    color: '#000',
    borderBottom: '1px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    ":hover": {
        borderColor: '#000'
    },
    ":active": {
        color: 'orange',
        borderColor: 'orange'
    }
  });

export interface TrackOwnProps {
    url: string;
    title: string;
}
  
const Track: React.FC<TrackOwnProps> = ({ url, title }: TrackOwnProps) => {
    return (
        <TrackLink to={url}>{title}</TrackLink>
    );
};

export default Track;