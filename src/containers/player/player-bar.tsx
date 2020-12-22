import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayerVolume, trackSeekTo } from './player-actions';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { VolumeUp, VolumeDown } from '@material-ui/icons';
import styled from '@emotion/styled';
import styles from '../../gatsby-plugin-theme-ui/index';
import { getPlayerMuted } from './player-selectors';
const { colors } = styles;
const { useState } = React;

const PlayerSlider = styled(Slider)({
    "&.MuiSlider-root": { 
        color: colors.cartButton
    }
});

const PlayerProgressGrid = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 8fr 3fr',
    alignItems: 'center'
});

const VolumeContainer = styled.span({
    cursor: 'pointer',
    "& svg": {
        verticalAlign: 'middle'
    }
});

const Timer = styled.div({
  textAlign: 'center',
  width: '100%',
  fontFamily: 'Space Mono, monospace'
});

interface PlayerProgressSliderProps {
    progress: number;
    elapsedTime: string;
    disabled: boolean;
    loadedTime: string;
}

const PlayerProgressSlider: React.FC<PlayerProgressSliderProps> = ({ progress, elapsedTime, loadedTime, disabled }) => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const muted = useSelector(getPlayerMuted);

  const handleSliderChange = (event: any, percent: number) => setPercent(percent);
  const handleMouseDown = () => setMouseDown(true);
  const handleMouseUp = () => {
    dispatch(trackSeekTo(percent / 100));
    setMouseDown(false);
  };
  const handleVolumeChange = () => dispatch(togglePlayerVolume());

  const currentProgress = mouseDown ? percent : progress;

  return (
      <PlayerProgressGrid>
        <VolumeContainer>
        { muted 
          ? <VolumeDown 
                onClick={handleVolumeChange}
            /> 
          : <VolumeUp 
                onClick={handleVolumeChange}
            /> 
        }
        </VolumeContainer>
        <PlayerSlider
            onChange={handleSliderChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            aria-labelledby="input-slider"
            defaultValue={0}
            value={currentProgress}
            min={0}
            max={100}
            step={0.1}
            disabled={disabled}
        />
        <Timer>{elapsedTime}{loadedTime}</Timer>
      </PlayerProgressGrid>
  );
};

export default PlayerProgressSlider;
