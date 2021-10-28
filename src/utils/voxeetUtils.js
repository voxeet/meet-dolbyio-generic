import {
  initialize,
  session,
  conference,
  mediaDevice,
} from '@voxeet/voxeet-web-sdk';

// Enter your credentials from Dolby.io here:
// https://dolby.io/dashboard/applications/summary
const consumerKey = '<DOLBYIO_COMMUNICATIONS_API>';
const consumerSecret = '<DOLBYIO_COMMUNICATIONS_SECRET>';

initialize(consumerKey, consumerSecret);

/**
 * This function either creates a new session if there isn't anyone in one with that alias
 * or finds the conference if there already is.
 * It returns an object that can be passed into joinConference below();
 * @param {*} alias
 * @returns conference
 */
const createConference = (alias) => {
  return new Promise((resolve, reject) => {
    conference
      .create({ alias })
      .then((cellConference) => {
        resolve(cellConference);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

// conference in/out
const joinConference = (conf) => {
  return new Promise((resolve, reject) => {
    conference
      .join(conf, {})
      .then((conf) => {
        resolve(conf);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

const leaveConference = () => {
  conference.leave();
};

// video
const startVideo = () => {
  return new Promise((resolve, reject) => {
    conference
      .startVideo(session.participant)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const stopVideo = () => {
  conference
    .stopVideo(session.participant)
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });
};

// audio
const startAudio = () => {
  conference
    .startAudio(session.participant)
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });
};

const stopAudio = () => {
  conference
    .stopAudio(session.participant)
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });
};

// media devices
const getAudioDevices = () => {
  return new Promise((resolve, reject) => {
    mediaDevice
      .enumerateAudioDevices()
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getVideoDevices = () => {
  return new Promise((resolve, reject) => {
    mediaDevice
      .enumerateVideoDevices()
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const changeAudioDevice = (deviceId) => {
  mediaDevice
    .selectAudioInput(deviceId)
    .then(() => {})
    .catch((err) => console.error);
};

const changeVideoDevice = (deviceId) => {
  mediaDevice
    .selectVideoInput(deviceId)
    .then(() => {})
    .catch((err) => console.error);
};

export {
  createConference,
  joinConference,
  leaveConference,
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
  getAudioDevices,
  getVideoDevices,
  changeAudioDevice,
  changeVideoDevice,
};
