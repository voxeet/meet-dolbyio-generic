import './CallToActionButton.scss';
export const CallToActionButton = () => (
  <div className="call-to-action-button">
    <div className="cta-text">
      Feeling inspired? Customize your <br /> own Dolby.io meeting experience!
    </div>
    <a
      href="https://dolby.io/products/interactivity-apis"
      target="_blank"
      rel="noreferrer"
    >
      <button className="cta-button">Get Started</button>
    </a>
  </div>
);
