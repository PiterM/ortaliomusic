import styled from '@emotion/styled';
import styles from '../gatsby-plugin-theme-ui/index';
import { TrackPlayStatus } from '../containers/track/track-models';
const { colors, images } = styles;

interface PlayButtonLayerProps {
    trackStatus: TrackPlayStatus;
    inPlayerBar?: boolean;
}

export default styled.div(({ trackStatus, inPlayerBar }: PlayButtonLayerProps) => {
    const { Playing, Paused, Loading } = TrackPlayStatus;
    let opacity = 1;
    let backgroundColor = trackStatus === Loading ? colors.neutral : '#fff';
    let size = '80%';
    if (!inPlayerBar) {
        opacity = [Playing, Paused, Loading].includes(trackStatus) ? 0.9 : 0;
        backgroundColor = colors.neutral;
        size = '45%';
    }

    let backgroundImage;
    let backgroundSize = '102% 102%';
    let backgroundSizeLoadingActive =  inPlayerBar ? '85% 85%' : '75% 75%';
    switch (trackStatus) {
      case (Playing):
        backgroundImage = images.pauseIcon;
        break;
      case (Loading):
        backgroundImage = images.loaderIcon;
        backgroundSize = '140% 140%';
        backgroundSizeLoadingActive = backgroundSize;
        break;
      case (Paused):
      default:
        backgroundImage = images.playIcon;
    }
    
    return {
      background: `${backgroundColor} url('${backgroundImage}') center center no-repeat`,
      backgroundSize,
      opacity,
      transition: 'all 0.05s ease, background 0.05s ease-in-out',
      position: 'absolute',
      width: size,
      height: size,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      borderRadius: '50% 50%',
      ':hover': {
        opacity: 0.9,
      },
      ":active": {
        backgroundSize: backgroundSizeLoadingActive
      }
}});