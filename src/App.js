import { useEffect, useState } from 'react';
import {
  createConference,
  joinConference,
  startVideo,
} from './utils/voxeetUtils';
import ParticipantGrid from './components/ParticipantGrid/ParticipantGrid';
// import MediaSelectors from './components/UI/MediaSelectors/MediaSelectors';
import { CallToActionButton } from './components/UI/CallToActionButton';
import { LocationTime } from './components/LocationTime';
import { AppControls } from './components/AppControls';
import './App.scss';

// The ID of the map cell we are in.
const params = new URLSearchParams(window.location.search);
const cell = params.get('cell') || 'test123456789';

// These are the only characters that vary at this zoom level.
const locationIdForPresentation = cell.substring(5, 10);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (cell) {
      createConference(cell).then((conf) => {
        joinConference(conf).then((conf) => {
          startVideo(conf).then((conf) => {
            setIsLoaded(true); // start the video as soon as you join the conference
          });
        });
      });
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="top">
          <div className="location-id">
            Location No. {locationIdForPresentation}
          </div>
          <div className="location-time">
            <LocationTime />
          </div>
        </div>
        <ParticipantGrid isLoaded={isLoaded} />
        <div className="bottom">
          <AppControls />
          <CallToActionButton />
          <div className="counterweight" />
        </div>
      </div>
    </div>
  );
}

export default App;
