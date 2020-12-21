import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { getCurrentTrack } from './player-selectors';
import { playPauseTrackSuccess, playPauseTrackFailure, stopPlayback } from './player-actions';
import PlayerPlayPauseButton from './player-play-button';
import styled from '@emotion/styled';
import styles from '../../gatsby-plugin-theme-ui/index';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
const { useEffect, useState } = React;
const { colors, images } = styles;

const PlayerContainer = styled.div({
    position: 'fixed',
    width: '100%',
    height: '100px',
    bottom: -100,
    left: 0,
    background: `${colors.background} url('${images.player}') center center repeat`,
    border: '3px solid #fff',
    transition: 'all 0.3s ease-in-out',
    display: 'grid',
    gridTemplateColumns: '0.5fr 3fr 1fr 5.5fr 1fr',
    "&.player-visible": {
        bottom: 0
    },
    alignContent: 'center',
});

const TrackTitleItem = styled.div({
    height: '100%',
    width: '100%',
    display: 'table',
});

const TrackThumbnailContainer = styled.div({
    display: 'inline-grid',
    alignContent: 'center',
    backgroundColor: '#fff'
});

const PlayerItemInline = styled.div({
    display: 'inline-grid',
    alignContent: 'center',
    padding: '5px 5px 2px 0'
});

const TrackThumbnailLink = styled.a({
    height: '93px !important',
    width: '93px !important',
    position: 'relative',
    transition: 'all 0.5s ease',
    border: '2px solid transparent',
    "& picture": {
        transition: 'all 0.5s ease',
    },
    ":hover": {
        borderColor: '#fff'
    },
    ":hover picture": {
        opacity: 0.6,
    }   
});

const TrackThumbnail = styled(Img)({
    height: '100% !important',
    width: '100% !important',
    top: 0,
    left: 0,
});

const TrackTitle = styled(Link)({
    letterSpacing: '2px',
    fontWeight: 900,
    height: '100%',
    backgroundColor: '#fff',
    padding: '0 20px',
    margin: 0,
    width: '100%',
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.5s ease',
    ":hover": {
        color: colors.cartButton,
    }
});

const Player: React.FC = () => {
    const currentTrack = useSelector(getCurrentTrack);
    const [playerRendered, setPlayerRendered] = useState(false);
    const previewUrl = currentTrack?.details?.ortalioMusicTrack?.previewUrl;
    const trackId = currentTrack?.details?.id;
    const dispatch = useDispatch();

    useEffect(() => {
        setPlayerRendered(false);
        setTimeout(() => setPlayerRendered(true), 800);
    }, [trackId]);

    if (!currentTrack) {
        return <PlayerContainer />
    }

    const actionFinishedSuccessfully = () => dispatch(playPauseTrackSuccess());
    const actionFinishedWithError = () => dispatch(playPauseTrackFailure());
    const stopPlayer = () => dispatch(stopPlayback());

    const { playing, paused } = currentTrack;
    const playerClass = playing || paused ? 'player-visible' : undefined;
    const { ortalioMusicTrack } = currentTrack.details;
    const { thumbnailImage: { imageFile: { childImageSharp: { fixed }}}, title, url } = ortalioMusicTrack;

    return (
            <>
                <PlayerContainer className={playerClass}> 

                    <TrackThumbnailContainer>
                        <TrackThumbnailLink
                            href={previewUrl}
                            target="_blank"
                        >
                            <TrackThumbnail fixed={fixed} />
                        </TrackThumbnailLink>
                    </TrackThumbnailContainer>

                    <TrackTitleItem>
                        <TrackTitle
                            to={url}
                        >
                            {title}
                        </TrackTitle>
                    </TrackTitleItem>

                    <PlayerItemInline>
                        <PlayerPlayPauseButton id={trackId}/>
                    </PlayerItemInline>

                    <PlayerItemInline>
                        <span>Slider</span>
                    </PlayerItemInline>

                    <PlayerItemInline>
                        <span>Cart button</span>
                    </PlayerItemInline>

                </PlayerContainer>
                { playerRendered && previewUrl && 
                    <ReactPlayer 
                        style={{display: 'none'}}
                        url={previewUrl}
                        playing={currentTrack.playing}
                        onStart={actionFinishedSuccessfully}
                        onPlay={actionFinishedSuccessfully}
                        onPause={actionFinishedSuccessfully}
                        onEnded={stopPlayer}
                        onError={actionFinishedWithError}
                    />
                }
            </>
    );
};

export default Player;