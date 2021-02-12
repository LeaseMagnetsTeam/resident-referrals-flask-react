import React, { useState } from 'react';
import QRCode from "react-qr-code";

// Material-UI Imports
import Popover from '@material-ui/core/Popover';

export default function QRcode({ link }) {
  // Popup true or false
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'copy-btn' : undefined;

  // Copy link to clipboard
  function copyLink(event) {
    setAnchorEl(event.currentTarget);
    navigator.clipboard.writeText(link)
      .then(() => {
        console.log(`Copied ${link}`);
        // alert('Copied to clipboard');

      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Share link
  function shareLink() {
    navigator.share(link)
      .then(() => {
        console.log(`Sharing ${link}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function getDeviceWidth() {
    return window.screen.width > 1025;
  };

  return (
    <div className='dashboard-qrcode-container'>
      <h1>Survey Link</h1>
      <div className='float-left'>
        <QRCode value={link} size={190} />
      </div>
      <div className='float-right'>
        <button
          id={id}
          className='btn-outline'
          onClick={copyLink}
        >
          Copy link
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => { setAnchorEl(null); }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          Copied to clipboard
        </Popover>
        <br />
        <button
          className='btn-fill'
          onClick={shareLink}
          disabled={getDeviceWidth()}
        >
          Share link
        </button>
      </div>
    </div>
  );
}
