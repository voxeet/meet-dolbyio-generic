// library
import React, { useEffect, useCallback, useRef } from 'react';
// internal
// components
// styles
import './ParticipantGridItem.scss';

export default function ParticipantGridItem({ participantInfo, isSelf }) {
  const ref = useRef();
  const videoRef = useRef();
  const { id, stream, isVideo } = participantInfo;

  const setupVideo = useCallback(({ stream }) => {
    navigator.attachMediaStream(videoRef.current, stream);
  }, []);

  // watcher for stream
  useEffect(() => {
    if (stream) {
      setupVideo({ stream });
    }
  }, [isVideo, stream, ref, id, setupVideo]);

  return (
    <div
      ref={ref}
      className={`participant-grid-item${isSelf ? ' flipped' : ''}`}
    >
      {stream ? (
        <video
          id="video-object"
          className="participant-grid-item__video"
          ref={videoRef}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          playsInline
          autoPlay
          muted
        />
      ) : null}
      {
        // TODO bring back names, maybe, when we get them.
        // <div className={styles.name}>{name}</div>
      }
    </div>
  );
}
