import './CallToActionButton.scss';
export const CallToActionButton = () => (
  <div className="call-to-action-button">
    <div className="cta-text">
      Feeling inspired? Customize your <br /> own Dolby.io meeting experience!
    </div>
    <a
      href="https://docs.dolby.io/communications-apis/docs/generic-meeting"
      target="_blank"
      rel="noreferrer"
    >
      <button className="cta-button">Get Started</button>
    </a>
  </div>
);
