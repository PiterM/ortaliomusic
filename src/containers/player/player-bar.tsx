import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlayerVolume, trackSeekTo } from './player-actions';
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
    alignItems: 'center',
    height: 75
});

interface VolumeContainerProps {
  disabled: boolean;
}

const VolumeContainer = styled.span(({ disabled }: VolumeContainerProps) => {
  const fill = disabled ? colors.neutral : '#000';
  return {
    cursor: 'pointer',
    "& svg": {
        verticalAlign: 'middle',
        fill
    }
  }
});

const Timer = styled.div({
  textAlign: 'center',
  width: '100%',
  fontFamily: 'Space Mono, monospace'
});

interface PlayerSliderContainerProps {
  waveformUrl: string;
}

const PlayerSliderContainer = styled.div(({ waveformUrl }: PlayerSliderContainerProps) => {
  const background = waveformUrl 
    ? `${colors.waveform} url('${waveformUrl}') center center no-repeat`
    : `${colors.waveform}`;

  return {
    display: 'inline-grid',
    alignContent: 'center',
    background,
    backgroundSize: '100% 100%',
    height: '100%',
  }
});

interface PlayerProgressSliderProps {
    progress: number;
    elapsedTime: string;
    disabled: boolean;
    loadedTime: string;
    waveformUrl: string;
}

const PlayerProgressSlider: React.FC<PlayerProgressSliderProps> = ({ progress, elapsedTime, loadedTime, disabled, waveformUrl }) => {
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
  const handleVolumeChange = () => !disabled && dispatch(togglePlayerVolume());

  const currentProgress = mouseDown ? percent : progress;

  return (
      <PlayerProgressGrid>
        <VolumeContainer
          disabled={disabled}
        >
        { muted 
          ? <VolumeDown 
                onClick={handleVolumeChange}
            /> 
          : <VolumeUp 
                onClick={handleVolumeChange}
            /> 
        }
        </VolumeContainer>
        <PlayerSliderContainer
          waveformUrl={waveformUrl}
        >
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
        </PlayerSliderContainer>
        <Timer>{elapsedTime}{loadedTime}</Timer>
      </PlayerProgressGrid>
  );
};

export default PlayerProgressSlider;
