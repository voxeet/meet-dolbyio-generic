// library
import {
  getAudioDevices,
  getVideoDevices,
  changeAudioDevice,
  changeVideoDevice,
} from '../../../utils/voxeetUtils';
import React, { useState, useCallback, useEffect } from 'react';
import ReactDropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function MediaDropdown({ type }) {
  const [options, setOptions] = useState([]);

  // on component mount...
  useEffect(() => {
    const getDevices = type === 'audio' ? getAudioDevices : getVideoDevices;

    getDevices().then((ret) => {
      setOptions(ret.map((d) => ({ value: d.deviceId, label: d.label })));
    });
  }, []); // eslint-disable-line

  const handleChange = useCallback(
    (event) => {
      const changeDevice =
        type === 'audio' ? changeAudioDevice : changeVideoDevice;

      const deviceId = event.value;
      changeDevice(deviceId);
    },
    [type]
  );

  return (
    <ReactDropdown
      className="media-dropdown"
      style={{ marginRight: '2px' }}
      options={options}
      value={options[0]}
      onChange={handleChange}
    />
  );
}
