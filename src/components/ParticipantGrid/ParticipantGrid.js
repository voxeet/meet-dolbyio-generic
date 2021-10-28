// library
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { conference, session } from '@voxeet/voxeet-web-sdk';
// internal
// components
import ParticipantGridItem from './ParticipantGridItem/ParticipantGridItem';
//styles
import './ParticipantGrid.scss';

export default function ParticipantGrid({ isLoaded }) {
  const [participantList, setParticipantList] = useState([]);
  const ref = useRef();

  const streamUpdatedCallback = useCallback(
    (participant, stream) => {
      // handle video
      const thisParticipentIndex = participantList.findIndex((el) => {
        return el.id === participant.id;
      });

      // if participant is not in the list, add it
      if (thisParticipentIndex === -1) {
        let nameToAdd;
        // test to see if the id of this person is you - if so, amend the display name
        if (session.participant.id === participant.id) {
          nameToAdd = `${participant.info.name} (you)`;
        } else {
          nameToAdd = participant.info.name;
        }

        // create object with name and ID
        const listValue = {
          name: nameToAdd,
          id: participant.id,
          participant: participant,
          stream: stream,
          isVideo: stream.getVideoTracks().length > 0,
          isInactive: false,
        };

        // create new list with new value added and set as state
        const newParticipantList = [...participantList, listValue];
        setParticipantList(newParticipantList);
      } else {
        const newParticipantList = [...participantList];

        const newDetails = {
          name: newParticipantList[thisParticipentIndex].name,
          id: participant.id,
          participant: participant,
          stream: stream,
          isVideo: stream.getVideoTracks().length > 0,
          isInactive: false,
        };

        newParticipantList[thisParticipentIndex] = newDetails;

        setParticipantList(newParticipantList);
      }
    },
    [participantList]
  );
  const streamRemovedCallback = useCallback(
    (participant, stream) => {
      if (participant.status === 'Left') return;

      const thisParticipentIndex = participantList.findIndex((el) => {
        return el.id === participant.id;
      });

      const newParticipantList = [...participantList];
      const newDetails = {
        name: newParticipantList[thisParticipentIndex].name,
        id: participant.id,
        participant: participant,
        stream: stream,
        isVideo: false,
        isInactive: true,
      };

      newParticipantList[thisParticipentIndex] = newDetails;

      setParticipantList(newParticipantList);
    },
    [participantList]
  );

  const participantUpdatedCallback = useCallback(
    (participant, stream) => {
      if (participant.status === 'Left') {
        // remove from list
        const newParticipantList = [...participantList].filter(
          (el) => el.id !== participant.id
        );
        setParticipantList(newParticipantList);
      }
    },
    [participantList]
  );

  useEffect(() => {
    conference.on('streamAdded', streamUpdatedCallback);
    conference.on('streamUpdated', streamUpdatedCallback);
    conference.on('streamRemoved', streamRemovedCallback);
    conference.on('participantUpdated', participantUpdatedCallback);

    return () => {
      conference.off('streamAdded', streamUpdatedCallback);
      conference.off('streamUpdated', streamUpdatedCallback);
      conference.off('streamRemoved', streamRemovedCallback);
      conference.off('participantUpdated', participantUpdatedCallback);
    };
  }, [
    participantList,
    streamUpdatedCallback,
    streamRemovedCallback,
    participantUpdatedCallback,
  ]);

  // assemble view
  const items = participantList.map((el) => {
    if (isLoaded) {
      return (
        <ParticipantGridItem
          isLoaded={isLoaded}
          participantInfo={el}
          key={el.id}
          isSelf={el.id === session.participant.id}
        />
      );
    } else {
      return <div>Video not loaded yet</div>;
    }
  });

  if (isLoaded) {
    return (
      <div className="participant-grid" ref={ref}>
        {items}
      </div>
    );
  } else {
    return <div>Loading Video...</div>;
  }
}
