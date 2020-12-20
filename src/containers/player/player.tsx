import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { getCurrentTrack } from './player-selectors';
import { playPauseTrackSuccess, playPauseTrackFailure, stopPlayback } from './player-actions';
const { useEffect, useState } = React;

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
        return null;
    }

    const actionFinishedSuccessfully = () => dispatch(playPauseTrackSuccess());
    const actionFinishedWithError = () => dispatch(playPauseTrackFailure());
    const stopPlayer = () => dispatch(stopPlayback());

    return playerRendered && previewUrl
        ? (
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
        ) : null;
};

export default Player;