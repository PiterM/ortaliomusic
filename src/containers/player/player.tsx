import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { timeFormatHelper } from '../../common/timeFormatHelper';
import { getCurrentTrack, getPlayerMuted } from './player-selectors';
import { getCartItems } from '../cart/cart-selectors';
import { 
    playPauseTrackSuccess, 
    playPauseTrackFailure, 
    stopPlayback,
    setTrackProgress,
    trackSeekToSuccess
} from './player-actions';
import PlayerPlayPauseButton from './player-play-button';
import PlayerProgressSlider from './player-bar';
import CartButton from '../../components/cart-button';
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
    background: `#efefef`,
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
    backgroundColor: '#fff',
    position: 'relative'
});

const PlayerItemInline = styled.div({
    display: 'inline-grid',
    alignContent: 'center',
    padding: '5px 5px 2px 0'
});

const TrackThumbnailLink = styled.div({
    height: '93px !important',
    width: '93px !important',
    position: 'relative',
    transition: 'all 0.5s ease',
});

const TrackThumbnail = styled(Img)({
    height: '100% !important',
    width: '100% !important',
    top: 0,
    left: 0,
});

const SoundcloudLink = styled.a({
    opacity: 0,
    background: `transparent url('${images.soundcloudLogo}') center center no-repeat`,
    backgroundSize: '50% 50%',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    ":hover, :active": {
        opacity: 0.8
    }
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

const CartAndCloseItems = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '5px 5px 2px 0'
});

const ClosePlayerIcon = styled.div({
    width: 30,
    height: 30,
    background: `url('${images.closeIcon}') center center no-repeat`,
    backgroundSize: '120% 120%',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'border 0.5s ease-in-out',
    ":active": {
        backgroundSize: '65% 65%'
    },
    ":hover": {
        borderColor: '#000'
    }
});

const CartButtonContainer = styled.div({
    width: 70,
    height: 70
});

const Player: React.FC = () => {
    let player: ReactPlayer;
    const playerRef = (p: ReactPlayer) => {
        player = p
    }

    const currentTrack = useSelector(getCurrentTrack);
    const items = useSelector(getCartItems);
    const playerMuted = useSelector(getPlayerMuted);
    const [playerRendered, setPlayerRendered] = useState(false);
    const previewUrl = currentTrack?.details?.ortalioMusicTrack?.previewUrl;
    const waveformUrl = currentTrack?.details?.ortalioMusicTrack?.waveformUrl;
    const trackId = currentTrack?.details?.id;
    const seeking = currentTrack?.progress?.seeking;
    const dispatch = useDispatch();

    const [duration, setDuration] = useState(null);

    useEffect(() => {
        setPlayerRendered(false);
        setTimeout(() => setPlayerRendered(true), 800);
    }, [trackId]);

    useEffect(() => {
        if (seeking && playerRef) { 
            player.seekTo(currentTrack?.progress?.fraction);
            dispatch(trackSeekToSuccess());
        }
    }, [seeking]);

    const setProgress = (progress: any) => {
        progress && !seeking && dispatch(setTrackProgress(progress));
    };

    if (!currentTrack) {
        return <PlayerContainer />
    }

    const actionFinishedSuccessfully = () => dispatch(playPauseTrackSuccess());
    const actionFinishedWithError = () => dispatch(playPauseTrackFailure());
    const stopPlayer = () => dispatch(stopPlayback());

    const { progress, playing, paused, actionPending } = currentTrack;
    const playerClass = playing || paused ? 'player-visible' : undefined;
    const { ortalioMusicTrack, id } = currentTrack.details;
    const { 
        thumbnailImage: { sourceUrl, imageFile: { childImageSharp: { fixed }}}, 
        title, 
        url, 
        description, 
        digitalItemGuid,
        price
    } = ortalioMusicTrack;

    const trackIsAdded = items && items[id] !== undefined;
    const storeItem = trackIsAdded && items[id];

    let elapsedTime = '';
    let loadedTime = '';
    if (progress?.data?.playedSeconds) {
        loadedTime = ` / ${timeFormatHelper(Math.round(Number(duration)))}`;
        elapsedTime = timeFormatHelper(Math.round(Number(progress.data.playedSeconds)));
    }

    return (
            <>
                <PlayerContainer className={playerClass}> 

                    <TrackThumbnailContainer>
                        <TrackThumbnailLink>
                            <TrackThumbnail fixed={fixed} />
                        </TrackThumbnailLink>
                        <SoundcloudLink 
                            href={previewUrl}
                            target="_blank"
                        />
                    </TrackThumbnailContainer>

                    <TrackTitleItem>
                        <TrackTitle to={url}>
                            {title}
                        </TrackTitle>
                    </TrackTitleItem>

                    <PlayerItemInline>
                        <PlayerPlayPauseButton id={trackId}/>
                    </PlayerItemInline>

                    <PlayerItemInline>
                        <PlayerProgressSlider 
                            progress={Math.ceil(progress.fraction * 100)}
                            elapsedTime={elapsedTime}
                            loadedTime={loadedTime}
                            disabled={actionPending}
                            waveformUrl={waveformUrl}
                        />
                    </PlayerItemInline>

                    <CartAndCloseItems>
                        <CartButtonContainer>
                            <CartButton 
                                trackIsAdded={trackIsAdded}
                                uniqueId={storeItem && storeItem.uniqueId ? storeItem.uniqueId: ''}
                                id={id}
                                title={title}
                                description={description}
                                sourceUrl={sourceUrl}
                                digitalItemGuid={digitalItemGuid}
                                price={price}
                                url={url}
                                isTrackButton={false}
                            />
                        </CartButtonContainer>
                        <ClosePlayerIcon 
                            onClick={stopPlayer}
                        />
                    </CartAndCloseItems>

                </PlayerContainer>
                { playerRendered && previewUrl && 
                    <ReactPlayer 
                        ref={playerRef}
                        style={{display: 'none'}}
                        url={previewUrl}
                        playing={currentTrack.playing}
                        volume={0.8}
                        muted={playerMuted}
                        onStart={actionFinishedSuccessfully}
                        onPlay={actionFinishedSuccessfully}
                        onPause={actionFinishedSuccessfully}
                        onEnded={stopPlayer}
                        onError={actionFinishedWithError}
                        onProgress={setProgress}
                        onDuration={setDuration}
                    />
                }
            </>
    );
};

export default Player;