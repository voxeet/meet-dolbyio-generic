import { useState, useCallback } from 'react';

import {
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
} from '../../utils/voxeetUtils';
import MicOnOffIcon from '../../components/assets/MicOnOffIcon';
import VideoOnOffIcon from '../../components/assets/VideoOnOffIcon';
// internal
// components
import MediaSelectors from '../UI/MediaSelectors/MediaSelectors';
// style
import '../UI/MediaSelectors/MediaSelectors.scss';
import './AppControls.scss';

export const AppControls = () => {
  const [isUserVideoActive, setIsUserVideoActive] = useState(false);
  const [isUserAudioActive, setIsUserAudioActive] = useState(true);
  // event handlers
  const handleVideoButton = useCallback(({ isStart }) => {
    if (!isStart) {
      startVideo();
    } else {
      stopVideo();
    }
    setIsUserVideoActive(isStart);
  }, []);

  const handleAudioButton = useCallback(({ isStart }) => {
    if (isStart) {
      startAudio();
    } else {
      stopAudio();
    }
    setIsUserAudioActive(isStart);
  }, []);

  return (
    <div className="app-controls">
      <div
        className={`app-controls__button ${
          isUserAudioActive ? '' : 'is-active'
        }`}
        onClick={() => handleAudioButton({ isStart: !isUserAudioActive })}
      >
        <MicOnOffIcon
          width={30}
          height={30}
          fill={'white'}
          isAudioOff={!isUserAudioActive}
        />
      </div>
      <div
        className={`app-controls__button ${
          isUserVideoActive ? 'is-active' : ''
        }`}
        onClick={() => handleVideoButton({ isStart: !isUserVideoActive })}
      >
        <VideoOnOffIcon
          width={34}
          height={34}
          fill={'white'}
          isVideoOff={isUserVideoActive}
        />
      </div>
      <div>
        <MediaSelectors />
      </div>
    </div>
  );
};
