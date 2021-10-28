// library
import React, { useState, useCallback } from 'react';
// internal
// components
import MediaDropdown from './MediaDropdown.js';
import SettingsIcon from '../../assets/SettingsIcon.js';
import LinkIcon from '../../assets/LinkIcon.js';
// style
import './MediaSelectors.scss';

export default function MediaSelectors() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleLinkShareClick = useCallback(() => {
    // Copy the URL to the clipboard.
    // See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        // Copy the link to the parent page if we are in a parent page.
        // Otherwise, if we are in a standalone page,
        // copy the URL of this page.
        const { href } = window.location;
        const url = new URL(href);
        const parentURL = url.searchParams.get('parentURL');
        const newClip = parentURL || href;

        navigator.clipboard.writeText(newClip).then(
          () => {
            setIsLinkCopied(true);
            setTimeout(() => {
              setIsLinkCopied(false);
            }, 2000);
          },
          () => {
            console.log('Failed to copy - error in writeText');
          }
        );
      } else {
        console.log('Failed to copy - permission denied');
      }
    });
  }, []);

  const menu = isMenuOpen ? (
    <div className="media-selectors__menu">
      <MediaDropdown type={'audio'} />
      <MediaDropdown type={'video'} />
    </div>
  ) : null;

  const clickTarget = isMenuOpen ? (
    <div
      className="media-selectors__click-target"
      onClick={() => setIsMenuOpen(false)}
    ></div>
  ) : null;

  return (
    <div className="media-selectors">
      <div className="app-controls__button" onClick={handleLinkShareClick}>
        <LinkIcon
          width={24}
          height={24}
          fill={isLinkCopied ? 'rgba(80, 176, 108, 1)' : 'white'}
        />
      </div>
      <div
        className="link-copied-tooltip"
        style={{ opacity: isLinkCopied ? 1 : 0 }}
      >
        Location URL Copied to Clipboard
      </div>
      <div className="app-controls__button" onClick={handleClick}>
        <SettingsIcon
          width={24}
          height={24}
          fill={isMenuOpen ? 'rgba(80, 176, 108, 1)' : 'white'}
        />
      </div>
      {clickTarget}
      {menu}
    </div>
  );
}
